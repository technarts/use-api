import React, {useState} from 'react';
import { useApi } from "./pkg/index"


function App() {

  const [title, setTitle] = useState('')
  const [getUrl, setGetUrl] = useState('https://dummyjson.com/products/1')
  const [postUrl, setPostUrl] = useState('https://dummyjson.com/products/add')
  const [downloadUrl, setDownloadUrl] = useState('https://pbs.twimg.com/profile_images/459271147347906560/ytA20381_400x400.jpeg')
  const [uploadUrl, setUploadUrl] = useState('https://filebin.net/ppkj55e4jturjty7/testdfsdf.pdf')
  const linkRef: React.MutableRefObject<HTMLAnchorElement | null> = React.useRef(null);
  const adminHelpDocInputRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);


  const apiGetter = useApi<{ status: string, data: number[] }>({
    url: getUrl,
    method: "GET"
  });


  const apiPoster = useApi<{ status: string, data: number[] }>({
    url: postUrl,
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
  });

  const apiDownloader = useApi<Blob>({
    url: downloadUrl,
    method: "DOWNLOAD",
  });

  const apiUploader = useApi<Blob>({
    url: uploadUrl,
    method: "UPLOAD",
    headers: {
      'Content-Type': 'application/octet-stream',
      'accept': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:3002",
      "Access-Control-Allow-Methods": "POST",
      'Access-Control-Request-Headers': 'Content-Type, Authorization'
    }
  });

  React.useEffect(() => {
      if (apiDownloader.RESP && linkRef.current) {
        linkRef.current.href = URL.createObjectURL(apiDownloader.RESP);
        linkRef.current.download = `file.jpg`;
        linkRef.current.click();
      }
  }, [apiDownloader.RESP])


  return (
    <div style={{}}>
      <div style={{border: '1px solid black', padding: "10px", display: "grid"}}>
        <h3>GET</h3>
        <input type="text" value={getUrl} style={{ marginBottom: "10px"}} onChange={(e) => setGetUrl(e.target.value)}/>
        <button onClick={() => apiGetter.call()}>Send Get Request</button>

        <div style={{backgroundColor: "lightgray", padding: "10px", marginTop: "10px", overflow: "auto"}}>
          <b>RESP:</b> <br/>
          <code>{apiGetter?.RESP ? JSON.stringify(apiGetter?.RESP) : ''}</code> <br/>
          <b>error:</b>
          <code>{apiGetter?.RESP ? JSON.stringify(apiGetter?.error) : ''}</code> <br/>
          <b>fault:</b>
          <code>{apiGetter?.RESP ? JSON.stringify(apiGetter?.fault) : ''}</code> <br/>
          <b>inFlight:</b>
          <code>{JSON.stringify(apiGetter?.inFlight)}</code> <br/>
          <b>url:</b>
          <code>{getUrl}</code> <br/>
        </div>
      </div>
      <div style={{border: '1px solid black', padding: "10px", display: "grid"}}>
        <h3>POST</h3>

        <input type="text" value={postUrl} style={{ marginBottom: "10px"}} onChange={(e) => setPostUrl(e.target.value)}/>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder={"Give me a string."} style={{ marginBottom: "10px"}} />
        <button onClick={() => apiPoster.call({'payload': {"title": title}})}>Send Post Request</button>
        <div style={{backgroundColor: "lightgray", padding: "10px", marginTop: "10px"}}>
          <b>RESP:</b> <br/>
          <code>{apiPoster?.RESP ? JSON.stringify(apiPoster?.RESP) : ''}</code> <br/>
          <b>error:</b>
          <code>{apiPoster?.RESP ? JSON.stringify(apiPoster?.error) : ''}</code> <br/>
          <b>fault:</b>
          <code>{apiPoster?.RESP ? JSON.stringify(apiPoster?.fault) : ''}</code> <br/>
          <b>inFlight:</b>
          <code>{JSON.stringify(apiPoster?.inFlight)}</code> <br/>
          <b>url:</b>
          <code>{postUrl}</code> <br/>
        </div>
      </div>
      <div style={{border: '1px solid black', padding: "10px", display: "grid"}}>
        <h3>DOWNLOAD</h3>
        <input type="text" value={downloadUrl} style={{ marginBottom: "10px"}} onChange={(e) => setDownloadUrl(e.target.value)}/>
        <button onClick={() => apiDownloader.call()}>Send Download Request</button>
        <a ref={linkRef} style={{ display: 'none' }}></a>
        <div style={{backgroundColor: "lightgray", padding: "10px", marginTop: "10px"}}>
          <b>RESP:</b> <br/>
          <code>{apiDownloader?.RESP ? JSON.stringify(apiDownloader?.RESP) : ''}</code> <br/>
          <b>error:</b>
          <code>{apiDownloader?.RESP ? JSON.stringify(apiDownloader?.error) : ''}</code> <br/>
          <b>fault:</b>
          <code>{apiDownloader?.RESP ? JSON.stringify(apiDownloader?.fault) : ''}</code> <br/>
          <b>inFlight:</b>
          <code>{JSON.stringify(apiDownloader?.inFlight)}</code> <br/>
          <b>url:</b>
          <code>{downloadUrl}</code> <br/>
        </div>

      </div>
      <div style={{border: '1px solid black', padding: "10px", display: "grid"}}>
        <h3>UPLOAD</h3>
        <input
          ref={adminHelpDocInputRef}
          style={{ display: "none" }}
          type='file'
          accept=".pdf"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            // Put the file in a form
            const file = event.target.files ? event.target.files[0] : null
            console.log(file)

            apiUploader.call({
              payload: file
            });
          }}
        />
        <button onClick={() => adminHelpDocInputRef.current?.click()}>Send Upload Request</button>
        <a ref={linkRef} style={{ display: 'none' }}></a>
        <div style={{backgroundColor: "lightgray", padding: "10px", marginTop: "10px"}}>
          <b>RESP:</b> <br/>
          <code>{apiDownloader?.RESP ? JSON.stringify(apiDownloader?.RESP) : ''}</code> <br/>
          <b>error:</b>
          <code>{apiDownloader?.RESP ? JSON.stringify(apiDownloader?.error) : ''}</code> <br/>
          <b>fault:</b>
          <code>{apiDownloader?.RESP ? JSON.stringify(apiDownloader?.fault) : ''}</code> <br/>
          <b>inFlight:</b>
          <code>{JSON.stringify(apiDownloader?.inFlight)}</code> <br/>
          <b>url:</b>
          <code>{downloadUrl}</code> <br/>
        </div>

      </div>





    </div>
  );
}

export default App;
