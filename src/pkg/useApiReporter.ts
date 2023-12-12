import * as React from "react";

import { ApiCounsel } from "./types";

type Params<T> = {
  apiCounsel: ApiCounsel<T>[] | ApiCounsel<T>,
  start?: () => void,
  end?: (
    resp: ApiCounsel<T>["RESP"],
    error: ApiCounsel<T>["error"],
    fault: ApiCounsel<T>["fault"]
  ) => void,
}

export default function useApiReporter<T>(params: Params<T>) {
  let apiCounsels: ApiCounsel<T>[];
  if(Array.isArray(params.apiCounsel)) {
    apiCounsels = params.apiCounsel
  }
  else {
    apiCounsels = [params.apiCounsel]
  }

  const [isStarted, setStarted] = React.useState<boolean[]>(new Array(apiCounsels.length).fill(false));

  React.useEffect(() => {
    let isMounted = true;

    apiCounsels.forEach((element, index) => {
      if (element.inFlight && !isStarted[index]) {
        params.start?.();
        setStarted(prevState => {
          if (isMounted) {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          }
          return prevState;
        });
      } else if (isStarted[index] && !element.inFlight) {
        params.end?.(
          element.RESP,
          element.error,
          element.fault
        );
        setStarted(prevState => {
          if (isMounted) {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
          }
          return prevState;
        });
      }
    });
  }, [params.apiCounsel, isStarted]);
}


