import { Request, Response, NextFunction } from 'express';
import { ERROR_INTERNAL_SERVER } from '../utils/constants';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || ERROR_INTERNAL_SERVER;
  res.status(statusCode).json({ error: message });
};