import { z } from 'zod';

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9_]{3,20}$/, 'От 3 до 20 символов: a-z, 0-9 и _');

// Только http/https: иначе в href можно подставить javascript:...
export const websiteSchema = z.union([
  z.literal(''),
  z.url({ protocol: /^https?$/, error: 'Ссылка должна начинаться с http:// или https://' }),
]);

export const hexColorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Цвет в формате #rrggbb');

/** То, что сервер отдаёт клиенту. clerk_user_id наружу не уходит. */
export const profileSchema = z.object({
  id: z.string(),
  username: usernameSchema,
  displayName: z.string(),
  bio: z.string(),
  avatarUrl: z.string(),
  location: z.string(),
  website: websiteSchema,
  bannerColor: hexColorSchema,
  createdAt: z.string(),
});
export type Profile = z.infer<typeof profileSchema>;

/** То, что пользователь может менять сам. */
export const updateProfileSchema = z.object({
  username: usernameSchema,
  displayName: z.string().trim().min(1, 'Введите имя').max(50, 'Максимум 50 символов'),
  bio: z.string().trim().max(160, 'Максимум 160 символов'),
  location: z.string().trim().max(30, 'Максимум 30 символов'),
  website: websiteSchema,
  bannerColor: hexColorSchema,
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
