import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import {
  FiAlertTriangle,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCode,
  FiFilter,
  FiPlus,
  FiRotateCcw,
  FiSearch,
  FiTrash2,
  FiX,
} from 'react-icons/fi';
import { FaBug } from 'react-icons/fa';
import { z } from 'zod';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

type BugTopic = 'React state' | 'TypeScript' | 'Async' | 'Forms' | 'CSS';
type BugSeverity = 'low' | 'medium' | 'high';
type BugStatus = 'open' | 'in-progress' | 'fixed';

type BugRecord = {
  id: string;
  title: string;
  topic: BugTopic;
  severity: BugSeverity;
  status: BugStatus;
  expectation: string;
  actual: string;
  cause: string;
  beforeCode: string;
  afterCode: string;
  createdAt: string;
  fixedAt?: string;
};

type StatusFilter = 'all' | BugStatus;
type SeverityFilter = 'all' | BugSeverity;
type TopicFilter = 'all' | BugTopic;

const BUG_TOPICS = ['React state', 'TypeScript', 'Async', 'Forms', 'CSS'] as const;
const BUG_SEVERITIES = ['low', 'medium', 'high'] as const;

const bugSchema = z.object({
  title: z.string().trim().min(5, 'Минимум 5 символов.').max(90, 'Максимум 90 символов.'),
  topic: z.enum(BUG_TOPICS),
  severity: z.enum(BUG_SEVERITIES),
  expectation: z.string().trim().min(10, 'Опиши ожидание минимум в 10 символов.').max(400),
  actual: z.string().trim().min(10, 'Опиши фактический результат минимум в 10 символов.').max(400),
  cause: z.string().trim().min(10, 'Опиши причину минимум в 10 символов.').max(500),
  beforeCode: z.string().trim().min(1, 'Добавь код до исправления.').max(3000),
  afterCode: z.string().trim().min(1, 'Добавь код после исправления.').max(3000),
});

type BugFormValues = z.infer<typeof bugSchema>;

const EMPTY_FORM: BugFormValues = {
  title: '',
  topic: 'React state',
  severity: 'medium',
  expectation: '',
  actual: '',
  cause: '',
  beforeCode: '',
  afterCode: '',
};

const DEFAULT_BUGS: BugRecord[] = [
  {
    id: 'bug-stale-counter',
    title: 'Счётчик пропускает клики при быстром нажатии',
    topic: 'React state',
    severity: 'high',
    status: 'fixed',
    expectation: 'Каждый клик должен увеличивать значение счётчика на единицу.',
    actual: 'Несколько быстрых кликов используют одно старое значение и часть обновлений теряется.',
    cause: 'Состояние обновлялось через значение из замыкания вместо функционального сеттера.',
    beforeCode: `function incrementTwice() {
  setCount(count + 1);
  setCount(count + 1);
}`,
    afterCode: `function incrementTwice() {
  setCount((current) => current + 1);
  setCount((current) => current + 1);
}`,
    createdAt: '2026-06-18T10:20:00.000Z',
    fixedAt: '2026-06-18T10:40:00.000Z',
  },
  {
    id: 'bug-promise-all',
    title: 'Один неудачный запрос ломает весь список карточек',
    topic: 'Async',
    severity: 'medium',
    status: 'in-progress',
    expectation:
      'Нерабочая карточка должна показать ошибку, а успешные запросы должны остаться на экране.',
    actual: 'Promise.all прекращает весь сценарий после первого rejected Promise.',
    cause: 'Для независимых запросов выбран Promise.all без обработки результата каждой операции.',
    beforeCode: `const cards = await Promise.all(
  ids.map((id) => fetchCard(id)),
);`,
    afterCode: `const results = await Promise.allSettled(
  ids.map((id) => fetchCard(id)),
);

const cards = results.map(toCardState);`,
    createdAt: '2026-06-23T14:05:00.000Z',
  },
  {
    id: 'bug-form-number',
    title: 'Поле количества проходит валидацию с пустой строкой',
    topic: 'Forms',
    severity: 'low',
    status: 'open',
    expectation: 'Пустое количество должно показывать ошибку до отправки формы.',
    actual: 'Пустая строка превращается в 0 и проходит проверку z.number().min(0).',
    cause: 'valueAsNumber возвращает NaN, а преобразование значения не описано явно в схеме.',
    beforeCode: `quantity: z.number().min(0),`,
    afterCode: `quantity: z.coerce
  .number({ error: 'Укажи количество.' })
  .int()
  .min(1, 'Минимум 1 штука.'),`,
    createdAt: '2026-06-27T09:10:00.000Z',
  },
];

const STATUS_META: Record<
  BugStatus,
  {
    label: string;
    className: string;
    icon: typeof FaBug;
  }
> = {
  open: {
    label: 'Открыт',
    className: 'border-rose-300/30 bg-rose-300/10 text-rose-100',
    icon: FaBug,
  },
  'in-progress': {
    label: 'В работе',
    className: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
    icon: FiClock,
  },
  fixed: {
    label: 'Исправлен',
    className: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
    icon: FiCheckCircle,
  },
};

const SEVERITY_META: Record<BugSeverity, { label: string; className: string }> = {
  low: {
    label: 'Низкая',
    className: 'border-sky-300/30 bg-sky-300/10 text-sky-100',
  },
  medium: {
    label: 'Средняя',
    className: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  },
  high: {
    label: 'Высокая',
    className: 'border-rose-300/30 bg-rose-300/10 text-rose-100',
  },
};

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <span className="block text-xs text-rose-200">{message}</span>;
}

function CodePanel({
  title,
  code,
  variant,
}: {
  title: string;
  code: string;
  variant: 'before' | 'after';
}) {
  const palette =
    variant === 'before'
      ? 'border-rose-300/20 bg-rose-300/5 text-rose-100/80'
      : 'border-emerald-300/20 bg-emerald-300/5 text-emerald-100/80';

  return (
    <section className={`overflow-hidden rounded-2xl border ${palette}`}>
      <div className="flex items-center gap-2 border-b border-current/15 px-4 py-3">
        <FiCode size={15} />
        <p className="text-xs font-semibold">{title}</p>
      </div>

      <pre className="max-h-72 overflow-auto scrollbar-thin scrollbar-thumb-white/25 scrollbar-track-transparent">
        <code className="block min-w-max bg-transparent p-4 font-mono text-xs leading-6 whitespace-pre">
          {code}
        </code>
      </pre>
    </section>
  );
}

function StatCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: number | string;
  helper: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/3 p-4 shadow-xl shadow-black/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-white/45">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</p>
          <p className="mt-1 text-xs text-white/40">{helper}</p>
        </div>

        <span className="grid size-9 place-items-center rounded-xl bg-blue-300/10 text-blue-100">
          {icon}
        </span>
      </div>
    </article>
  );
}

function InsightCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'blue' | 'rose' | 'emerald';
}) {
  const toneClass = {
    blue: 'border-blue-300/15 bg-blue-300/5',
    rose: 'border-rose-300/15 bg-rose-300/5',
    emerald: 'border-emerald-300/15 bg-emerald-300/5',
  };

  return (
    <article className={`rounded-2xl border p-4 ${toneClass[tone]}`}>
      <p className="text-xs font-semibold tracking-[0.16em] text-white/55 uppercase">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/75">{value}</p>
    </article>
  );
}

export function BugReplayLab() {
  const [bugs, setBugs] = useLocalStorage<BugRecord[]>('bug-replay-lab-bugs', DEFAULT_BUGS);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(bugs[0]?.id ?? null);

  const [query, setQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BugFormValues>({
    resolver: zodResolver(bugSchema),
    defaultValues: EMPTY_FORM,
  });

  const visibleBugs = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ru-RU');

    return bugs.filter((bug) => {
      const matchesQuery =
        !normalizedQuery ||
        [bug.title, bug.topic, bug.expectation, bug.actual, bug.cause]
          .join(' ')
          .toLocaleLowerCase('ru-RU')
          .includes(normalizedQuery);

      return (
        matchesQuery &&
        (topicFilter === 'all' || bug.topic === topicFilter) &&
        (severityFilter === 'all' || bug.severity === severityFilter) &&
        (statusFilter === 'all' || bug.status === statusFilter)
      );
    });
  }, [bugs, query, severityFilter, statusFilter, topicFilter]);

  const selectedBug = bugs.find((bug) => bug.id === selectedId) ?? null;

  const stats = useMemo(() => {
    const fixed = bugs.filter((bug) => bug.status === 'fixed').length;

    return {
      total: bugs.length,
      open: bugs.filter((bug) => bug.status === 'open').length,
      inProgress: bugs.filter((bug) => bug.status === 'in-progress').length,
      fixed,
      completion: bugs.length === 0 ? 0 : Math.round((fixed / bugs.length) * 100),
    };
  }, [bugs]);

  function closeComposer() {
    setIsComposerOpen(false);
    reset(EMPTY_FORM);
  }

  function onSubmit(values: BugFormValues) {
    const createdBug: BugRecord = {
      ...values,
      id: createId(),
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    setBugs((currentBugs) => [createdBug, ...currentBugs]);
    setSelectedId(createdBug.id);
    closeComposer();
  }

  function updateStatus(id: string, status: BugStatus) {
    setBugs((currentBugs) =>
      currentBugs.map((bug) =>
        bug.id === id
          ? {
              ...bug,
              status,
              fixedAt: status === 'fixed' ? new Date().toISOString() : undefined,
            }
          : bug,
      ),
    );
  }

  function deleteBug(id: string) {
    setBugs((currentBugs) => currentBugs.filter((bug) => bug.id !== id));

    if (selectedId === id) {
      setSelectedId(null);
    }
  }

  return (
    <main className="mx-auto max-w-7xl pb-12">
      <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.24em] text-blue-300 uppercase">
            Debugging knowledge base
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Bug Replay Lab</h1>

          <p className="leading-7 text-white/60">
            Личный журнал багов: ожидание и факт, причина, код до и после исправления.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            reset(EMPTY_FORM);
            setIsComposerOpen(true);
          }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-200"
        >
          <FiPlus size={18} />
          Записать баг
        </button>
      </section>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Всего записей"
          value={stats.total}
          helper="Личная база знаний"
          icon={<FaBug size={18} />}
        />
        <StatCard
          label="Открыто"
          value={stats.open}
          helper="Ждут разбора"
          icon={<FiAlertTriangle size={18} />}
        />
        <StatCard
          label="В работе"
          value={stats.inProgress}
          helper="Текущие исправления"
          icon={<FiClock size={18} />}
        />
        <StatCard
          label="Закрыто"
          value={`${stats.completion}%`}
          helper={`${stats.fixed} из ${stats.total} исправлено`}
          icon={<FiCheckCircle size={18} />}
        />
      </section>

      <AnimatePresence initial={false}>
        {isComposerOpen && (
          <motion.section
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mb-6 overflow-hidden"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-blue-300/20 bg-blue-300/5 p-5 shadow-2xl shadow-black/20 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">Новая запись</p>
                  <p className="mt-1 text-sm leading-6 text-white/50">
                    Чем точнее опишешь причину, тем полезнее запись будет через месяц.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeComposer}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/55 transition hover:bg-white/8 hover:text-white"
                >
                  <FiX size={16} />
                  Закрыть
                </button>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <label className="block space-y-2 lg:col-span-2">
                  <span className="text-sm text-white/80">Название бага</span>
                  <input
                    {...register('title')}
                    placeholder="Например: Список не обновляется после удаления карточки"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
                  />
                  <FieldError message={errors.title?.message} />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-white/80">Тема</span>
                  <select
                    {...register('topic')}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
                  >
                    {BUG_TOPICS.map((topic) => (
                      <option key={topic} value={topic} className="bg-neutral-900">
                        {topic}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.topic?.message} />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-white/80">Серьёзность</span>
                  <select
                    {...register('severity')}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
                  >
                    {BUG_SEVERITIES.map((severity) => (
                      <option key={severity} value={severity} className="bg-neutral-900">
                        {SEVERITY_META[severity].label}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.severity?.message} />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-white/80">Ожидание</span>
                  <textarea
                    {...register('expectation')}
                    rows={4}
                    placeholder="Что должно было произойти?"
                    className="w-full resize-y rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
                  />
                  <FieldError message={errors.expectation?.message} />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-white/80">Фактический результат</span>
                  <textarea
                    {...register('actual')}
                    rows={4}
                    placeholder="Что произошло на самом деле?"
                    className="w-full resize-y rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
                  />
                  <FieldError message={errors.actual?.message} />
                </label>

                <label className="block space-y-2 lg:col-span-2">
                  <span className="text-sm text-white/80">Причина и вывод</span>
                  <textarea
                    {...register('cause')}
                    rows={3}
                    placeholder="Например: в обработчике использовалось устаревшее значение state из замыкания."
                    className="w-full resize-y rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
                  />
                  <FieldError message={errors.cause?.message} />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-rose-100/85">Код до исправления</span>
                  <textarea
                    {...register('beforeCode')}
                    rows={10}
                    spellCheck={false}
                    placeholder="const result = ..."
                    className="w-full resize-y rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 font-mono text-xs leading-6 text-rose-100/90 outline-none transition placeholder:text-rose-100/30 focus:border-rose-300/50 focus:ring-4 focus:ring-rose-300/10"
                  />
                  <FieldError message={errors.beforeCode?.message} />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-emerald-100/85">Код после исправления</span>
                  <textarea
                    {...register('afterCode')}
                    rows={10}
                    spellCheck={false}
                    placeholder="const result = ..."
                    className="w-full resize-y rounded-2xl border border-emerald-300/20 bg-emerald-300/5 p-4 font-mono text-xs leading-6 text-emerald-100/90 outline-none transition placeholder:text-emerald-100/30 focus:border-emerald-300/50 focus:ring-4 focus:ring-emerald-300/10"
                  />
                  <FieldError message={errors.afterCode?.message} />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={closeComposer}
                  className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiPlus size={17} />
                  {isSubmitting ? 'Сохраняем...' : 'Добавить в журнал'}
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20">
            <div className="mb-4 flex items-center gap-2">
              <FiFilter className="text-blue-200" size={18} />
              <p className="font-semibold">Фильтры журнала</p>
            </div>

            <div className="space-y-4">
              <label className="relative block">
                <FiSearch
                  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/35"
                  size={17}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Поиск по описанию или причине"
                  className="w-full rounded-xl border border-white/10 bg-black/25 py-2.5 pr-3 pl-10 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <FilterSelect
                  label="Тема"
                  value={topicFilter}
                  onChange={(value) => setTopicFilter(value as TopicFilter)}
                  options={[
                    { value: 'all', label: 'Все темы' },
                    ...BUG_TOPICS.map((topic) => ({ value: topic, label: topic })),
                  ]}
                />

                <FilterSelect
                  label="Серьёзность"
                  value={severityFilter}
                  onChange={(value) => setSeverityFilter(value as SeverityFilter)}
                  options={[
                    { value: 'all', label: 'Любая' },
                    ...BUG_SEVERITIES.map((severity) => ({
                      value: severity,
                      label: SEVERITY_META[severity].label,
                    })),
                  ]}
                />

                <FilterSelect
                  label="Статус"
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value as StatusFilter)}
                  options={[
                    { value: 'all', label: 'Все статусы' },
                    ...Object.entries(STATUS_META).map(([value, meta]) => ({
                      value,
                      label: meta.label,
                    })),
                  ]}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setTopicFilter('all');
                  setSeverityFilter('all');
                  setStatusFilter('all');
                }}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/50 transition hover:bg-white/8 hover:text-white"
              >
                <FiRotateCcw size={15} />
                Сбросить фильтры
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">Список багов</p>
                <p className="mt-1 text-xs text-white/45">Найдено: {visibleBugs.length}</p>
              </div>

              {bugs.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setBugs([]);
                    setSelectedId(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-300/15 px-3 py-2 text-xs text-rose-100/70 transition hover:border-rose-300/35 hover:text-rose-100"
                >
                  <FiTrash2 size={14} />
                  Очистить
                </button>
              )}
            </div>

            <div className="space-y-3">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleBugs.map((bug) => {
                  const status = STATUS_META[bug.status];
                  const severity = SEVERITY_META[bug.severity];
                  const StatusIcon = status.icon;
                  const isSelected = bug.id === selectedId;

                  return (
                    <motion.article
                      key={bug.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className={`rounded-2xl border p-4 transition ${
                        isSelected
                          ? 'border-blue-300/45 bg-blue-300/8'
                          : 'border-white/10 bg-black/15 hover:border-white/25'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(bug.id)}
                        className="block w-full text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">{bug.title}</p>
                            <p className="mt-1 text-xs text-white/45">
                              {bug.topic} · {formatDate(bug.createdAt)}
                            </p>
                          </div>

                          {isSelected ? (
                            <FiChevronUp className="mt-0.5 shrink-0 text-blue-200" size={18} />
                          ) : (
                            <FiChevronDown className="mt-0.5 shrink-0 text-white/40" size={18} />
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] ${status.className}`}
                          >
                            <StatusIcon size={12} />
                            {status.label}
                          </span>

                          <span
                            className={`rounded-full border px-2 py-1 text-[11px] ${severity.className}`}
                          >
                            {severity.label}
                          </span>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 border-t border-white/8 pt-4 text-xs leading-6 text-white/55">
                              {bug.actual}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  );
                })}
              </AnimatePresence>

              {visibleBugs.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/15 bg-black/15 p-6 text-center">
                  <FaBug className="mx-auto text-white/35" size={24} />
                  <p className="mt-3 text-sm text-white/65">По этим фильтрам записей нет.</p>
                  <p className="mt-1 text-xs leading-5 text-white/40">
                    Сбрось фильтры или добавь новый баг в журнал.
                  </p>
                </div>
              )}

              {bugs.length === 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setBugs(DEFAULT_BUGS);
                    setSelectedId(DEFAULT_BUGS[0].id);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  <FiRotateCcw size={16} />
                  Вернуть учебные примеры
                </button>
              )}
            </div>
          </section>
        </div>

        <section className="min-h-144 rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20 sm:p-6">
          {selectedBug ? (
            <BugDetails bug={selectedBug} onStatusChange={updateStatus} onDelete={deleteBug} />
          ) : (
            <div className="grid min-h-132 place-items-center text-center">
              <div className="max-w-sm">
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-300/10 text-blue-100">
                  <FaBug size={22} />
                </span>

                <p className="mt-4 font-semibold">Выбери баг из списка</p>
                <p className="mt-2 text-sm leading-6 text-white/45">
                  Здесь появятся ожидание, факт, причина и сравнение кода до и после исправления.
                </p>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs text-white/50">{label}</span>

      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-white/10 bg-black/25 px-3 py-2.5 pr-9 text-sm text-white outline-none transition focus:border-blue-300/60 focus:ring-4 focus:ring-blue-300/10"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-neutral-900">
              {option.label}
            </option>
          ))}
        </select>

        <FiChevronDown
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/45"
          size={16}
        />
      </span>
    </label>
  );
}

function BugDetails({
  bug,
  onStatusChange,
  onDelete,
}: {
  bug: BugRecord;
  onStatusChange: (id: string, status: BugStatus) => void;
  onDelete: (id: string) => void;
}) {
  const status = STATUS_META[bug.status];
  const severity = SEVERITY_META[bug.severity];
  const StatusIcon = status.icon;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${status.className}`}
            >
              <StatusIcon size={13} />
              {status.label}
            </span>

            <span className={`rounded-full border px-2.5 py-1 text-xs ${severity.className}`}>
              {severity.label}
            </span>

            <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/55">
              {bug.topic}
            </span>
          </div>

          <h2 className="mt-4 text-xl font-semibold leading-8 text-white sm:text-2xl">
            {bug.title}
          </h2>
          <p className="mt-2 text-xs text-white/45">Добавлено {formatDate(bug.createdAt)}</p>
        </div>

        <button
          type="button"
          onClick={() => onDelete(bug.id)}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-300/15 bg-rose-300/5 px-3 py-2 text-xs text-rose-100/75 transition hover:border-rose-300/35 hover:text-rose-100"
        >
          <FiTrash2 size={15} />
          Удалить
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {(['open', 'in-progress', 'fixed'] as BugStatus[]).map((nextStatus) => {
          const meta = STATUS_META[nextStatus];
          const Icon = meta.icon;
          const isActive = bug.status === nextStatus;

          return (
            <button
              key={nextStatus}
              type="button"
              onClick={() => onStatusChange(bug.id, nextStatus)}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition ${
                isActive
                  ? meta.className
                  : 'border-white/10 bg-black/15 text-white/50 hover:border-white/25 hover:text-white/80'
              }`}
            >
              {isActive ? <FiCheck size={15} /> : <Icon size={15} />}
              {meta.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4">
        <InsightCard label="Ожидание" value={bug.expectation} tone="blue" />
        <InsightCard label="Фактический результат" value={bug.actual} tone="rose" />
        <InsightCard label="Причина и вывод" value={bug.cause} tone="emerald" />
      </div>

      <div className="mt-6 grid gap-4 2xl:grid-cols-2">
        <CodePanel title="До исправления" code={bug.beforeCode} variant="before" />
        <CodePanel title="После исправления" code={bug.afterCode} variant="after" />
      </div>

      {bug.fixedAt && (
        <p className="mt-5 text-xs text-emerald-100/60">Исправлено {formatDate(bug.fixedAt)}</p>
      )}
    </div>
  );
}
