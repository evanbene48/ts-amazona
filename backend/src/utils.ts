import jwt from 'jsonwebtoken';
import { User } from './models/userModel';
import { NextFunction, Request, Response } from 'express';

export const generateToken = (user: User) => {
  //this will return the hashed version of the values
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    //this is the hashcode
    process.env.JWT_SECRET || 'somethingsecret',
    //this is the expire duration of the hashed
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  // penulisan di atas bisa jg ditulis dengan seperti ini
  //  const authorization = req.headers.authorization;
  // console.log('isAuth');
  // console.log(authorization);
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer xxxxx
    // console.log(`token`);
    // console.log(token);
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret'
    );
    // console.log(decode);
    req.user = decode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    // console.log(`isAuth`);
    next();
  } else {
    res.status(401).json({ message: 'No Token' });
  }
};
