import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { YoutubeDownloader } from './components/Converter/YoutubeMain';
import { Downloader } from './components/Downloader/DownloadMain';

ReactDOM.render((
  <Router>
    <Route path="/" exact component={() => <YoutubeDownloader/>}/>
    <Route path="/download" exact component={() => <Downloader />}/>
  </Router>
), document.getElementById('root'));