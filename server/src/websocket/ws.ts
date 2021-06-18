import { createServer } from "http";
import { Server, Socket } from "socket.io";
import ytsr from 'yt-search'
import fs from 'fs'
import ytdl from 'ytdl-core'
import { SongResult } from "./types/SongResult";
import { DownloadOptions } from "./types/DownloadOptions";

export const createWebSocket = () => {
	const httpServer = createServer();
	const io = new Server(httpServer, {
	    cors: {
		origin: '*'
	    }
	});
	
	io.on("connection", (socket: Socket) => {
	    socket.on('search-query', (param: string) => {
		console.time('Query')
		let Response: SongResult | { error: Error | string };
		if(!param) return Response = { error: 'no_param' };
		ytsr({
		    query: param,
		}).then((data) => {
		    Response = {
			search: [
			    {
				title: data.videos[0].title,
				url: data.videos[0].url,
				thumbnail: data.videos[0].thumbnail,
				channel: {
				    name: data.videos[0].author.name,
				    url: data.videos[0].author.url
				},
			    },
			    {
				title: data.videos[1].title,
				url: data.videos[1].url,
				thumbnail: data.videos[1].thumbnail,
				channel: {
				    name: data.videos[1].author.name,
				    url: data.videos[1].author.url
				},
			    },
			    {
				title: data.videos[2].title,
				url: data.videos[2].url,
				thumbnail: data.videos[2].thumbnail,
				channel: {
				    name: data.videos[2].author.name,
				    url: data.videos[2].author.url
				},
			    }
			],
		    }
		    socket.emit('search-response', Response)
		    console.timeEnd('Query')
		}).catch((err) => Response = { error: err });
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
				    channel: {
					name: data.videoDetails.ownerChannelName,
					url: data.videoDetails.author.channel_url
				    },
				    thumbnail: data.videoDetails.thumbnails[0].url,
				}
			    ]
			}
			socket.emit('url-response', Response)
		    }).catch((err) => Response = { error: err })
	    })
	});

	httpServer.listen(5000, () => {
	    console.log("WebSocket Running")
	});
}