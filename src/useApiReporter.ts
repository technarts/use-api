import * as React from "react";

import { ApiCounsel } from "./types";

type Params<T> = {
  apiCounsel: ApiCounsel<T>,
  start?: () => void,
  end?: (
    resp: ApiCounsel<T>["RESP"],
    error: ApiCounsel<T>["error"],
    fault: ApiCounsel<T>["fault"]
  ) => void,
}

export default function useApiReporter<T>(params: Params<T>) {
  const [isStarted, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (params.apiCounsel.inFlight) {
      params.start?.();
      setStarted(true);
    } else if (isStarted && !params.apiCounsel.inFlight) {
      params.end?.(
        params.apiCounsel.RESP,
        params.apiCounsel.error,
        params.apiCounsel.fault
      );
      setStarted(false);
    }
  }, [params.apiCounsel.inFlight, isStarted])
}
