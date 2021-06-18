import { useState, useEffect } from 'react'
import { Song } from '../types/Song'
import io, { Socket } from 'socket.io-client'
import '../style/Downloader.css'
import { validateURL } from 'ytdl-core'

const socket: Socket = io('http://192.168.0.27:5000')


const convertURL = (data: string) => {
    if(!data) return;
    console.log(data)
}

export function YoutubeDownloaderSocket() {
    const [query, setQuery] = useState<string>('');
    const [selectedSong, setSong] = useState<number>(-1);
    const [load, setLoad] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<any[]>([]);
    
    useEffect(() => {
        setSearchResult([]);
        setLoad(true);
        if(!query)
            return setLoad(false);
        else if(!validateURL(query)) {
            const timer = setTimeout(() => {
                socket.emit('search-query', query)
                console.time('WS')
                socket.once('search-response', (songRes: { search: any[] }) => {
                    // Reset all States
                    setSong(-1)
                    setLoad(false);
                    // Set Search Result
                    setSearchResult(songRes.search)
                    console.timeEnd('WS')
                });
            }, 1000)

            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                socket.emit('url-query', query)
                console.time('Socket Response-Time')
                socket.once('url-response', (searchRes: any) => {
                    // Reset Selected Song State
                    setSong(-1)
                    setLoad(false)
                    // Set Search Result
                    setSearchResult(searchRes.search)
                    console.timeEnd('Socket Response-Time')
                });
            }, 1000)

            return () => clearTimeout(timer);
        }

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
                        {searchResult.map((song: Song, songIdx) => {
                            return (
                                <div className={selectedSong === songIdx ? 'search-item-zoom' : 'search-item'} key={songIdx} onClick={() => setSong(songIdx)}>
                                    <h4>{song.title}</h4>
                                    <p>{song.channel.name}</p>
                                </div>
                            )
                        }
                        )}
                    </div>
                    <button type="button" className="convert-btn" onClick={() => convertURL(searchResult[selectedSong].url)}>Convert</button>
                </div>
            </div>
        </div>
    )
}