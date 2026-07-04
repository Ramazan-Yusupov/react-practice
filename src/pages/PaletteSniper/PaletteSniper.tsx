import { useMemo, useState } from 'react';
import {
  FiCheck,
  FiClipboard,
  FiCopy,
  FiDroplet,
  FiEye,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
} from 'react-icons/fi';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
type ExportMode = 'css' | 'tailwind';

type Palette = Record<Shade, string>;

type HistoryColor = {
  id: string;
  hex: string;
  createdAt: string;
};

type EyeDropperApi = {
  open: () => Promise<{ sRGBHex: string }>;
};

type EyeDropperConstructor = new () => EyeDropperApi;

const SHADES: Shade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const DEFAULT_COLOR = '#4F8CFF';

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeHex(value: string) {
  const trimmed = value.trim().toUpperCase();
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;

  if (/^#[0-9A-F]{3}$/.test(withHash)) {
    const [, r, g, b] = withHash;
    return `#${r}${r}${g}${g}${b}${b}`;
  }

  if (/^#[0-9A-F]{6}$/.test(withHash)) {
    return withHash;
  }

  return null;
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex) ?? DEFAULT_COLOR;

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const toHex = (value: number) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function mixColors(first: string, second: string, amount: number) {
  const from = hexToRgb(first);
  const to = hexToRgb(second);
  const weight = clamp(amount, 0, 1);

  return rgbToHex({
    r: from.r + (to.r - from.r) * weight,
    g: from.g + (to.g - from.g) * weight,
    b: from.b + (to.b - from.b) * weight,
  });
}

function createPalette(baseColor: string): Palette {
  return {
    50: mixColors(baseColor, '#FFFFFF', 0.93),
    100: mixColors(baseColor, '#FFFFFF', 0.84),
    200: mixColors(baseColor, '#FFFFFF', 0.68),
    300: mixColors(baseColor, '#FFFFFF', 0.48),
    400: mixColors(baseColor, '#FFFFFF', 0.25),
    500: baseColor,
    600: mixColors(baseColor, '#000000', 0.13),
    700: mixColors(baseColor, '#000000', 0.27),
    800: mixColors(baseColor, '#000000', 0.43),
    900: mixColors(baseColor, '#000000', 0.6),
    950: mixColors(baseColor, '#000000', 0.76),
  };
}

function getLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);

  const convert = (channel: number) => {
    const normalized = channel / 255;

    return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * convert(r) + 0.7152 * convert(g) + 0.0722 * convert(b);
}

function getContrast(first: string, second: string) {
  const firstLuminance = getLuminance(first);
  const secondLuminance = getLuminance(second);

  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function formatContrast(value: number) {
  return `${value.toFixed(2)}:1`;
}

function createExportCode(palette: Palette, mode: ExportMode) {
  if (mode === 'tailwind') {
    return `@theme {
${SHADES.map((shade) => `  --color-brand-${shade}: ${palette[shade]};`).join('\n')}
}

/*
  Использование:
  <button className="bg-brand-500 text-white hover:bg-brand-600">
    Button
  </button>
*/`;
  }

  return `:root {
${SHADES.map((shade) => `  --brand-${shade}: ${palette[shade]};`).join('\n')}
}

/*
  Использование:
  background: var(--brand-500);
  color: var(--brand-50);
*/`;
}

function formatHistoryDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function PaletteSniper() {
  const [storedColor, setStoredColor] = useLocalStorage('palette-sniper-base-color', DEFAULT_COLOR);
  const [history, setHistory] = useLocalStorage<HistoryColor[]>('palette-sniper-history', []);
  const [draftColor, setDraftColor] = useState(storedColor);
  const [exportMode, setExportMode] = useState<ExportMode>('css');
  const [inputError, setInputError] = useState('');
  const [eyedropperMessage, setEyedropperMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState('');
  const [isPicking, setIsPicking] = useState(false);

  const baseColor = normalizeHex(storedColor) ?? DEFAULT_COLOR;

  const palette = useMemo(() => createPalette(baseColor), [baseColor]);
  const exportCode = useMemo(() => createExportCode(palette, exportMode), [palette, exportMode]);

  const whiteContrast = useMemo(() => getContrast(baseColor, '#FFFFFF'), [baseColor]);
  const blackContrast = useMemo(() => getContrast(baseColor, '#0A0A0A'), [baseColor]);

  const recommendedText = whiteContrast >= blackContrast ? '#FFFFFF' : '#0A0A0A';
  const recommendedContrast = Math.max(whiteContrast, blackContrast);

  function applyColor(value: string) {
    const normalized = normalizeHex(value);

    if (!normalized) {
      setInputError('Укажи HEX в формате #4F8CFF или 4F8CFF.');
      return;
    }

    setStoredColor(normalized);
    setDraftColor(normalized);
    setInputError('');
    setEyedropperMessage('');
  }

  function resetColor() {
    applyColor(DEFAULT_COLOR);
  }

  function addToHistory() {
    setHistory((currentHistory) => {
      const nextItem: HistoryColor = {
        id: createId(),
        hex: baseColor,
        createdAt: new Date().toISOString(),
      };

      return [nextItem, ...currentHistory.filter((item) => item.hex !== baseColor)].slice(0, 12);
    });
  }

  function removeHistoryColor(id: string) {
    setHistory((currentHistory) => currentHistory.filter((item) => item.id !== id));
  }

  async function openEyeDropper() {
    const EyeDropper = (window as Window & { EyeDropper?: EyeDropperConstructor }).EyeDropper;

    if (!EyeDropper) {
      setEyedropperMessage(
        'Пипетка недоступна в этом браузере. Используй color input или HEX-поле.',
      );
      return;
    }

    setIsPicking(true);
    setEyedropperMessage('');

    try {
      const result = await new EyeDropper().open();
      applyColor(result.sRGBHex);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setEyedropperMessage('Выбор цвета отменён.');
      } else {
        setEyedropperMessage('Не удалось открыть пипетку.');
      }
    } finally {
      setIsPicking(false);
    }
  }

  async function copyText(text: string, key: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      setCopiedKey(key);

      window.setTimeout(() => {
        setCopiedKey('');
      }, 1500);
    } catch {
      setEyedropperMessage('Не удалось скопировать значение.');
    }
  }

  return (
    <main className="mx-auto max-w-7xl pb-12">
      <section className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.24em] text-blue-300 uppercase">
          Design tools playground
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Palette Sniper</h1>

        <p className="leading-7 text-white/60">
          Выбери базовый цвет, собери рабочую палитру, проверь контраст и сразу скопируй
          CSS-переменные или Tailwind v4 theme tokens.
        </p>
      </section>

      <section className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20 lg:sticky lg:top-24">
          <div>
            <p className="text-lg font-semibold">Базовый цвет</p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Цвет 500 станет основой для светлых и тёмных оттенков.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
            <div
              className="h-32 rounded-2xl border border-white/15 shadow-inner"
              style={{ backgroundColor: baseColor }}
            />

            <div className="mt-4 flex items-center gap-3">
              <input
                type="color"
                value={baseColor}
                onChange={(event) => applyColor(event.target.value)}
                aria-label="Выбрать базовый цвет"
                className="h-11 w-14 cursor-pointer rounded-lg border border-white/15 bg-transparent p-1"
              />

              <form
                className="min-w-0 flex-1"
                onSubmit={(event) => {
                  event.preventDefault();
                  applyColor(draftColor);
                }}
              >
                <input
                  value={draftColor}
                  onChange={(event) => {
                    setDraftColor(event.target.value);
                    setInputError('');
                  }}
                  placeholder="#4F8CFF"
                  className="w-full rounded-xl border border-white/10 bg-black px-3 py-3 font-mono text-sm uppercase text-white outline-none transition focus:border-blue-300/60"
                />
              </form>
            </div>

            {inputError && <p className="mt-3 text-xs text-rose-200">{inputError}</p>}
          </div>

          <div className="grid gap-2">
            <button
              type="button"
              onClick={openEyeDropper}
              disabled={isPicking}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-400 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-blue-300 disabled:cursor-wait disabled:opacity-60"
            >
              <FiEye size={17} />
              {isPicking ? 'Открываем пипетку…' : 'Взять пипеткой'}
            </button>

            <button
              type="button"
              onClick={addToHistory}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/3 px-4 py-3 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/8"
            >
              <FiPlus size={17} />
              Сохранить в историю
            </button>

            <button
              type="button"
              onClick={resetColor}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <FiRefreshCw size={16} />
              Сбросить
            </button>
          </div>

          <p aria-live="polite" className="min-h-5 text-xs leading-5 text-white/45">
            {eyedropperMessage}
          </p>

          <section className="border-t border-white/10 pt-5">
            <div className="flex items-center gap-2">
              <FiDroplet className="text-blue-200" size={17} />
              <p className="font-medium">Контраст</p>
            </div>

            <div className="mt-4 space-y-3">
              <ContrastRow
                label="Белый текст"
                value={formatContrast(whiteContrast)}
                passed={whiteContrast >= 4.5}
              />

              <ContrastRow
                label="Тёмный текст"
                value={formatContrast(blackContrast)}
                passed={blackContrast >= 4.5}
              />

              <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                <p className="text-xs text-white/45">Рекомендация для brand-500</p>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="font-mono text-sm text-white">{recommendedText}</span>

                  <span className="text-xs text-emerald-100">
                    {formatContrast(recommendedContrast)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </aside>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-semibold">Сгенерированная палитра</p>
                <p className="mt-1 text-xs text-white/45">
                  Нажми на оттенок, чтобы скопировать HEX.
                </p>
              </div>

              <span className="rounded-full border border-blue-300/30 bg-blue-300/10 px-3 py-1 text-xs text-blue-100">
                Base: {baseColor}
              </span>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
              {SHADES.map((shade) => {
                const color = palette[shade];
                const textColor = getContrast(color, '#FFFFFF') >= 4.5 ? '#FFFFFF' : '#101010';
                const copyKey = `shade-${shade}`;

                return (
                  <button
                    key={shade}
                    type="button"
                    onClick={() => copyText(color, copyKey)}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left transition hover:-translate-y-0.5 hover:border-white/30"
                  >
                    <div className="h-20" style={{ backgroundColor: color }} />

                    <div className="flex items-center justify-between gap-3 p-3">
                      <div>
                        <p className="text-xs text-white/45">brand-{shade}</p>
                        <p className="mt-1 font-mono text-sm text-white">{color}</p>
                      </div>

                      <span className="rounded-lg border border-white/10 p-2 text-white/45 transition group-hover:text-white">
                        {copiedKey === copyKey ? <FiCheck size={15} /> : <FiCopy size={15} />}
                      </span>
                    </div>

                    <span className="sr-only" style={{ color: textColor }}>
                      {color}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-semibold">UI preview</p>
                <p className="mt-1 text-xs text-white/45">
                  Пример того, как палитра работает в интерфейсе.
                </p>
              </div>

              <div className="p-5">
                <article
                  className="overflow-hidden rounded-3xl border border-white/10"
                  style={{ backgroundColor: palette[950] }}
                >
                  <div className="p-6">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: palette[800],
                        color: '#FFFFFF',
                      }}
                    >
                      New component
                    </span>

                    <h2 className="mt-5 text-2xl font-semibold text-white">
                      Цветовая система готова
                    </h2>

                    <p className="mt-3 max-w-md leading-7 text-white/65">
                      Используй brand-500 для основных действий, 600 для hover, а 50–200 для мягких
                      фоновых акцентов.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-xl px-4 py-3 text-sm font-medium transition"
                        style={{
                          backgroundColor: palette[500],
                          color: recommendedText,
                        }}
                      >
                        Основное действие
                      </button>

                      <button
                        type="button"
                        className="rounded-xl border px-4 py-3 text-sm font-medium text-white"
                        style={{
                          borderColor: palette[500],
                        }}
                      >
                        Второе действие
                      </button>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between gap-3 px-6 py-4"
                    style={{ backgroundColor: palette[900] }}
                  >
                    <span className="text-xs text-white/50">brand-900 surface</span>
                    <span className="font-mono text-xs text-white/70">{baseColor}</span>
                  </div>
                </article>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl shadow-black/20">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div>
                  <p className="font-semibold">Экспорт токенов</p>
                  <p className="mt-1 text-xs text-white/45">Выбери формат для проекта.</p>
                </div>

                <div className="inline-flex rounded-xl border border-white/10 bg-white/4 p-1">
                  <button
                    type="button"
                    onClick={() => setExportMode('css')}
                    className={`rounded-lg px-3 py-1.5 text-xs transition ${
                      exportMode === 'css'
                        ? 'bg-white/15 text-white'
                        : 'text-white/45 hover:text-white'
                    }`}
                  >
                    CSS
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportMode('tailwind')}
                    className={`rounded-lg px-3 py-1.5 text-xs transition ${
                      exportMode === 'tailwind'
                        ? 'bg-white/15 text-white'
                        : 'text-white/45 hover:text-white'
                    }`}
                  >
                    Tailwind
                  </button>
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => copyText(exportCode, 'export')}
                  className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-xs text-white/80 transition hover:border-white/30"
                >
                  {copiedKey === 'export' ? <FiCheck size={14} /> : <FiClipboard size={14} />}
                  {copiedKey === 'export' ? 'Скопировано' : 'Копировать'}
                </button>

                <pre className="max-h-102.5 overflow-auto p-5 pt-16 text-xs leading-6 text-blue-100">
                  {exportCode}
                </pre>
              </div>
            </section>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">История цветов</p>
                <p className="mt-1 text-xs text-white/45">До 12 сохранённых базовых оттенков.</p>
              </div>

              <span className="text-xs text-white/40">{history.length}/12</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {history.length ? (
                history.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
                  >
                    <button
                      type="button"
                      onClick={() => applyColor(item.hex)}
                      aria-label={`Выбрать ${item.hex}`}
                      className="h-11 w-11 shrink-0 rounded-xl border border-white/15"
                      style={{ backgroundColor: item.hex }}
                    />

                    <button
                      type="button"
                      onClick={() => applyColor(item.hex)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="font-mono text-sm text-white">{item.hex}</p>
                      <p className="mt-1 text-xs text-white/40">
                        {formatHistoryDate(item.createdAt)}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => removeHistoryColor(item.id)}
                      aria-label={`Удалить ${item.hex} из истории`}
                      className="rounded-lg p-2 text-white/35 transition hover:bg-white/10 hover:text-rose-200"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </article>
                ))
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-white/15 p-8 text-center">
                  <p className="text-sm text-white/60">История пока пустая.</p>
                  <p className="mt-2 text-xs text-white/40">
                    Выбери цвет и нажми «Сохранить в историю».
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function ContrastRow({ label, value, passed }: { label: string; value: string; passed: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
      <span className="text-sm text-white/65">{label}</span>

      <span
        className={`rounded-full border px-2 py-1 text-xs ${
          passed
            ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100'
            : 'border-rose-300/30 bg-rose-300/10 text-rose-100'
        }`}
      >
        {value} · {passed ? 'AA' : 'Ниже AA'}
      </span>
    </div>
  );
}
