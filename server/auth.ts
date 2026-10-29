import { getAuth } from '@clerk/express';
import type { Request } from 'express';
import { HttpError } from './errors.ts';

/** Id пользователя из проверенной Clerk-сессии или 401. */
export function getUserId(req: Request): string {
  const { userId } = getAuth(req);
  if (!userId) throw new HttpError(401, 'Требуется авторизация');
  return userId;
}
