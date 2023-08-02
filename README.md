# React Hooks for API Call Life Cycle Management

With `useApi` hook, we standardize API calls and response handling in our React based projects at TechNarts. It is a simple wrapper around the fetch API with some useful states.

`useApiReporter` hook is a complementary tool for `useApi`. It is used to make callbacks on request start & end and handling errors.

## Installation

```bash
$ npm i @technarts/react-use-api
```

## Simple Usage

```typescript
// Get an ApiCounsel by which you can make calls and manage responses:
const apiGetter = useApi<{ status: string, data: number[] }>({ url: "your/url/here", method: "GET" });

// Make the call
React.useEffect(() => {
  apiGetter.call();
}, [])

React.useEffect(() => {
  if (apiGetter.RESP) {
    // Do what is needed with the response.
  }
}, [apiGetter.RESP])
```

## Types
### `useApi<T>(params: Params) => ApiCounsel<T>`
```typescript
// Parameters accepted by useApi:
type Params = {
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET" | "DOWNLOAD"
  responseGuard?: (r: Response) => Response,
  headers?: { [k: string]: any },
}

// Parameters accepted by the call method of ApiCounsel.
// Maybe omitted altogether if nothing needs to be overriden:
type CallParams = {
  url?: string,
  responseGuard?: (r: Response) => Response,
  headers?: { [k: string]: any },
  payload?: { [k: string]: any },
}

// The return type of useApi:
type ApiCounsel<T> = {
  RESP: T | null, // Response will be available here when the request successfully completes.
  inFlight: boolean, // Whether the request is pending or not.
  error: any, // HTTP Response status was anything outside of [200, 299], such as HTTP 404.
  fault: any, // Server didn't respond.
  call: (callParams?: CallParams) => void, // Request trigger.
  url: string, // The same url as what is passed to useApi inside params. Handy when apiCounsel is passed to another React component where the url is no longer in the scope.
}
```

## `<T>` Generic Response Type

The generic type T passed to `useApi` (like the following):

```typescript
const apiPoster = useApi<{ status: "ok" | "nok", data: number[] }>({
  url: "...",
  method: "POST"
})
// Here type T = { status: "ok" | "nok", data: number[] }
```

will end up `RESP` being the very type of `T`:

```typescript
React.useEffect(() => {
  if (apiPoster.RESP && apiPoster.RESP.status === "ok") {
    // Do whatever needed with apiPoster.RESP.data
  }
}, [apiCounsel.RESP])
```

## `responseGuard: (r: Response) => Response`

Response guard welcomes the response. So if every 401 needs to be handled the same way, it can be used as follows:

```typescript
function guard(r: Response): Response {
  if (r.status === 401) {
    // Handle 401, maybe locate to login?
  }
  return r
}

// T is set to `any` for keeping examples simple:
const apiGetter = useApi<any>({ url: "...", method: "GET", responseGuard: guard })
const apiPoster = useApi<any>({ url: "...", method: "POST", responseGuard: guard })
```

If it is way too prevalent in the project, useApi itself can be wrapped so that every apiCounsel has its response guard:

```typescript
function _useApi<T>(params: Omit<Params, "responseGuard">): ApiCounsel<T> {
  return useApi<T>({ ...params, responseGuard: guard });
}
```

## One-time Overrides

Sometimes it is necessary to alter what is passed to `useApi` while making API calls. One simple example is setting the url according to the request:

```typescript
const apiServiceGetter = useApi<any>({ url: "/services", method: "GET" })

React.useEffect(() => {
  apiServiceGetter.call({ url: `${apiServiceGetter.url}?id=1` })
}, [])
```

## Error Handling

`RESP`, `error` and `fault` in type `ApiCounsel` are mutually exclusive:

```typescript
React.useEffect(() => {
  if (apiCounsel.fault)
    // No response at all.
  else if (apiCounsel.error)
    // Anything other than 200-299.
  else
    // apiCounsel.RESP is here.
}, [apiCounsel.RESP, apiCounsel.error, apiCounsel.fault])
```

Please check `useApiReporter` for a more convenient way of handling the result.

## Checking Request's Condition

`inFlight` property of `ApiCounsel` can be observed for the requests's pending status:

```typescript
React.useEffect(() => {
  if (!apiCounsel.inFlight) {
    // It is safe to issue another call...
  }
}, [apiCounsel.inFlight])
```

Again, `useApiReporter` has a more convenient way of chaining requests one after another.

## `useApiReporter` Hook

This hook can be used for making callbacks when a request started and/or ended:

```typescript
// type T = { ... }
const apiGetter = useApi<T>({ url: "...", method: "GET" })

useApiReporter({
  apiCounsel: apiGetter,
  start: () => console.log("Request started"),
  end: (resp, error, fault) => {
    if (fault) {
      // No response at all.
    } else if (error) {
      // Anything other than 200-299.
    } else {
      // resp is of type T and is not null.
    }
    console.log("Request ended")
  }
})
```

## Inspiration
Inspired by: https://betterprogramming.pub/clean-api-call-with-react-hooks-3bd6438a375a (Author: Ashraful Islam, thanks)

## Concerns

What is good about this approach is, API calls become fairly consistent and being able to handle the start and the end of requests in a standardized way gives a fine grained control over handling loadings.

On the flip side, one `apiCounsel` is meant to be used only for one kind of method of the API end point. For example, if you have `apiServiceGetter` which you defined for listing all services and probably also for retrieving details of a single service, you can't use it for updating a service. Is this a problem? Not, really.

Consider that it were possible to make arbitrary `GET` and `POST` calls with one `apiCounsel`. So it would be like:

```typescript
// Purely hypothetical code snippet:
const serviceApi = useApi<any>("bla/bla/services")

React.useEffect(() => {
  serviceApi.get();
}, [/* bla bla */])

React.useEffect(() => {
  serviceApi.post(payload);
}, [/* bla bla */])
```

Looks neat. `resp`, `error` and `fault` states need to be handled inside `useApi` separately for every HTTP method out there. `useApiReporter` needs to consider HTTP method type too. End points lacking some of the methods should not cause trouble.

In fact, we tried this approach before. Admission: it was working (with a few flaws here and there). But we ended up making `apiCounsel` less responsible (a single call() to make the request) for the sake of simplicity.

### Naming `ApiCounsel`s

Since one `apiCounsel` is responsible for one type of API call, naming `apiCounsel`s in an informative way helps:

```typescript
const apiServiceGetter = useApi<any>({ /* bla bla */ })
const apiServicePatcher = useApi<any>({ /* bla bla */ })
```

So the reader knows when `apiServicePatcher.call()` is issued, it will send a `PATCH` request. But, if there is only one `apiCounsel` in a component, for example a ComboBox needs only one for fetching the records matching the search keywords from the url provided to it, simply naming the `apiCounsel` as `apiGetter` does the job.
