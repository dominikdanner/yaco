import express from 'express'
import ytdl from 'ytdl-core'
import fs from 'fs'
const router = express.Router()

router.get('/ytdl/:vidId', async(req, res) => {
	console.time('Convert')
	const vidId = req.params.vidId
	const format = req.query.format
	const filename = req.query.filename
	const path: string = `src/http/cache/${filename}.${format}`
	await ytdl(`https://www.youtube.com/watch?v=${vidId}`, { filter: 'audioonly' })
	.pipe(fs.createWriteStream(path)).on('finish', () => {
		setTimeout(() => {
			fs.unlinkSync(path)
		}, 5000)
		res.download(path)
		console.timeEnd('Convert')
	})
})

export default router