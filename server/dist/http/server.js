"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createHTTPServer = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./routes/router"));
var app = express_1["default"]();
var createHTTPServer = function () {
    app.use(cors_1["default"]({ origin: '*' }));
    app.use('/api', router_1["default"]);
    app.listen(4000, function () { return console.log("WebServer Running"); });
};
exports.createHTTPServer = createHTTPServer;
