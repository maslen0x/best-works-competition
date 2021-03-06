import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

import connect from './core/db.js'
import pagesRouter from './routes/pages.js'
import usersRouter from './routes/users.js'
import worksRouter from './routes/works.js'
import technicalExpertiseRouter from './routes/technicalExpertise.js'
import expertReviewRouter from './routes/expertReview.js'

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.set('view engine', 'ejs')

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/uploads', express.static('uploads'))

app.use('/', pagesRouter)
app.use('/api/users', usersRouter)
app.use('/api/works', worksRouter)
app.use('/api/technical-expertise', technicalExpertiseRouter)
app.use('/api/expert-reviews', expertReviewRouter)

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    connect(MONGO_URI)
  } catch (e) {
    console.log(e)
  }
}

start()