import * as React from "react";

import {
  ApiCounsel,
  Params,
  CallParams
} from "./types";

export default function useApi<T>(params: Params) {
  const [url,] = React.useState<string>(params.url)

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

    const _url = callParams?.url || params.url;
    const _headers = callParams?.headers || params.headers;
    let _body = callParams?.payload;
    let _method = params.method;

    if (_headers?.["Content-Type"] === "application/json")
      _body = JSON.stringify(_body);

    if (_method === "DOWNLOAD")
      _method = "GET";
    else if (_method === "UPLOAD")
      _method = "POST";

    const options = { method: _method, headers: _headers, body: _body };
    console.log("sadasdfd",options)
    try {
      const response = await fetch(_url, options)
        .then(r => params.responseGuard?.(r, { url: _url, headers: _headers, payload: callParams?.payload }) || Promise.resolve(r))
        .then(r => ({
          ok: r.ok,
          data: params.method === "DOWNLOAD" ? r.blob() : r.json()
        }));

      if (response.ok) {
        setError(null);
        setFault(null);
        setResp(await response.data)
      } else {
        setResp(null);
        setFault(null);
        setError(await response.data)
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