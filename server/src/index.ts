import express from 'express'
import cors from 'cors'
import router from './api/router'
const app = express()

const PORT: number = 5000

app.use(router)

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'HEAD']
}))

app.listen(PORT, () => console.log(`Port: ${PORT}`))