import { FC, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { DownloadOptions } from '../../types/DownloadOptions'
import '../../style/Downloader.css'

const socket: Socket = io('http://192.168.0.27:5000')

/**
 * Gets the songdata from localstorage
 * @returns 
 */
const getLocalStorageSong = () => {
	return {
		filename: localStorage.getItem('filename'),
		format: localStorage.getItem('format'),
		videoId: localStorage.getItem('videoId'),
		thumbnail: localStorage.getItem('thumbnail'),
		author: localStorage.getItem('author'),
		authorURL: localStorage.getItem('authorURL')
	}
}

/**
 * Websocket convertes and caches download
 * @param vidId 
 * @param title 
 * @param format 
 */
const queueDownload = (vidId: string, title: string, format: string) => {
	console.log(`Request to: ${vidId}`)
	const options: DownloadOptions = { filename: title, format: format }
	socket.emit('song-download', vidId, options).once('song-ready', (id: string) => {
		console.log(`Exepted ID: ${id}`)
		document.location.href = `http://192.168.27:4000/api/ytdl/${options.filename}.${options.format}`
	})
}

export const ConverterOptions: FC = () => {
	const [format, setFormat] = useState<string>('mp3')
	const [state, setState] = useState<boolean>(false)
	const Song = getLocalStorageSong()
	const formatSelector = [{label: "MP3", value: "mp3"}, {label: "WAV", value: "wav"}]
	
	return(
		<div>
			<div className="video-card">
				<a href={`https://www.youtube.com/watch?v=${Song.videoId}`} target="_blank" rel="noreferrer"><img src={Song.thumbnail} alt="thumbnail"></img></a>
				<div className="video-details">
					<h4>{Song.filename}</h4>
					<p>{Song.author}</p>
					<button className="options-btn" onClick={() => {
						const el = document.getElementById('popup-options')
						if(state) {
							el.classList.remove('popup-on')
							el.classList.add('popup-off')
							setState(false)
						} else {
							setState(true)
							el.classList.remove('popup-off')
							el.classList.add('popup-on')
						}
					}}>Options</button>
				</div>
			</div>
			<button className="download-btn" onClick={() => queueDownload(Song.videoId, Song.filename, format)}>Download</button>
			<div id="popup-options">
				<div className="options-container">
					<select onChange={(e) => setFormat(e.target.value)}>
						{formatSelector.map((item: { label: string, value: string }, itemIdx: number) => <option key={itemIdx} value={item.value}>{item.label}</option>)}
					</select>
				</div>
			</div>
		</div>
	)
}