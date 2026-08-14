import type { ErrorRequestHandler } from 'express';
import { HttpError } from '../utils/http-error';

export const errorMiddleware: ErrorRequestHandler = (error, _req, res) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      message: error.message,
      code: error.code,
      details: error.details,
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: 'Внутренняя ошибка сервера',
    code: 'INTERNAL_SERVER_ERROR',
  });
};
