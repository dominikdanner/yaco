import React from 'react';
import { YoutubeDownloader } from './components/Downloader'

class App extends React.Component{
  render() {
    return (
      <div className="App">
        <YoutubeDownloader />
      </div>
    )
  }
}

export default App;
