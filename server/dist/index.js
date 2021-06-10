"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./api/router"));
var app = express_1["default"]();
var PORT = 5000;
app.use(router_1["default"]);
app.use(cors_1["default"]({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'HEAD']
}));
app.listen(PORT, function () { return console.log("Port: " + PORT); });
