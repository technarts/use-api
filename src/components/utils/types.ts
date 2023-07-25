
export type Params = {
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET" | "DOWNLOAD"
  responseGuard?: (r: Response) => Response,
  headers?: { [k: string]: any },
}

export type CallParams = {
  url: string,
  responseGuard?: (r: Response) => Response,
  headers?: { [k: string]: any },
  payload?: { [k: string]: any },
}

export type ApiCounsel<T> = {
  url: string,
  RESP: T | null,
  error: any,
  fault: any,
  inFlight: boolean,
  call: (callParams?: CallParams) => Promise<any>,
}
