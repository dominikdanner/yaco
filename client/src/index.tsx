import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { YoutubeDownloader } from './components/Converter/YoutubeMain';
import { ConverterOptions } from './components/Downloader/ConvertOptions';

ReactDOM.render((
  <Router>
    <Route path="/" exact component={() => <YoutubeDownloader/>}/>
    <Route path="/download" exact component={() => <ConverterOptions/>}/>
  </Router>
), document.getElementById('root'));