import express from 'express'
import cors from 'cors'
import router from './routes/router'
const app = express()

export const createHTTPServer = () => {
	app.use(cors({ origin: '*' }))
	app.use('/api', router)
	app.listen(4000, () => console.log("WebServer Running"))
}