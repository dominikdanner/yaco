"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var yt_search_1 = __importDefault(require("yt-search"));
var router = express_1["default"].Router();
router.use(cors_1["default"]({
    origin: '*',
    methods: ['GET', 'POST', 'HEAD']
}));
router.get('/search', function (req, res) {
    var param = req.query.query;
    if (typeof param === 'undefined')
        return res.send('no query');
    if (param == "")
        return res.send('query missing');
    // @ts-ignore
    yt_search_1["default"]({
        query: param
    }).then(function (data) { return res.json({
        search: [
            {
                title: data.videos[0].title,
                channel: data.videos[0].author,
                url: data.videos[0].url,
                thumbnail: data.videos[0].thumbnail
            },
            {
                title: data.videos[1].title,
                channel: data.videos[1].author,
                url: data.videos[1].url,
                thumbnail: data.videos[1].thumbnail
            },
            {
                title: data.videos[2].title,
                channel: data.videos[2].author,
                url: data.videos[2].url,
                thumbnail: data.videos[2].thumbnail
            }
        ]
    }); })["catch"](function (err) { return res.json({ error: err }); });
});
exports["default"] = router;
