import { createServer } from "http";
import { Server, Socket } from "socket.io";
import ytsr from 'yt-search'
import fs from 'fs'
import ytdl from 'ytdl-core'
import { DownloadOptions } from "./types/DownloadOptions";

export const createWebSocket = () => {
	const httpServer = createServer();
	const io = new Server(httpServer, {
	    cors: {
		origin: '*'
	    }
	});
	
	io.on("connection", (socket: Socket) => {
	    socket.on('string-query', async({ param, maxResult }) => {
		let Response = { search: [] }
		if(!param) return socket.emit('error', { error: 'no_param' });
		await ytsr({ query: param })
		.then((data) => {
			for (let i = 0; i < maxResult; i++) {
				Response.search[i] = {
					title: data.videos[i].title,
					url: data.videos[i].url,
					thumbnail: data.videos[i].thumbnail,
					channel: {
					    name: data.videos[i].author.name,
					    url: data.videos[i].author.url
					}
				}
			}
		    socket.emit('string-query-response', Response)
		}).catch((err) => socket.emit('error', { error: err }));
	    })
	
	    socket.on('url-query', (url: string) => {
		let Response;
		if(!url) return Response = { error: "no_url" }
		ytdl.getBasicInfo(url)
		    .then((data: ytdl.videoInfo) => {
			Response = {
			    search: [
				{
				    title: data.videoDetails.title,
				    url: url,
				    thumbnail: data.videoDetails.thumbnails[0].url,
				    channel: {
					name: data.videoDetails.ownerChannelName,
					url: data.videoDetails.author.channel_url
				    },
				}
			    ]
			}
			socket.emit('url-response', Response)
		    }).catch((err) => socket.emit('error', { error: err }))
	    })

	    socket.on('song-download', (vidId: string, options: DownloadOptions) => {
		const path: string = `src/cache/${options.filename}.${options.format}`
		ytdl(`https://www.youtube.com/watch?v=${vidId}`, { filter: 'audioonly' })
			.on('error', (err) => socket.emit('error', { error: err }))
			.pipe(fs.createWriteStream(path))
			.on('finish', () => socket.emit('song-ready', vidId))
	    })
	});

	httpServer.listen(5000, () => {
	    console.log("WebSocket Running")
	});
}