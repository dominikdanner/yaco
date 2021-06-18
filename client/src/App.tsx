import React from 'react';
import { YoutubeDownloaderSocket } from './components/DownloadSocket'

class App extends React.Component{
  render() {
    return (
      <div className="App">
        <YoutubeDownloaderSocket />
      </div>
    )
  }
}

export default App;
