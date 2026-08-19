import { Prisma } from '@prisma/client';
import { HttpError } from './http-error';

export function toHttpError(error: unknown, fallbackMessage = 'An unexpected error occurred') {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': {
        const target = (error.meta?.target as string[] | undefined)?.join(', ') ?? 'поле';
        return new HttpError(409, `Значение уже занято: ${target}`, 'DUPLICATE_ENTRY');
      }
      case 'P2025':
        return new HttpError(404, 'Запись не найдена', 'NOT_FOUND');
      case 'P2003':
        return new HttpError(400, 'Нарушена связь между таблицами', 'FOREIGN_KEY_VIOLATION');
      default:
        return new HttpError(500, fallbackMessage, `PRISMA_${error.code}`);
    }
  }

  if (error instanceof HttpError) {
    return error;
  }

  return new HttpError(500, fallbackMessage, 'INTERNAL_SERVER_ERROR');
}
