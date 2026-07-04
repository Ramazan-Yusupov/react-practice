import type { CSSProperties, ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { Navigate, useNavigate, useParams, type NavigateFunction } from 'react-router-dom';
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiLayers,
  FiLayout,
  FiTarget,
} from 'react-icons/fi';
import { PAGES } from '@/shared/config';

type CaseMetric = {
  label: string;
  value: string;
};

type CaseStudy = {
  id: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  gradient: string;
  tags: string[];
  metrics: CaseMetric[];
  steps: string[];
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

const CASES: CaseStudy[] = [
  {
    id: 'learning-hub',
    category: 'Education UI',
    title: 'Learning Hub',
    summary: 'Панель обучения с прогрессом, задачами и персональным темпом.',
    description:
      'Концепт личного кабинета, в котором пользователь быстро понимает текущий прогресс, видит следующий шаг и возвращается к незавершённым практикам.',
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #4f46e5 45%, #a855f7 100%)',
    tags: ['React', 'Tailwind', 'Dashboard'],
    metrics: [
      { label: 'Карточек', value: '12' },
      { label: 'Экранов', value: '06' },
      { label: 'Компонентов', value: '24' },
    ],
    steps: [
      'Собрать главную информацию в один понятный экран.',
      'Добавить приоритеты и быстрые действия.',
      'Сделать прогресс заметным без перегрузки интерфейса.',
    ],
  },
  {
    id: 'finance-pulse',
    category: 'Analytics UI',
    title: 'Finance Pulse',
    summary: 'Компактный аналитический дашборд для ежедневного контроля метрик.',
    description:
      'Интерфейс для быстрой оценки ключевых показателей: баланс, динамика, цели и последние операции. Акцент сделан на читаемой иерархии данных.',
    gradient: 'linear-gradient(135deg, #047857 0%, #059669 42%, #22c55e 100%)',
    tags: ['Charts', 'Data UI', 'Responsive'],
    metrics: [
      { label: 'Метрик', value: '08' },
      { label: 'Виджетов', value: '10' },
      { label: 'Тем', value: '02' },
    ],
    steps: [
      'Выделить одну главную метрику на экран.',
      'Сгруппировать второстепенные данные по контексту.',
      'Сделать состояние роста и падения мгновенно заметным.',
    ],
  },
  {
    id: 'event-flow',
    category: 'Productivity UI',
    title: 'Event Flow',
    summary: 'Календарь и канбан для планирования задач, встреч и фокус-сессий.',
    description:
      'Продуктовый экран для планирования рабочего дня. В нём объединены ближайшие события, задачи и короткие блоки глубокой работы.',
    gradient: 'linear-gradient(135deg, #b45309 0%, #ea580c 48%, #ef4444 100%)',
    tags: ['Calendar', 'Kanban', 'Motion'],
    metrics: [
      { label: 'Сценариев', value: '05' },
      { label: 'Статусов', value: '04' },
      { label: 'Переходов', value: '09' },
    ],
    steps: [
      'Показать ближайшее действие без необходимости искать его.',
      'Сохранить контекст задачи при переходе между представлениями.',
      'Добавить понятный ритм работы через визуальные статусы.',
    ],
  },
];

function getCasePath(caseId: string) {
  return `${PAGES.ROUTE_MORPHING}/${caseId}`;
}

function getMorphStyle(caseId: string): CSSProperties {
  return {
    viewTransitionName: `route-morph-${caseId}`,
  } as CSSProperties;
}

function navigateWithMorph(navigate: NavigateFunction, target: string) {
  const prefersReducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const transitionDocument = document as ViewTransitionDocument;

  if (prefersReducedMotion || !transitionDocument.startViewTransition) {
    navigate(target);
    return;
  }

  transitionDocument.startViewTransition(() => {
    flushSync(() => {
      navigate(target);
    });
  });
}

export function RouteMorphing() {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId: string }>();

  const activeCase = CASES.find((caseStudy) => caseStudy.id === caseId);

  if (caseId && !activeCase) {
    return <Navigate to={PAGES.ROUTE_MORPHING} replace />;
  }

  if (activeCase) {
    return (
      <CaseDetails
        caseStudy={activeCase}
        onBack={() => navigateWithMorph(navigate, PAGES.ROUTE_MORPHING)}
      />
    );
  }

  return (
    <CaseCatalog
      onOpen={(selectedCaseId) => {
        navigateWithMorph(navigate, getCasePath(selectedCaseId));
      }}
    />
  );
}

function CaseCatalog({ onOpen }: { onOpen: (caseId: string) => void }) {
  return (
    <main className="mx-auto max-w-7xl pb-12">
      <section className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.24em] text-blue-300 uppercase">
          Native View Transitions
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Route Morphing</h1>

        <p className="leading-7 text-white/60">
          Каталог интерфейсных кейсов. Открой карточку: в поддерживаемых браузерах она плавно
          превратится в detail-view, а в остальных навигация останется обычной.
        </p>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <MiniStat icon={<FiLayers size={18} />} label="Кейсы" value="03" />
        <MiniStat icon={<FiLayout size={18} />} label="Паттерн" value="List → Detail" />
        <MiniStat icon={<FiCode size={18} />} label="Fallback" value="React Router" />
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {CASES.map((caseStudy) => (
          <button
            key={caseStudy.id}
            type="button"
            onClick={() => onOpen(caseStudy.id)}
            style={getMorphStyle(caseStudy.id)}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/3 text-left shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/25"
          >
            <div
              className="relative min-h-52 overflow-hidden p-5"
              style={{ background: caseStudy.gradient }}
            >
              <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] bg-size-[28px_28px]" />

              <div className="relative flex h-full min-h-42 flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/30 bg-black/15 px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-white uppercase">
                    Case file
                  </span>

                  <FiArrowUpRight
                    size={20}
                    className="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                <div className="rounded-2xl border border-white/25 bg-black/15 p-4 backdrop-blur-sm">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-white/65">{caseStudy.category}</p>
                      <p className="mt-1 text-xl font-semibold text-white">{caseStudy.title}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <span className="h-6 w-4 rounded bg-white/90" />
                      <span className="h-10 w-4 rounded bg-white/60" />
                      <span className="h-7 w-4 rounded bg-white/35" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm leading-6 text-white/60">{caseStudy.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {caseStudy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-xs text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-200">
                Открыть кейс
                <FiArrowUpRight size={16} />
              </span>
            </div>
          </button>
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
        <div className="flex flex-wrap items-start gap-4">
          <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-200" size={20} />

          <div>
            <p className="font-medium">Как работает переход</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
              Одинаковое значение <code>view-transition-name</code> назначается карточке в списке и
              её hero-блоку на detail-странице. Браузер создаёт снимки до и после навигации и
              анимирует их между двумя состояниями.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseDetails({ caseStudy, onBack }: { caseStudy: CaseStudy; onBack: () => void }) {
  return (
    <main className="mx-auto max-w-6xl pb-12">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <FiArrowLeft size={17} />
        Все кейсы
      </button>

      <section
        style={getMorphStyle(caseStudy.id)}
        className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/25"
      >
        <div
          className="relative min-h-80 overflow-hidden p-6 sm:p-8"
          style={{ background: caseStudy.gradient }}
        >
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] bg-size-[32px_32px]" />

          <div className="relative flex min-h-64 flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full border border-white/30 bg-black/15 px-3 py-1 text-xs font-medium tracking-[0.16em] text-white uppercase">
                {caseStudy.category}
              </span>

              <span className="rounded-full border border-white/25 bg-black/15 px-3 py-1 text-xs text-white/80">
                Detail view
              </span>
            </div>

            <div className="max-w-2xl">
              <p className="text-sm text-white/70">Product interface concept</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {caseStudy.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/80">{caseStudy.summary}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-7 p-6 lg:grid-cols-[minmax(0,1fr)_280px] sm:p-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-200 uppercase">
              О проекте
            </p>

            <p className="mt-4 text-base leading-8 text-white/70">{caseStudy.description}</p>

            <div className="mt-8">
              <p className="flex items-center gap-2 font-semibold text-white">
                <FiTarget className="text-blue-200" size={18} />
                Логика интерфейса
              </p>

              <ol className="mt-4 space-y-3">
                {caseStudy.steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-300/10 text-xs font-semibold text-blue-100">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-6 text-white/60">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-white">
                <FiClock className="text-blue-200" size={17} />
                Сводка
              </p>

              <dl className="mt-5 space-y-4">
                {caseStudy.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-end justify-between gap-3 border-b border-white/10 pb-3"
                  >
                    <dt className="text-sm text-white/45">{metric.label}</dt>
                    <dd className="font-mono text-lg font-semibold text-white">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <p className="text-sm font-medium text-white">Технологии</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {caseStudy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-blue-300/25 bg-blue-300/10 px-3 py-1.5 text-xs text-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function MiniStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/3 p-4">
      <div className="flex items-center gap-2 text-blue-200">{icon}</div>
      <p className="mt-3 text-xs text-white/45">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </article>
  );
}
