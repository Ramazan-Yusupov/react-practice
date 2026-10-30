import type { FormEventHandler, ReactNode } from 'react';
import { Form } from '@/shared/ui';

interface AuthCardProps {
  title: string;
  description?: string;
  error?: string | undefined;
  notice?: string | undefined;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({
  title,
  description,
  error,
  notice,
  onSubmit,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="mx-auto w-full max-w-md">
      <Form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 p-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
        </div>

        {children}

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        {notice && <p className="text-sm text-yellow-400">{notice}</p>}
      </Form>
      {footer && <div className="mt-4 text-center text-sm text-gray-400">{footer}</div>}
    </div>
  );
}
