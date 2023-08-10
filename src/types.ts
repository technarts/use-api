export type Params = {
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET" | "DOWNLOAD"
  responseGuard?: (r: Response, callParams?: CallParams) => Promise<Response>;
  headers?: { [k: string]: any },
}

export type CallParams = {
  url?: string,
  responseGuard?: (r: Response, callParams?: CallParams) => Response,
  headers?: { [k: string]: any },
  payload?: { [k: string]: any },
}

export type ApiCounsel<T> = {
  RESP: T | null,
  inFlight: boolean,
  error: any,
  fault: any,
  call: (callParams?: CallParams) => void,
  url: string,
}
