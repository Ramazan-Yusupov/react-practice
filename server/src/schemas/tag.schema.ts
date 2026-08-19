import { z } from 'zod';
export const createTagSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, { message: 'Введите название тега' })
    .max(32, { message: 'Максимум 32 символа' }),
});

export const reorderTagsSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'Список id не может быть пустым'),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type ReorderTagsInput = z.infer<typeof reorderTagsSchema>;
