import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { tagsRouter } from './routes/tags.routes';

export const app = express();

const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173';

app.use(
  cors({
    origin: clientUrl,
  }),
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ data: { status: 'ok' } });
});

app.use('/api/tags', tagsRouter);
app.use(errorMiddleware);
