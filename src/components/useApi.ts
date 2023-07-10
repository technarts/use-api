import * as React from "react";

import {
  ApiCounsel,
  Params,
  CallParams
} from "./utils/types";

function useApi<T>(params: Params) {
  const [url,] = React.useState<String>(params.url)

  // Data after a successful fetch operation:
  const [RESP, setResp] = React.useState<T | null>(null);

  // Data after a successful fetch operation,
  // but the response is not ok:
  const [error, setError] = React.useState<any>(null);

  // Data after an unsuccessful fetch operation:
  const [fault, setFault] = React.useState<any>(null);

  // Is there an ongoing request?:
  const [inFlight, setInFlight] = React.useState(false);

  const call = async (callParams?: CallParams) => {
    setInFlight(true);

    const _url = callParams?.url || params.url
    const _method =  params.method
    const _headers = callParams?.headers || params.headers
    const _body = params?.payload ? JSON.stringify(params.payload) : undefined

    const options = {
      method: _method === "DOWNLOAD" ? "GET" : _method,
      headers: _headers,
      body: _body,
    } as RequestInit

    try {
      const response = await fetch(_url, options)
        .then(r => params.responseGuard?.(r) || r)
        .then(r => params.method === "DOWNLOAD" ? r.blob() : r.json());

      if (response) {
        setError(null);
        setFault(null);
        setResp(await response)
      } else {
        setResp(null);
        setFault(null);
        setError(await response)
      }
    } catch (e: any) {
      setResp(null);
      setError(null);
      setFault(e);
    } finally {
      setInFlight(false);
    }
  }

  return {
    RESP,
    inFlight,
    error,
    fault,
    url,
    call,
  } as ApiCounsel<T>;
}

export default useApi;