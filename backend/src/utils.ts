import jwt from 'jsonwebtoken';
import { User } from './models/userModel';

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
