import express from 'express'
import fs from 'fs'
const router = express.Router()

router.get('/ytdl/:file', async(req, res) => {
	const filename = req.params.file
	res.download(`src/cache/${filename}`)
	setTimeout(() => {
		fs.unlink(filename, () => console.log("Cache cleared"))
	}, 1000 * 1 * 10)
})

export default router