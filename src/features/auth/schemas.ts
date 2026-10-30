import { z } from 'zod';

export const emailSchema = z.email('Введите корректный email').trim().toLowerCase();

export const newPasswordSchema = z
  .string()
  .min(10, 'Минимум 10 символов')
  .regex(/[a-zA-Z]/, 'Добавьте хотя бы одну букву')
  .regex(/[0-9]/, 'Добавьте хотя бы одну цифру');

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Введите пароль'),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: newPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });
export type SignUpValues = z.infer<typeof signUpSchema>;

export const codeSchema = z.object({
  code: z.string().trim().min(6, 'Введите код из письма').max(32, 'Слишком длинный код'),
});
export type CodeValues = z.infer<typeof codeSchema>;

export const forgotEmailSchema = z.object({ email: emailSchema });
export type ForgotEmailValues = z.infer<typeof forgotEmailSchema>;

export const resetPasswordSchema = z
  .object({ password: newPasswordSchema, confirmPassword: z.string() })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
