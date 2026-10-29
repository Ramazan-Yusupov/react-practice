import { z } from 'zod';

const errorBodySchema = z.object({
  message: z.string(),
  fieldErrors: z.record(z.string(), z.array(z.string()).optional()).optional(),
});

export class ApiError extends Error {
  readonly status: number;
  readonly fieldErrors: Record<string, string[] | undefined> | undefined;

  constructor(status: number, message: string, fieldErrors?: Record<string, string[] | undefined>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface ApiInit {
  token: string | null;
  method?: 'GET' | 'PATCH';
  body?: unknown;
}

/** Запрос к нашему API: токен Clerk в заголовке, ответ проверяется zod-схемой. */
export async function apiFetch<S extends z.ZodType>(
  path: string,
  schema: S,
  { token, method = 'GET', body }: ApiInit,
): Promise<z.output<S>> {
  const headers = new Headers();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (body !== undefined) headers.set('Content-Type', 'application/json');

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    const parsed = errorBodySchema.safeParse(await res.json().catch(() => null));
    throw new ApiError(
      res.status,
      parsed.success ? parsed.data.message : res.statusText,
      parsed.success ? parsed.data.fieldErrors : undefined,
    );
  }

  return schema.parse(await res.json());
}
