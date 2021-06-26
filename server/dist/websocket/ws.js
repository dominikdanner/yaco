"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createWebSocket = void 0;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var yt_search_1 = __importDefault(require("yt-search"));
var fs_1 = __importDefault(require("fs"));
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var createWebSocket = function () {
    var httpServer = http_1.createServer();
    var io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*'
        }
    });
    io.on("connection", function (socket) {
        socket.on('string-query', function (_a) {
            var param = _a.param, maxResult = _a.maxResult;
            return __awaiter(void 0, void 0, void 0, function () {
                var Response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            Response = { search: [] };
                            if (!param)
                                return [2 /*return*/, socket.emit('error', { error: 'no_param' })];
                            return [4 /*yield*/, yt_search_1["default"]({ query: param })
                                    .then(function (data) {
                                    for (var i = 0; i < maxResult; i++) {
                                        Response.search[i] = {
                                            title: data.videos[i].title,
                                            url: data.videos[i].url,
                                            thumbnail: data.videos[i].thumbnail,
                                            channel: {
                                                name: data.videos[i].author.name,
                                                url: data.videos[i].author.url
                                            }
                                        };
                                    }
                                    socket.emit('string-query-response', Response);
                                })["catch"](function (err) { return socket.emit('error', { error: err }); })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
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
                            thumbnail: data.videoDetails.thumbnails[0].url,
                            channel: {
                                name: data.videoDetails.ownerChannelName,
                                url: data.videoDetails.author.channel_url
                            }
                        }
                    ]
                };
                socket.emit('url-response', Response);
            })["catch"](function (err) { return socket.emit('error', { error: err }); });
        });
        socket.on('song-download', function (vidId, options) {
            var path = "src/cache/" + options.filename + "." + options.format;
            ytdl_core_1["default"]("https://www.youtube.com/watch?v=" + vidId, { filter: 'audioonly' })
                .on('error', function (err) { return socket.emit('error', { error: err }); })
                .pipe(fs_1["default"].createWriteStream(path))
                .on('finish', function () { return socket.emit('song-ready', vidId); });
        });
    });
    httpServer.listen(5000, function () {
        console.log("WebSocket Running");
    });
};
exports.createWebSocket = createWebSocket;
