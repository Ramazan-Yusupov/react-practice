import { useEffect, useMemo, useState } from 'react';
import {
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiPause,
  FiPlay,
  FiRotateCcw,
  FiTarget,
  FiTrash2,
  FiZap,
} from 'react-icons/fi';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

type TaskLevel = 'Базовый' | 'Средний' | 'Продвинутый';

type FocusTask = {
  id: string;
  title: string;
  category: string;
  level: TaskLevel;
  description: string;
  prompts: string[];
};

type FocusSession = {
  id: string;
  taskId: string;
  startedAt: string;
  finishedAt: string;
  durationSeconds: number;
  notePreview: string;
};

const TASKS: FocusTask[] = [
  {
    id: 'array-methods',
    title: 'Методы массивов',
    category: 'JavaScript',
    level: 'Базовый',
    description:
      'Разбери разницу между map, filter, reduce, find и forEach. Попробуй объяснить, когда каждый метод подходит лучше обычного цикла.',
    prompts: [
      'Чем map отличается от forEach?',
      'Какой метод вернёт первый найденный элемент?',
      'Когда reduce делает код сложнее, а не лучше?',
    ],
  },
  {
    id: 'async-await',
    title: 'Async / Await',
    category: 'JavaScript',
    level: 'Средний',
    description:
      'Собери в голове модель работы Promise, async/await, try/catch и последовательных либо параллельных запросов.',
    prompts: [
      'Что именно возвращает async-функция?',
      'Когда использовать Promise.all?',
      'Как обработать ошибку запроса?',
    ],
  },
  {
    id: 'react-state',
    title: 'Состояние React',
    category: 'React',
    level: 'Средний',
    description:
      'Потренируй обновление состояния, функциональные сеттеры, иммутабельность и зависимые значения.',
    prompts: [
      'Почему нельзя напрямую менять объект state?',
      'Когда нужен функциональный setState?',
      'Что лучше вычислять, а не хранить в state?',
    ],
  },
  {
    id: 'typescript-generics',
    title: 'TypeScript Generics',
    category: 'TypeScript',
    level: 'Продвинутый',
    description:
      'Разберись с generic-типами, ограничениями extends, keyof и тем, как сделать функцию безопаснее без any.',
    prompts: [
      'Что даёт generic вместо any?',
      'Для чего нужен extends в generic-типе?',
      'Как работает keyof?',
    ],
  },
];

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      seconds,
    ).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatSessionDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function getLevelClass(level: TaskLevel) {
  const classes: Record<TaskLevel, string> = {
    Базовый: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
    Средний: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
    Продвинутый: 'border-rose-300/30 bg-rose-300/10 text-rose-100',
  };

  return classes[level];
}

export function FocusDeck() {
  const [activeTaskId, setActiveTaskId] = useLocalStorage<string>(
    'focus-deck-active-task',
    TASKS[0].id,
  );
  const [notes, setNotes] = useLocalStorage<Record<string, string>>('focus-deck-notes', {});
  const [sessions, setSessions] = useLocalStorage<FocusSession[]>('focus-deck-sessions', []);
  const [elapsedSeconds, setElapsedSeconds] = useLocalStorage<number>(
    'focus-deck-elapsed-seconds',
    0,
  );
  const [startedAt, setStartedAt] = useLocalStorage<string | null>('focus-deck-started-at', null);
  const [isRunning, setIsRunning] = useState(false);

  const activeTask = TASKS.find((task) => task.id === activeTaskId) ?? TASKS[0];
  const activeNote = notes[activeTask.id] ?? '';

  const taskSessions = useMemo(
    () => sessions.filter((session) => session.taskId === activeTask.id),
    [activeTask.id, sessions],
  );

  const totalFocusSeconds = useMemo(
    () => sessions.reduce((sum, session) => sum + session.durationSeconds, 0),
    [sessions],
  );

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timerId = window.setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [isRunning, setElapsedSeconds]);

  function selectTask(taskId: string) {
    if (taskId === activeTask.id) {
      return;
    }

    setIsRunning(false);
    setElapsedSeconds(0);
    setStartedAt(null);
    setActiveTaskId(taskId);
  }

  function toggleTimer() {
    if (!isRunning && !startedAt) {
      setStartedAt(new Date().toISOString());
    }

    setIsRunning((currentValue) => !currentValue);
  }

  function resetTimer() {
    setIsRunning(false);
    setElapsedSeconds(0);
    setStartedAt(null);
  }

  function finishSession() {
    if (elapsedSeconds < 10) {
      return;
    }

    const now = new Date().toISOString();

    const newSession: FocusSession = {
      id: createId(),
      taskId: activeTask.id,
      startedAt: startedAt ?? new Date(Date.now() - elapsedSeconds * 1000).toISOString(),
      finishedAt: now,
      durationSeconds: elapsedSeconds,
      notePreview: activeNote.trim().slice(0, 130),
    };

    setSessions((currentSessions) => [newSession, ...currentSessions].slice(0, 50));
    resetTimer();
  }

  function updateNote(value: string) {
    setNotes((currentNotes) => ({
      ...currentNotes,
      [activeTask.id]: value,
    }));
  }

  function removeSession(id: string) {
    setSessions((currentSessions) =>
      currentSessions.filter((currentSession) => currentSession.id !== id),
    );
  }

  return (
    <main className="mx-auto max-w-7xl pb-12">
      <section className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.24em] text-blue-300 uppercase">
          Deep work playground
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Focus Deck</h1>

        <p className="leading-7 text-white/60">
          Режим концентрации для практики JavaScript, React и TypeScript: выбери тему, запусти
          таймер, сохрани заметки и зафиксируй попытку.
        </p>
      </section>

      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<FiClock size={19} />}
          label="Общее время"
          value={formatDuration(totalFocusSeconds)}
          helper="Сумма завершённых сессий"
        />

        <StatCard
          icon={<FiCheckCircle size={19} />}
          label="Попытки"
          value={String(sessions.length)}
          helper="Все сохранённые сессии"
        />

        <StatCard
          icon={<FiTarget size={19} />}
          label="Текущая тема"
          value={String(taskSessions.length)}
          helper="Попыток по выбранной теме"
        />
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-white/10 bg-white/3 p-4 shadow-2xl shadow-black/20 xl:sticky xl:top-24">
          <div className="mb-4 px-2">
            <p className="font-semibold">Колода задач</p>
            <p className="mt-1 text-xs leading-5 text-white/45">
              При смене темы незавершённый таймер сбрасывается.
            </p>
          </div>

          <div className="space-y-2">
            {TASKS.map((task) => {
              const isActive = task.id === activeTask.id;

              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => selectTask(task.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? 'border-blue-300/45 bg-blue-300/10 shadow-lg shadow-blue-500/5'
                      : 'border-transparent bg-black/20 hover:border-white/15 hover:bg-white/4'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{task.title}</p>
                      <p className="mt-1 text-xs text-white/45">{task.category}</p>
                    </div>

                    <span
                      className={`rounded-full border px-2 py-1 text-[10px] ${getLevelClass(task.level)}`}
                    >
                      {task.level}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-blue-200 uppercase">
                    {activeTask.category}
                  </p>

                  <h2 className="mt-1 text-2xl font-semibold">{activeTask.title}</h2>
                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs ${getLevelClass(activeTask.level)}`}
                >
                  {activeTask.level}
                </span>
              </div>
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:p-6">
              <div>
                <p className="leading-7 text-white/65">{activeTask.description}</p>

                <div className="mt-6">
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium text-white/90">
                    <FiZap className="text-amber-200" size={16} />
                    Вопросы для разминки
                  </p>

                  <ul className="space-y-2">
                    {activeTask.prompts.map((prompt) => (
                      <li
                        key={prompt}
                        className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm leading-6 text-white/60"
                      >
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-5 text-center">
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase">Focus timer</p>

                <p className="mt-5 font-mono text-5xl font-semibold tracking-tight text-white">
                  {formatDuration(elapsedSeconds)}
                </p>

                <p className="mt-3 min-h-5 text-xs text-white/45">
                  {isRunning
                    ? 'Сессия запущена'
                    : elapsedSeconds > 0
                      ? 'Таймер на паузе'
                      : 'Готов к старту'}
                </p>

                <div className="mt-6 grid gap-2">
                  <button
                    type="button"
                    onClick={toggleTimer}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-400 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-blue-300"
                  >
                    {isRunning ? <FiPause size={17} /> : <FiPlay size={17} />}
                    {isRunning ? 'Пауза' : elapsedSeconds > 0 ? 'Продолжить' : 'Начать'}
                  </button>

                  <button
                    type="button"
                    onClick={finishSession}
                    disabled={elapsedSeconds < 10}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-200/70 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <FiCheckCircle size={17} />
                    Завершить сессию
                  </button>

                  <button
                    type="button"
                    onClick={resetTimer}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm text-white/50 transition hover:bg-white/10 hover:text-white"
                  >
                    <FiRotateCcw size={16} />
                    Сбросить
                  </button>
                </div>

                <p className="mt-4 text-xs leading-5 text-white/35">
                  Сессию можно сохранить после 10 секунд фокуса.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20">
              <div className="mb-4 flex items-center gap-2">
                <FiFileText className="text-blue-200" size={18} />

                <div>
                  <p className="font-semibold">Заметки по теме</p>
                  <p className="mt-1 text-xs text-white/45">
                    Сохраняются отдельно для каждой карточки.
                  </p>
                </div>
              </div>

              <textarea
                value={activeNote}
                onChange={(event) => updateNote(event.target.value)}
                rows={12}
                placeholder="Запиши выводы, примеры кода, вопросы или ошибки, которые встретились…"
                className="w-full resize-y rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-white/30 focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
              />

              <p className="mt-3 text-xs text-white/40">
                {activeNote.length} символов · данные сохраняются в localStorage
              </p>
            </section>

            <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-semibold">История по теме</p>
                <p className="mt-1 text-xs text-white/45">
                  Последние попытки по «{activeTask.title}»
                </p>
              </div>

              <div className="max-h-107.5 space-y-3 overflow-auto p-4">
                {taskSessions.length ? (
                  taskSessions.map((session) => (
                    <article
                      key={session.id}
                      className="rounded-2xl border border-white/10 bg-black/25 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-lg font-semibold text-white">
                            {formatDuration(session.durationSeconds)}
                          </p>

                          <p className="mt-1 text-xs text-white/40">
                            {formatSessionDate(session.finishedAt)}
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label="Удалить сессию"
                          onClick={() => removeSession(session.id)}
                          className="rounded-lg p-2 text-white/35 transition hover:bg-white/10 hover:text-rose-200"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>

                      {session.notePreview && (
                        <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-6 text-white/55">
                          {session.notePreview}
                          {session.notePreview.length >= 130 ? '…' : ''}
                        </p>
                      )}
                    </article>
                  ))
                ) : (
                  <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-white/15 p-6 text-center">
                    <div className="max-w-xs">
                      <FiBookOpen className="mx-auto text-white/30" size={28} />

                      <p className="mt-3 font-medium text-white/80">Здесь появится история</p>

                      <p className="mt-2 text-sm leading-6 text-white/45">
                        Запусти таймер и заверши первую сессию по этой теме.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  helper,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/3 p-4">
      <div className="flex items-center gap-2 text-blue-200">
        {icon}
        <p className="text-sm text-white/55">{label}</p>
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</p>

      <p className="mt-1 text-xs text-white/35">{helper}</p>
    </article>
  );
}
