import { useState, useEffect, FC } from "react";
import { Socket, io } from "socket.io-client";
import { Song } from "../../types/Song";
import { getVideoID, validateURL } from "../util/url";

interface Props {
	loading: string;
	noResult: string;
}

const socket: Socket = io('http://192.168.0.27:5000')

/**
 * Click handler for converting
 * @param song 
 */
const convertURL = (song: Song) => {
    const vidId = getVideoID(song.url)

    // Set items for Local Storage for sharing
    localStorage.setItem('filename', song.title)
    localStorage.setItem('videoId', vidId)
    localStorage.setItem('thumbnail', song.thumbnail)
    localStorage.setItem('author', song.channel.name)
    localStorage.setItem('authorURL', song.channel.url)
    document.location.href = "/download"
}

export const YoutubeSearch: FC<Props> = ({ loading, noResult }) => {
    const [query, setQuery] = useState<string>('');
    const [selectedSong, setSong] = useState<number>(-1);
    const [load, setLoad] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<any[]>([]);
    
    // Rerenders when the query has changed
    useEffect(() => {
        // Reset to default state
        setSearchResult([]);
        setLoad(true);
        
        if(!query) setLoad(false);
        
        // Validates Query or Link and gets the Search Result
        else if(!validateURL(query)) {
            const timer = setTimeout(() => {
                socket.emit('string-query', { param: query, maxResult: 3 }).once('string-query-response', (songRes: { search: any[] }) => {
                    // Reset all States
                    setSong(-1)
                    setLoad(false);
                    // Set Search Result
                    setSearchResult(songRes.search)
                })
            }, 1000)
                       
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                socket.emit('url-query', query).once('url-response', (searchRes: any) => {
                    // Reset Selected Song State
                    setSong(-1)
                    setLoad(false)
                    // Set Search Result
                    setSearchResult(searchRes.search)
                })
            }, 1000)
                
            return () => clearTimeout(timer);
        }
    }, [query])

    return(
        <div>
            <input type="text" className="url-search" placeholder="Search / Youtube URL" onChange={(e) => setQuery(e.target.value)}></input>
            <div className="search-container">
                {load && <div className="alert">{loading}</div>}
                {!query && <div className="alert">{noResult}</div>}
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
            <button type="button" className="convert-btn" onClick={() => {
                if(!searchResult[selectedSong]) return;
                convertURL(searchResult[selectedSong])}}>Convert</button>
        </div>
    )
}
