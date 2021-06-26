import express from 'express'
import fs from 'fs'
const router = express.Router()

router.get('/ytdl/:file', async(req, res) => {
	const path = `src/cache/${req.params.file}`
	res.download(path)
	fs.rm(path, _ => console.info("Cache Service"))
})

export default router