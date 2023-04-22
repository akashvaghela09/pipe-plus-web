import React, { useState } from 'react';
import './App.css';
import { pipePlus } from './apis/pipePlus';
import { Player } from './components';

function App() {
  const [playList, setPlayList] = useState([]); // [ { url: "", track: "", mimeType: "", quality: "", videoOnly: "", height: "", width: "" }

  const getStreamData = async () => {
    let data = await pipePlus.getStreamData("ElZfdU54Cp8")

    console.log(data);
    // setPlayList(data.resourceList);
  }

  return (
    <div className="App bg-slate-500">
      <button onClick={() => getStreamData()} className='p-2 m-8 bg-blue-500 rounded-md text-slate-100 w-36'>
        Fetch
      </button>

      <Player />
    </div>
  );
}

export default App;
