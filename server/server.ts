import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import { env } from './env.ts';
import { HttpError } from './errors.ts';
import { profileRouter } from './routes/profile.routes.ts';

const app = express();

app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json({ limit: '10kb' }));
// Проверяет токен из заголовка Authorization: Bearer ...
// authorizedParties: токен принимается только со страницы нашего фронтенда
app.use(clerkMiddleware({ authorizedParties: [env.CLIENT_URL] }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', profileRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Не найдено' });
});

// Express считает обработчиком ошибок только функцию с 4 аргументами, поэтому _next нужен
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message, fieldErrors: err.fieldErrors });
    return;
  }
  if (err instanceof SyntaxError) {
    res.status(400).json({ message: 'Некорректный JSON' });
    return;
  }
  console.error(err);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
};
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`API запущен: http://localhost:${env.PORT}`);
});
