import { useMemo, useState, type CSSProperties } from 'react';
import { Button } from '@/shared/ui';

type Direction = 'up' | 'down' | 'left' | 'right';

type Settings = {
  direction: Direction;
  distance: number;
  opacity: number;
  scale: number;
  start: number;
  end: number;
};

type CssVars = CSSProperties & Record<`--${string}`, string>;

const DEFAULT_SETTINGS: Settings = {
  direction: 'up',
  distance: 56,
  opacity: 0,
  scale: 94,
  start: 10,
  end: 85,
};

const DIRECTION_OPTIONS: Array<{ value: Direction; label: string }> = [
  { value: 'up', label: 'Снизу вверх' },
  { value: 'down', label: 'Сверху вниз' },
  { value: 'left', label: 'Справа налево' },
  { value: 'right', label: 'Слева направо' },
];

function getOffset(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':
      return { x: 0, y: distance };
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
  }
}

function createCss(settings: Settings) {
  const { x, y } = getOffset(settings.direction, settings.distance);
  const opacity = (settings.opacity / 100).toFixed(2);
  const scale = (settings.scale / 100).toFixed(2);

  return `.scroll-reveal {
  animation-name: scroll-reveal;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-timeline: view();
  animation-range: entry ${settings.start}% cover ${settings.end}%;
}

@keyframes scroll-reveal {
  from {
    opacity: ${opacity};
    transform: translate(${x}px, ${y}px) scale(${scale});
  }

  to {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    animation: none;
  }
}`;
}

interface RangeFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}

function RangeField({ label, value, min, max, suffix, onChange }: RangeFieldProps) {
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

export function ScrollChoreography() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isCopied, setIsCopied] = useState(false);

  const offset = useMemo(
    () => getOffset(settings.direction, settings.distance),
    [settings.direction, settings.distance],
  );

  const generatedCss = useMemo(() => createCss(settings), [settings]);

  const previewStyle: CssVars = {
    '--choreo-x': `${offset.x}px`,
    '--choreo-y': `${offset.y}px`,
    '--choreo-opacity': `${settings.opacity / 100}`,
    '--choreo-scale': `${settings.scale / 100}`,
    '--choreo-start': `${settings.start}%`,
    '--choreo-end': `${settings.end}%`,
  };

  function updateSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function changeStart(value: number) {
    setSettings((current) => ({
      ...current,
      start: Math.min(value, current.end - 1),
    }));
  }

  function changeEnd(value: number) {
    setSettings((current) => ({
      ...current,
      end: Math.max(value, current.start + 1),
    }));
  }

  async function copyCss() {
    try {
      await navigator.clipboard.writeText(generatedCss);
      setIsCopied(true);

      window.setTimeout(() => {
        setIsCopied(false);
      }, 1600);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl pb-12">
      <section className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.24em] text-blue-300 uppercase">
          Scroll Choreography
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Собери scroll-анимацию и забери готовый CSS
        </h1>

        <p className="leading-7 text-white/60">
          Прокрути область preview: карточки анимируются относительно собственного появления во
          viewport. Настройки сразу меняют результат и код.
        </p>
      </section>

      <section className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20 lg:sticky lg:top-24">
          <div className="mb-6 space-y-2">
            <p className="text-lg font-semibold">Параметры</p>

            <p className="text-sm leading-6 text-white/50">
              Начало и конец задают участок видимости элемента, в котором идёт анимация.
            </p>
          </div>

          <div className="space-y-6">
            <label className="block space-y-2">
              <span className="text-sm text-white/80">Направление</span>

              <select
                value={settings.direction}
                onChange={(event) => updateSetting('direction', event.target.value as Direction)}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-sm outline-none transition focus:border-blue-400"
              >
                {DIRECTION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <RangeField
              label="Смещение"
              value={settings.distance}
              min={0}
              max={160}
              suffix="px"
              onChange={(value) => updateSetting('distance', value)}
            />

            <RangeField
              label="Стартовая прозрачность"
              value={settings.opacity}
              min={0}
              max={100}
              suffix="%"
              onChange={(value) => updateSetting('opacity', value)}
            />

            <RangeField
              label="Стартовый масштаб"
              value={settings.scale}
              min={70}
              max={100}
              suffix="%"
              onChange={(value) => updateSetting('scale', value)}
            />

            <RangeField
              label="Старт анимации"
              value={settings.start}
              min={0}
              max={99}
              suffix="%"
              onChange={changeStart}
            />

            <RangeField
              label="Конец анимации"
              value={settings.end}
              min={1}
              max={100}
              suffix="%"
              onChange={changeEnd}
            />

            <Button
              variant="ghost"
              className="w-full border border-white/10"
              onClick={() => setSettings(DEFAULT_SETTINGS)}
            >
              Сбросить настройки
            </Button>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-semibold">Live preview</p>
                <p className="mt-1 text-xs text-white/45">Прокрути блок ниже</p>
              </div>

              <span className="rounded-full border border-blue-300/30 bg-blue-300/10 px-3 py-1 text-xs text-blue-200">
                view() timeline
              </span>
            </div>

            <div
              className="h-145 overflow-y-auto scroll-smooth p-5 [scrollbar-color:rgba(255,255,255,.25)_transparent]"
              style={previewStyle}
            >
              <div className="flex min-h-235 flex-col justify-between py-12">
                <p className="mx-auto max-w-xs text-center text-sm leading-6 text-white/40">
                  Карточка начинает анимацию при входе в viewport этого контейнера.
                </p>

                {['Прозрачность', 'Смещение', 'Масштаб'].map((title, index) => (
                  <article
                    className="scroll-choreography-item mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-linear-to-br from-white/12 to-white/3 p-7 shadow-xl shadow-black/20"
                    key={title}
                  >
                    <span className="text-xs tracking-[0.22em] text-blue-200 uppercase">
                      Scene 0{index + 1}
                    </span>

                    <h2 className="mt-4 text-2xl font-semibold">{title}</h2>

                    <p className="mt-3 leading-7 text-white/60">
                      Один keyframe объединяет opacity и transform — поэтому движение остаётся
                      плавным и управляется только прокруткой.
                    </p>
                  </article>
                ))}

                <p className="mx-auto max-w-xs text-center text-sm leading-6 text-white/40">
                  Измени параметры слева, чтобы построить другой вариант.
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-semibold">Готовый CSS</p>

                <p className="mt-1 text-xs text-white/45">
                  Добавь класс <code>.scroll-reveal</code> на нужный элемент.
                </p>
              </div>

              <Button variant={isCopied ? 'primary' : 'outline'} size="sm" onClick={copyCss}>
                {isCopied ? 'Скопировано' : 'Копировать CSS'}
              </Button>
            </div>

            <pre className="max-h-110 overflow-auto p-5 text-xs leading-6 text-blue-100">
              {generatedCss}
            </pre>
          </section>

          <p className="rounded-2xl border border-amber-200/20 bg-amber-200/5 px-4 py-3 text-sm leading-6 text-amber-100/80">
            Для пользователей с включённым <code>prefers-reduced-motion</code> анимация отключается.
            В браузерах без поддержки scroll-driven animations элемент останется видимым.
          </p>
        </div>
      </section>
    </main>
  );
}
