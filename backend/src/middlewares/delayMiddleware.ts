import { Request, Response, NextFunction } from 'express';

// Simulate artificial API delays
const delayMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const delay = parseInt(process.env.API_DELAY || '1000', 10);
  setTimeout(() => {
    next();
  }, delay);
};

export default delayMiddleware;
