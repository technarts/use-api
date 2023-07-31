import * as React from "react";

import { ApiCounsel } from "./types";

type ReporterArgs<T> = {
  apiCounsel: ApiCounsel<T>,
  start?: () => void,
  end?: (
    resp: ApiCounsel<T>["RESP"],
    error: ApiCounsel<T>["error"],
    fault: ApiCounsel<T>["fault"]
  ) => void,
}

export default function useApiReporter<T>(args: ReporterArgs<T>) {
  const [isStarted, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (args.apiCounsel.inFlight) {
      args.start?.();
      setStarted(true);
    } else if (isStarted && !args.apiCounsel.inFlight) {
      args.end?.(
        args.apiCounsel.RESP,
        args.apiCounsel.error,
        args.apiCounsel.fault
      );
      setStarted(false);
    }
  }, [args.apiCounsel.inFlight, isStarted])
}
