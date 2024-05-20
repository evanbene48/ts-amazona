import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'

//**this is for the index so they can access
// .env file
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI!)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('error mongodb')
  })

const app = express()

//harus pake cors, kalau enggak gabisa
// dipanggil frontend
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.use('/api/products', productRouter)
app.use('/api/seed', seedRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
