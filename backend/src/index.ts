import express, { Request, Response } from 'express'
import { sampleProducts } from './data'
import cors from 'cors'
import { ProductType } from './types/ProductType'

const app = express()

//harus pake cors, kalau enggak gabisa
// dipanggil
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)
app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProducts)
})

app.get('/api/products/:slug', (req: Request, res: Response) => {
  try {
    const findBySlug = (x: ProductType) => {
      return x.slug === req.params.slug
    }
    const data = sampleProducts.find(findBySlug)

    if (!data) {
      res.json('oh shit')
    }

    res.json(data)
  } catch (error) {
    console.log('oh no')
  }
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
