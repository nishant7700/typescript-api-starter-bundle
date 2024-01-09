import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRoles } from '../../domain/enums/UserRoles';

interface UserPayload {
  id: string;
  email: string;
  role: UserRoles;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    let token = req.headers.authorization.split(' ')[1];
    // console.log(token);

    try {
      const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
      // console.log('Payload', payload);

      req.currentUser = payload;
    } catch (err) {}
  } else {
    return next();
  }

  next();
};
