import { createWebSocket } from './websocket/ws'
import { createHTTPServer } from './http/server'

// Starts Up Websocket
createWebSocket()

// Starts Up HTTP Server
createHTTPServer()