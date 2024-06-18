import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel';
import { isAuth } from '../utils';
import { OrderModel } from '../models/orderModel';

export const orderRouter = express.Router();
// /api/prodcuts
orderRouter.get(
  // /api/orders/:id
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      const orderId = order.user!.toString();
      // console.log(req.user._id);
      // console.log(orderId);
      // console.log(typeof req.user._id);
      // console.log(typeof orderId);
      if (orderId === req.user._id) {
        res.json(order);
        return;
      } else {
        res.status(404).json({ message: 'Order Not Found' });
      }
      // console.log('hehe');
    } else {
      res.status(404).json({ message: 'Order Not Found' });
    }
  })
);

orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      res.status(201).json({ message: 'Order Created', order: createdOrder });
    }
  })
);
