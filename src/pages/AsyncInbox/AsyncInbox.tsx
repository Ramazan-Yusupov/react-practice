import {
  useActionState,
  useEffect,
  useMemo,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react';
import { FiCheckCircle, FiClock, FiRefreshCw, FiTrash2, FiXCircle } from 'react-icons/fi';
import { z } from 'zod';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { Button } from '@/shared/ui';

type Priority = 'low' | 'medium' | 'high';
type TaskStatus = 'sending' | 'sent' | 'failed';

type InboxTask = {
  id: string;
  text: string;
  priority: Priority;
  status: TaskStatus;
  attempts: number;
  createdAt: string;
};

type FormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldError?: string;
  resetKey?: number;
};

type OptimisticCommand = { type: 'add'; task: InboxTask } | { type: 'replace'; task: InboxTask };

const INITIAL_FORM_STATE: FormState = {
  status: 'idle',
};

const taskSchema = z.object({
  text: z.string().trim().min(3, 'Напиши минимум 3 символа.').max(140, 'Максимум 140 символов.'),
  priority: z.enum(['low', 'medium', 'high']),
});

const priorityLabel: Record<Priority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

const priorityClass: Record<Priority, string> = {
  low: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200',
  medium: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  high: 'border-rose-300/30 bg-rose-300/10 text-rose-100',
};

const statusMeta: Record<TaskStatus, { label: string; className: string }> = {
  sending: {
    label: 'Отправляется',
    className: 'border-blue-300/30 bg-blue-300/10 text-blue-100',
  },
  sent: {
    label: 'Отправлено',
    className: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
  },
  failed: {
    label: 'Ошибка',
    className: 'border-rose-300/30 bg-rose-300/10 text-rose-100',
  },
};

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function formatTime(isoDate: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));
}

function getStatusIcon(status: TaskStatus) {
  if (status === 'sending') {
    return <FiClock className="animate-pulse" size={16} />;
  }

  if (status === 'sent') {
    return <FiCheckCircle size={16} />;
  }

  return <FiXCircle size={16} />;
}

export function AsyncInbox() {
  const [tasks, setTasks] = useLocalStorage<InboxTask[]>('async-inbox-tasks', []);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [isRetryPending, startRetryTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);
  const lastResetKey = useRef<number | undefined>(undefined);

  const [optimisticTasks, applyOptimistic] = useOptimistic<InboxTask[], OptimisticCommand>(
    tasks,
    (currentTasks, command) => {
      if (command.type === 'add') {
        return [command.task, ...currentTasks];
      }

      return currentTasks.map((task) => (task.id === command.task.id ? command.task : task));
    },
  );

  const [formState, formAction, isSending] = useActionState(
    async (_previousState: FormState, formData: FormData): Promise<FormState> => {
      const parsed = taskSchema.safeParse({
        text: String(formData.get('text') ?? ''),
        priority: String(formData.get('priority') ?? 'medium'),
      });

      if (!parsed.success) {
        return {
          status: 'error',
          fieldError: parsed.error.issues[0]?.message ?? 'Проверь введённые данные.',
        };
      }

      const task: InboxTask = {
        id: createId(),
        text: parsed.data.text,
        priority: parsed.data.priority,
        status: 'sending',
        attempts: 1,
        createdAt: new Date().toISOString(),
      };

      applyOptimistic({
        type: 'add',
        task,
      });

      await wait(700 + Math.random() * 700);

      const shouldFail = formData.get('forceFailure') === 'on' || Math.random() < 0.22;

      const nextTask: InboxTask = {
        ...task,
        status: shouldFail ? 'failed' : 'sent',
      };

      setTasks((currentTasks) => [nextTask, ...currentTasks]);

      if (shouldFail) {
        return {
          status: 'error',
          message: 'Отправка не удалась. Нажми «Повторить» в карточке задачи.',
        };
      }

      return {
        status: 'success',
        message: 'Задача отправлена в очередь.',
        resetKey: Date.now(),
      };
    },
    INITIAL_FORM_STATE,
  );

  useEffect(() => {
    if (
      formState.status === 'success' &&
      formState.resetKey !== undefined &&
      formState.resetKey !== lastResetKey.current
    ) {
      formRef.current?.reset();
      lastResetKey.current = formState.resetKey;
    }
  }, [formState]);

  const stats = useMemo(
    () => ({
      total: optimisticTasks.length,
      sent: optimisticTasks.filter((task) => task.status === 'sent').length,
      failed: optimisticTasks.filter((task) => task.status === 'failed').length,
    }),
    [optimisticTasks],
  );

  function removeTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function retryTask(task: InboxTask) {
    setRetryingId(task.id);

    startRetryTransition(async () => {
      const sendingTask: InboxTask = {
        ...task,
        status: 'sending',
        attempts: task.attempts + 1,
      };

      applyOptimistic({
        type: 'replace',
        task: sendingTask,
      });

      await wait(700 + Math.random() * 700);

      const nextTask: InboxTask = {
        ...sendingTask,
        status: Math.random() < 0.2 ? 'failed' : 'sent',
      };

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) => (currentTask.id === task.id ? nextTask : currentTask)),
      );

      setRetryingId(null);
    });
  }

  return (
    <main className="mx-auto max-w-7xl pb-12">
      <section className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.24em] text-blue-300 uppercase">
          React 19 playground
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Async Inbox</h1>

        <p className="leading-7 text-white/60">
          Мини-доска с оптимистичными обновлениями: задача появляется сразу, а затем получает
          результат имитации серверной отправки.
        </p>
      </section>

      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Всего" value={stats.total} helper="Вся очередь" />
        <StatCard label="Готово" value={stats.sent} helper="Успешно отправлено" />
        <StatCard label="Ошибки" value={stats.failed} helper="Можно повторить" />
      </section>

      <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20">
          <div className="mb-6 space-y-2">
            <p className="text-lg font-semibold">Новая задача</p>

            <p className="text-sm leading-6 text-white/50">
              Валидация выполняется через Zod. Для теста ошибки включи переключатель ниже.
            </p>
          </div>

          <form ref={formRef} action={formAction} className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm text-white/80">Что нужно отправить?</span>

              <textarea
                name="text"
                rows={5}
                maxLength={140}
                placeholder="Например: повторить useOptimistic перед следующим занятием"
                className="w-full resize-y rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
                aria-describedby={formState.fieldError ? 'async-inbox-text-error' : undefined}
              />

              {formState.fieldError && (
                <span id="async-inbox-text-error" className="block text-xs text-rose-200">
                  {formState.fieldError}
                </span>
              )}
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-white/80">Приоритет</span>

              <select
                name="priority"
                defaultValue="medium"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-blue-300/60"
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/70">
              <input
                name="forceFailure"
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-white/30 accent-rose-400"
              />

              <span>
                Имитировать ошибку сети
                <span className="mt-1 block text-xs leading-5 text-white/40">
                  В обычном режиме ошибка также случайно появляется примерно в 1 из 5 запросов.
                </span>
              </span>
            </label>

            <Button type="submit" variant="primary" className="w-full" disabled={isSending}>
              {isSending ? 'Отправляем…' : 'Отправить в очередь'}
            </Button>

            <p aria-live="polite" className="min-h-5 text-xs text-white/55">
              {formState.message}
            </p>
          </form>
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
            <div>
              <p className="font-semibold">Очередь</p>
              <p className="mt-1 text-xs text-white/45">Сохраняется в localStorage браузера</p>
            </div>

            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/60">
              {stats.total} {stats.total === 1 ? 'задача' : 'задач'}
            </span>
          </div>

          <div className="space-y-3 p-4">
            {optimisticTasks.length ? (
              optimisticTasks.map((task) => {
                const isTaskRetrying = task.id === retryingId && isRetryPending;
                const status = statusMeta[task.status];

                return (
                  <article
                    key={task.id}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-white/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${status.className}`}
                          >
                            {getStatusIcon(task.status)}
                            {status.label}
                          </span>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs ${priorityClass[task.priority]}`}
                          >
                            {priorityLabel[task.priority]}
                          </span>
                        </div>

                        <p className="break-words text-sm leading-6 text-white/90">{task.text}</p>

                        <p className="mt-3 text-xs text-white/40">
                          {formatTime(task.createdAt)} · попытка {task.attempts}
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label="Удалить задачу"
                        onClick={() => removeTask(task.id)}
                        className="rounded-lg p-2 text-white/40 transition hover:bg-white/10 hover:text-white"
                      >
                        <FiTrash2 size={17} />
                      </button>
                    </div>

                    {task.status === 'failed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full border-rose-200/30 text-rose-100 hover:border-rose-100/70"
                        onClick={() => retryTask(task)}
                        disabled={isRetryPending}
                      >
                        <FiRefreshCw className={isTaskRetrying ? 'animate-spin' : ''} size={15} />
                        {isTaskRetrying ? 'Повторяем…' : 'Повторить отправку'}
                      </Button>
                    )}
                  </article>
                );
              })
            ) : (
              <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-white/15 p-6 text-center">
                <div className="max-w-xs space-y-2">
                  <FiClock className="mx-auto text-white/35" size={28} />

                  <p className="font-medium text-white/80">Очередь пока пустая</p>

                  <p className="text-sm leading-6 text-white/45">
                    Отправь первую задачу — она появится здесь ещё до завершения имитации запроса.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <InfoCard number="01" text="Форма запускает async action через useActionState." />
        <InfoCard number="02" text="useOptimistic показывает задачу со статусом «Отправляется»." />
        <InfoCard number="03" text="После ответа статус сохраняется в localStorage." />
      </section>
    </main>
  );
}

function StatCard({ label, value, helper }: { label: string; value: number; helper: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-sm text-white/50">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-white/35">{helper}</p>
    </article>
  );
}

function InfoCard({ number, text }: { number: string; text: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs tracking-[0.2em] text-blue-200 uppercase">Шаг {number}</p>
      <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
    </article>
  );
}
