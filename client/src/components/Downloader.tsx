import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react'
import { SongResult } from '../types/Song'
import '../style/Downloader.css'

const fetchData = (query: string) => {
    return axios.get(`http://192.168.0.27:5000/search?query=${query}`).then((res: AxiosResponse) => {
        console.log("Query Result:")
        res.data.search.map((song: SongResult) => console.log(song.url));
        return res.data.search
    }).catch((err) => console.error(err))
}

export function YoutubeDownloader() {
    const [query, setQuery] = useState('');
    const [load, setLoad] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setSearchResult([]);
        if(!query) return setLoad(false);
        setLoad(true);
        const timer = setTimeout(() => {
            fetchData(query)
                .then((searchRes: any) => {
                    setLoad(false);
                    setSearchResult(searchRes)
                })
        }, 1000);

        return () => clearTimeout(timer);
    }, [query])
    
    return (
        <div className="container">
            <div className="download-box">
                <h1><span>Youtube</span> Video Converter</h1>
                <p className="short">Simple, Easy, Fast Video Converter</p>
                <div className="content">
                    <input type="text" className="url-search" placeholder="Search / Youtube URL" onChange={(e) => setQuery(e.target.value)}></input>
                    <div className="search-container">
                        {load && <div className="alert">⏳ Loading...</div>}
                        {!query && <div className="alert">🛑 No Result</div>}
                        {searchResult.map((song: SongResult, songIdx) => {
                            return (
                                <div className="search-item" key={songIdx} onClick={() => console.log(song.url)}>
                                    <h4>{song.title}</h4>
                                    <p>{song.channel.name}</p>
                                </div>
                            )
                        }
                        )}
                    </div>
                    <button type="button" className="convert-btn">Convert</button>
                </div>
            </div>
        </div>
    )
}
