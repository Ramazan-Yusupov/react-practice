import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(80, 'Название не должно быть длиннее 80 символов'),

  topic: z
    .string()
    .trim()
    .min(2, 'Укажите тему задачи')
    .max(40, 'Тема не должна быть длиннее 40 символов'),

  level: z.enum(['easy', 'medium', 'hard', 'expert']),

  estimatedTime: z.coerce
    .number()
    .int('Введите целое число')
    .min(1, 'Минимальное время — 1 минута')
    .max(480, 'Максимальное время — 480 минут'),
});

export type CreateTaskInput = z.input<typeof createTaskSchema>;
export type CreateTaskValues = z.output<typeof createTaskSchema>;
