import express from 'express'
import { dbConnection } from './database/dbconnection.js'
import categoryRouter from './modules/category/category.routes.js'
import { bootstrap } from './modules/index.routes.js'
import multer from 'multer'
import cors from 'cors'

const app = express()
const port = 4000
app.use(cors())
app.use('/uploads',express.static('uploads'))
app.use(express.json())
bootstrap(app)
dbConnection()

app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))