
export type BaseParams = {
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET" | "DOWNLOAD"
  responseGuard?: (r: Response) => Response,
  headers?: { [k: string]: any },
}

type MethodPayloadParams1 = {
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  payload?: { [k: string]: any },
}

type MethodPayloadParams2 = {
  method: "GET" | "DOWNLOAD",
  payload?: never
}

export type Params = BaseParams & (MethodPayloadParams1 | MethodPayloadParams2)

type CallBaseParams = {
  url: string,
  responseGuard?: (r: Response) => Response,
  headers?: { [k: string]: any },

}

export type CallParams = CallBaseParams

export type ApiCounsel<T> = {
  url: string,
  RESP: T | null,
  error: any,
  fault: any,
  inFlight: boolean,
  call: (callParams?: CallParams) => Promise<any>,
}
