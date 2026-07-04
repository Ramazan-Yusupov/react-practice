import { useMemo, useState } from 'react';
import {
  FiAlignJustify,
  FiCheck,
  FiCode,
  FiColumns,
  FiCopy,
  FiMonitor,
  FiRotateCcw,
  FiSliders,
} from 'react-icons/fi';

type Density = 'compact' | 'comfortable' | 'spacious';
type ScrollbarMode = 'auto' | 'thin' | 'hidden';
type TabSize = 2 | 4 | 8;

type LabSettings = {
  width: number;
  density: Density;
  scrollbar: ScrollbarMode;
  tabSize: TabSize;
};

type SegmentedOption<T extends string | number> = {
  value: T;
  label: string;
  helper?: string;
};

const DEFAULT_SETTINGS: LabSettings = {
  width: 640,
  density: 'comfortable',
  scrollbar: 'thin',
  tabSize: 4,
};

const DENSITY_OPTIONS: SegmentedOption<Density>[] = [
  { value: 'compact', label: 'Компактно', helper: 'Меньше воздуха' },
  { value: 'comfortable', label: 'Обычно', helper: 'Баланс' },
  { value: 'spacious', label: 'Свободно', helper: 'Больше ритма' },
];

const SCROLLBAR_OPTIONS: SegmentedOption<ScrollbarMode>[] = [
  { value: 'auto', label: 'Системный' },
  { value: 'thin', label: 'Thin' },
  { value: 'hidden', label: 'Скрыть' },
];

const TAB_OPTIONS: SegmentedOption<TabSize>[] = [
  { value: 2, label: '2' },
  { value: 4, label: '4' },
  { value: 8, label: '8' },
];

const DENSITY_CLASSES: Record<Density, string> = {
  compact: 'gap-3 p-3',
  comfortable: 'gap-5 p-5',
  spacious: 'gap-7 p-7',
};

const SCROLLBAR_CLASSES: Record<ScrollbarMode, string> = {
  auto: 'scrollbar-auto scrollbar-thumb-white/30 scrollbar-track-transparent',
  thin: 'scrollbar-thin scrollbar-thumb-blue-300/70 scrollbar-track-white/5',
  hidden: 'scrollbar-none',
};

const TAB_CLASSES: Record<TabSize, string> = {
  2: 'tab-2',
  4: 'tab-4',
  8: 'tab-8',
};

const TAB_EXAMPLE = `const task = {
	title: 'Ship component lab',
	status: 'in progress',
	owner: 'you',
};`;

function createSnippet(settings: LabSettings) {
  const densityClass = DENSITY_CLASSES[settings.density];
  const scrollbarClass = SCROLLBAR_CLASSES[settings.scrollbar];
  const tabClass = TAB_CLASSES[settings.tabSize];

  return `import { FiCode } from 'react-icons/fi';

<section className="@container-size w-full max-w-4xl">
  <article className="grid grid-cols-1 ${densityClass} rounded-3xl border border-white/10 bg-white/5 @md:grid-cols-[auto_minmax(0,1fr)] @lg:grid-cols-[auto_minmax(0,1fr)_auto]">
    <div className="grid size-12 place-items-center rounded-2xl bg-blue-300/10 text-blue-100">
      <FiCode size={20} />
    </div>

    <div className="min-w-0">
      <p className="font-semibold text-white">Refactor task filters</p>
      <p className="mt-1 text-sm leading-6 text-white/55">
        Component rearranges itself by its parent width.
      </p>
    </div>

    <button className="rounded-xl bg-blue-300 px-3 py-2 text-sm font-medium text-slate-950">
      Open task
    </button>
  </article>

  <pre className="${tabClass} ${scrollbarClass} mt-4 max-h-32 overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-white/65">
    {code}
  </pre>
</section>`;
}

function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`rounded-xl border px-3 py-2.5 text-left text-xs transition ${
              isActive
                ? 'border-blue-300/60 bg-blue-300/10 text-white'
                : 'border-white/10 bg-black/15 text-white/55 hover:border-white/25 hover:text-white/80'
            }`}
          >
            <span className="block font-medium">{option.label}</span>

            {option.helper && (
              <span className="mt-1 block text-[11px] text-white/40">{option.helper}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center justify-between gap-4 text-sm text-white/80">
        {label}

        <output className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs text-white">
          {value}
          {suffix}
        </output>
      </span>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-blue-400"
      />
    </label>
  );
}

export function TailwindComponentLab() {
  const [settings, setSettings] = useState<LabSettings>(DEFAULT_SETTINGS);
  const [isCopied, setIsCopied] = useState(false);

  const generatedCode = useMemo(() => createSnippet(settings), [settings]);
  const densityClass = DENSITY_CLASSES[settings.density];
  const scrollbarClass = SCROLLBAR_CLASSES[settings.scrollbar];
  const tabClass = TAB_CLASSES[settings.tabSize];

  function updateSetting<K extends keyof LabSettings>(key: K, value: LabSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS);
    setIsCopied(false);
  }

  async function copyCode() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(generatedCode);
      } else {
        const textarea = document.createElement('textarea');

        textarea.value = generatedCode;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';

        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1600);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl pb-12">
      <section className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.24em] text-blue-300 uppercase">
          Tailwind 4.3 playground
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tailwind Component Lab</h1>

        <p className="leading-7 text-white/60">
          Настрой пространство компонента, плотность и поведение кода. Карточка справа адаптируется
          не к viewport, а к ширине собственного контейнера.
        </p>
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-6 xl:sticky xl:top-24">
          <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-300/10 text-blue-100">
                <FiSliders size={20} />
              </span>

              <div>
                <p className="font-semibold">Настройки компонента</p>

                <p className="mt-1 text-xs leading-5 text-white/45">
                  Меняй параметры и наблюдай, как один UI-элемент ведёт себя в разном контексте.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <RangeField
                label="Ширина контейнера"
                value={settings.width}
                min={320}
                max={980}
                suffix="px"
                onChange={(value) => updateSetting('width', value)}
              />

              <fieldset className="space-y-2">
                <legend className="text-sm text-white/80">Плотность интерфейса</legend>

                <SegmentedControl
                  options={DENSITY_OPTIONS}
                  value={settings.density}
                  onChange={(value) => updateSetting('density', value)}
                />
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="text-sm text-white/80">Scrollbar</legend>

                <SegmentedControl
                  options={SCROLLBAR_OPTIONS}
                  value={settings.scrollbar}
                  onChange={(value) => updateSetting('scrollbar', value)}
                />
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="text-sm text-white/80">Размер табуляции</legend>

                <SegmentedControl
                  options={TAB_OPTIONS}
                  value={settings.tabSize}
                  onChange={(value) => updateSetting('tabSize', value)}
                />
              </fieldset>

              <button
                type="button"
                onClick={resetSettings}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/50 transition hover:bg-white/8 hover:text-white"
              >
                <FiRotateCcw size={15} />
                Сбросить настройки
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2">
              <FiMonitor className="text-blue-200" size={18} />
              <p className="font-semibold">Что проверить</p>
            </div>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/55">
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-300" />
                Сузь контейнер: action-кнопка перейдёт на новую строку только внутри preview.
              </li>

              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-300" />
                Переключи scrollbar и прокрути журнал активности.
              </li>

              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-300" />
                Измени tab-size: отступы в TypeScript-примере меняются без редактора кода.
              </li>
            </ul>
          </section>
        </aside>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-black/25 text-blue-100">
                  <FiColumns size={18} />
                </span>

                <div>
                  <p className="font-semibold">Live preview</p>
                  <p className="mt-0.5 text-xs text-white/40">
                    @container-size · {settings.width}px
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/55">
                {settings.density} · tab-{settings.tabSize}
              </span>
            </div>

            <div className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.14),transparent_48%)] p-4 sm:p-7">
              <div className="min-h-130 overflow-auto rounded-2xl border border-white/10 bg-[#090909]/80 p-4 scrollbar-gutter-stable sm:p-7">
                <div
                  className="@container-size mx-auto transition-[width] duration-300"
                  style={{ width: `min(${settings.width}px, 100%)` }}
                >
                  <article
                    className={`grid grid-cols-1 rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 ${densityClass} @md:grid-cols-[auto_minmax(0,1fr)] @lg:grid-cols-[auto_minmax(0,1fr)_auto]`}
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue-300/10 text-blue-100">
                      <FiCode size={21} />
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-white">Refactor task filters</p>

                        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 text-[11px] text-emerald-100">
                          In progress
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-white/55">
                        Эта карточка использует container queries, поэтому перестраивается от ширины
                        блока-родителя, а не от всего окна браузера.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 self-center rounded-xl bg-blue-300 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-blue-200"
                    >
                      <FiAlignJustify size={15} />
                      <span className="@sm:hidden">Открыть</span>
                      <span className="hidden @sm:inline">Открыть задачу</span>
                    </button>
                  </article>

                  <section className="mt-5 rounded-3xl border border-white/10 bg-black/25">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-white/85">Activity log</p>
                        <p className="mt-0.5 text-xs text-white/40">
                          Прокрути область, чтобы увидеть scrollbar.
                        </p>
                      </div>

                      <span className="rounded-md bg-white/6 px-2 py-1 font-mono text-[11px] text-white/55">
                        {settings.scrollbar}
                      </span>
                    </div>

                    <div
                      className={`max-h-38 overflow-auto overscroll-contain p-4 ${scrollbarClass}`}
                    >
                      {[
                        '12:40 · Нормализован query-параметр.',
                        '12:34 · Добавлен empty state для списка.',
                        '12:28 · Вынесен TaskFilter в отдельный компонент.',
                        '12:15 · Исправлена сортировка при пустом поиске.',
                        '12:07 · Добавлен aria-label для action-кнопки.',
                        '11:51 · Сокращены повторяющиеся Tailwind-классы.',
                        '11:44 · Обновлён тест фильтра по статусу.',
                      ].map((item) => (
                        <p
                          key={item}
                          className="border-b border-white/8 py-2 text-xs leading-5 text-white/55 last:border-0"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </section>

                  <pre
                    className={`mt-5 overflow-auto rounded-3xl border border-white/10 bg-black/35 p-4 font-mono text-xs leading-6 text-blue-100/75 ${tabClass} ${scrollbarClass}`}
                  >
                    <code>{TAB_EXAMPLE}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-black/25 text-blue-100">
                  <FiCode size={18} />
                </span>

                <div>
                  <p className="font-semibold">Готовый JSX + Tailwind</p>
                  <p className="mt-0.5 text-xs text-white/40">
                    Фрагмент уже учитывает текущие настройки.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-xs text-white/75 transition hover:border-white/35 hover:text-white"
              >
                {isCopied ? <FiCheck size={15} /> : <FiCopy size={15} />}
                {isCopied ? 'Скопировано' : 'Копировать код'}
              </button>
            </div>

            <pre className="max-h-105 overflow-auto scrollbar-thin scrollbar-thumb-white/25 scrollbar-track-transparent">
              <code className="block min-w-max p-5 font-mono text-xs leading-6 text-white/70">
                {generatedCode}
              </code>
            </pre>
          </section>
        </div>
      </section>
    </main>
  );
}
