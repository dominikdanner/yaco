import express from 'express';
import cors from 'cors'
import ytsr from 'yt-search'
const router = express.Router();

router.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'HEAD']
}))

router.get('/search', (req, res) => {
    const param = req!.query!.query
    if(typeof param === 'undefined') return res.send('no query')
    if(param == "") return res.send('query missing')
    // @ts-ignore
    ytsr({
        query: param,
        
    }).then(data => res.json({
        search: [
            {
                title: data.videos[0].title,
                channel: data.videos[0].author,
                url: data.videos[0].url,
                thumbnail: data.videos[0].thumbnail,
            },
            {
                title: data.videos[1].title,
                channel: data.videos[1].author,
                url: data.videos[1].url,
                thumbnail: data.videos[1].thumbnail,
            },
            {
                    title: data.videos[2].title,
                    channel: data.videos[2].author,
                    url: data.videos[2].url,
                    thumbnail: data.videos[2].thumbnail,
            }
        ]
    })).catch((err) => res.json({ error: err }));
})

export default router