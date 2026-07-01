import { Button, Form, Input } from '@/shared/ui';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
}

export function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
      <Input
        placeholder="Name"
        {...register('name', { required: 'Name is required' })}
        error={errors.name?.message}
      />
      <Input
        type="email"
        placeholder="Email"
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Некорректный email' },
        })}
        error={errors.email?.message}
      />
      <Button type="submit" variant="primary" title="Submit" />
    </Form>
  );
}
