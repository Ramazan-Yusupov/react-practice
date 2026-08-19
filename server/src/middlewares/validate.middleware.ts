import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { HttpError } from '../utils/http-error';

export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.flatten();
      next(new HttpError(400, 'Некорректные данные', 'VALIDATION_ERROR', details));
      return;
    }

    req.body = result.data;
    next();
  };
}
