import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { productRouter } from './routers/productRouter';
import { seedRouter } from './routers/seedRouter';
import { userRouter } from './routers/userRouter';
import { orderRouter } from './routers/orderRouter';
import { keyRouter } from './routers/keyRouter';
import path from 'path';

//**this is for the index so they can access
// .env file
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://user1:user1@cluster0.kuck5rh.mongodb.net/tsamazonadb?retryWrites=true&w=majority&appName=Cluster0';
// console.log(MONGODB_URI);
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGODB_URI!)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log(err);
    // console.log('test');
    console.log('error mongodb');
  });

const app = express();

//harus pake cors, kalau enggak gabisa
// dipanggil frontend
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

//by adding this middleware
// we can access the request body json from API call
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/keys', keyRouter);

// const PORT = 4000;
// pathnya ../.. ini karena dia ada di dalam backend/src
//sedangkan frontendnya ada di sebalik folder backend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('*', (req: Request, res: Response) =>
  //when the user enter the root of the project
  // we send a file to the user in the browser
  // and the file is the one we declare here '../../frontend/dist/index.html'
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
);

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
