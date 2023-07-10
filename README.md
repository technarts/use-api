# useApi Hook

## Installation
```
npm install @technarts/use-api
```

## Usage
```
import { useApi }  from '@technarts/use-api'
```


```
const apiCaller = useApi({
    method: "GET",
    url: props.apiUrl
  })
```

```
apiCaller.call()

console.log(apiCaller.inFlight)

console.log(apiCaller.RESP)
```

URL, method, headers and payload can be passed to call function. 
```
apiCaller.call({
    url: props.apiUrl,
    method: "POST",
    payload: {
        id: 1,
        name: "Tom"
    },
    headers: {
        "Content-Type": "text/html; charset=UTF-8"
    }
})
```

## Parameters
| Parameter | Type    | Required | Description                                                                                                                                |
|-----------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| method    | String  | &check;  | Options are `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `DOWNLOAD`. Download method is simply a GET request but returns blob instead of json. |
| url       | String  | &check;  | URL of the API                                                                                                                             |
| headers   | Object  | &cross;  | Any data could be put in headers object like `Authorization`, `Content-Type` etc.                                                          |
| payload   | Objects | &cross;  | Any data could be put in headers object. If method is `GET` or `DOWNLOAD` you can not declare payload.                                     |


## Attributes
| Attribute | Description                                                         |
|-----------|---------------------------------------------------------------------|
| RESP      | Data after a successful fetch operation                             |
| error     | Data after a successful fetch operation, but the response is not ok |
| fault     | Data after an unsuccessful fetch operation                          |
| inFlight  | Is there an ongoing request                                         |


