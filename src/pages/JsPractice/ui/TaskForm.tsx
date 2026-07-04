import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Input } from '@/shared/ui';
import { createTaskSchema, type CreateTaskInput, type CreateTaskValues } from '../model/taskSchema';

type TaskFormProps = {
  onCreateTask: (taskData: CreateTaskValues) => void;
};

export function TaskForm({ onCreateTask }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskInput, unknown, CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      topic: 'JavaScript',
      level: 'easy',
      estimatedTime: 15,
    },
  });

  const handleCreateTask = (values: CreateTaskValues) => {
    onCreateTask(values);

    reset({
      title: '',
      topic: 'JavaScript',
      level: 'easy',
      estimatedTime: 15,
    });
  };

  return (
    <Card className="border border-white/10 bg-white/3">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Создать новую задачу</h2>
        <p className="text-sm text-gray-400">Добавьте практическую задачу в текущий список.</p>
      </div>

      <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(handleCreateTask)}>
        <label className="space-y-2">
          <span className="text-sm font-medium">Название</span>

          <Input placeholder="Например: Изучить find" {...register('title')} />

          {errors.title && <span className="text-sm text-red-400">{errors.title.message}</span>}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Тема</span>

          <Input placeholder="Например: Методы массивов" {...register('topic')} />

          {errors.topic && <span className="text-sm text-red-400">{errors.topic.message}</span>}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Сложность</span>

          <select className="w-full rounded-2xl border-2 p-2.5 outline-none" {...register('level')}>
            <option value="easy" className="text-black">
              Легкий
            </option>
            <option value="medium" className="text-black">
              Средний
            </option>
            <option value="hard" className="text-black">
              Сложный
            </option>
            <option value="expert" className="text-black">
              Эксперт
            </option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Время, минуты</span>

          <Input
            type="number"
            min={1}
            max={480}
            placeholder="Например: 15"
            {...register('estimatedTime')}
          />

          {errors.estimatedTime && (
            <span className="text-sm text-red-400">{errors.estimatedTime.message}</span>
          )}
        </label>

        <div className="md:col-span-2">
          <Button type="submit" variant="primary">
            Добавить задачу
          </Button>
        </div>
      </form>
    </Card>
  );
}
