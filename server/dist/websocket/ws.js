"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createWebSocket = void 0;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var yt_search_1 = __importDefault(require("yt-search"));
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var createWebSocket = function () {
    var httpServer = http_1.createServer();
    var io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*'
        }
    });
    io.on("connection", function (socket) {
        socket.on('search-query', function (param) {
            console.time('Query');
            var Response;
            if (!param)
                return Response = { error: 'no_param' };
            yt_search_1["default"]({
                query: param
            }).then(function (data) {
                Response = {
                    search: [
                        {
                            title: data.videos[0].title,
                            url: data.videos[0].url,
                            thumbnail: data.videos[0].thumbnail,
                            channel: {
                                name: data.videos[0].author.name,
                                url: data.videos[0].author.url
                            }
                        },
                        {
                            title: data.videos[1].title,
                            url: data.videos[1].url,
                            thumbnail: data.videos[1].thumbnail,
                            channel: {
                                name: data.videos[1].author.name,
                                url: data.videos[1].author.url
                            }
                        },
                        {
                            title: data.videos[2].title,
                            url: data.videos[2].url,
                            thumbnail: data.videos[2].thumbnail,
                            channel: {
                                name: data.videos[2].author.name,
                                url: data.videos[2].author.url
                            }
                        }
                    ]
                };
                socket.emit('search-response', Response);
                console.timeEnd('Query');
            })["catch"](function (err) { return Response = { error: err }; });
        });
        socket.on('url-query', function (url) {
            var Response;
            if (!url)
                return Response = { error: "no_url" };
            ytdl_core_1["default"].getBasicInfo(url)
                .then(function (data) {
                Response = {
                    search: [
                        {
                            title: data.videoDetails.title,
                            url: url,
                            channel: {
                                name: data.videoDetails.ownerChannelName,
                                url: data.videoDetails.author.channel_url
                            },
                            thumbnail: data.videoDetails.thumbnails[0].url
                        }
                    ]
                };
                socket.emit('url-response', Response);
            })["catch"](function (err) { return Response = { error: err }; });
        });
    });
    httpServer.listen(5000, function () {
        console.log("WebSocket Running");
    });
};
exports.createWebSocket = createWebSocket;
