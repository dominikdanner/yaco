"use strict";
exports.__esModule = true;
var ws_1 = require("./websocket/ws");
var server_1 = require("./http/server");
// Starts Up Websocket
ws_1.createWebSocket();
// Starts Up HTTP Server
server_1.createHTTPServer();
