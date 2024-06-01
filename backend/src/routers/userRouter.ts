import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/userModel';
import { generateToken } from '../utils';

export const userRouter = express.Router();
// POST /api/users/signin
userRouter.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body.password || !req.body.email) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      //compare a string against a hash
      // req.body.passwordnya itu string password
      // user.password itu udh hashed passwordnya
      console.log('masuk sini');
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).json({ message: 'Invalid email or password' });
  })
);