import { getAuth } from '@clerk/express';
import { ipKeyGenerator, rateLimit } from 'express-rate-limit';

const TOO_MANY = { message: 'Слишком много запросов. Попробуйте позже' };

/** Общий лимит на весь API: по IP, до проверки токена (дёшево отсекает флуд). */
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: TOO_MANY,
});

/** Лимит на изменения: по userId (если вошёл), иначе по IP. */
export const writeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: TOO_MANY,
  keyGenerator: (req) => getAuth(req).userId ?? ipKeyGenerator(req.ip ?? ''),
});
