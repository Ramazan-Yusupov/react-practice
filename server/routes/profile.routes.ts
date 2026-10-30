import { Router } from 'express';
import { z } from 'zod';
import { getUserId } from '../auth.ts';
import { HttpError } from '../errors.ts';
import { writeLimiter } from '../security.ts';
import { getOrCreateProfile, getPublicProfile, updateProfile } from '../profiles.service.ts';
import { updateProfileSchema, usernameSchema } from '../../src/shared/api/profile.schemas.ts';

export const profileRouter = Router();

// Текущий пользователь: при первом входе профиль создаётся автоматически
profileRouter.get('/me', async (req, res) => {
  res.set('Cache-Control', 'no-store'); // личные данные не кэшируем
  res.json(await getOrCreateProfile(getUserId(req)));
});

profileRouter.patch('/me', writeLimiter, async (req, res) => {
  const userId = getUserId(req);

  const parsed = updateProfileSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError(400, 'Некорректные данные', z.flattenError(parsed.error).fieldErrors);
  }

  res.set('Cache-Control', 'no-store');
  res.json(await updateProfile(userId, parsed.data));
});

// Публичный профиль: авторизация не нужна
profileRouter.get('/profiles/:username', async (req, res) => {
  const username = usernameSchema.safeParse(req.params.username);
  if (!username.success) throw new HttpError(404, 'Профиль не найден');

  res.json(await getPublicProfile(username.data));
});
