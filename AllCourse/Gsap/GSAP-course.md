# GSAP Course for React + TypeScript + Tailwind + Box

Дата актуализации: 2026-06-08

Этот курс построен под стек:
- `React`
- `TypeScript`
- `Tailwind CSS`
- `GSAP`
- UI только через [`Box`](../src/shared/ui/Box/Box.tsx)

Курс опирается на современный API GSAP 3.x. На дату обновления официальный сайт рекомендует использовать `GSAP 3.13+`, а `npm` показывает `3.13.0` как latest.

## Принципы курса

1. Все примеры делаем через `Box`, без лишних UI-компонентов.
2. Для React используем `@gsap/react` и `useGSAP()`.
3. Сначала изучаем функции и механику, потом идем в практику.
4. Почти в каждом модуле есть:
   - краткая теория
   - список функций
   - примеры кода
   - практика
   - задание

## Установка

```bash
npm i gsap @gsap/react
```

Базовый шаблон для большинства примеров:

```tsx
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Box } from "@/shared/ui/Box/Box";

gsap.registerPlugin(useGSAP);

export function Demo() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.to(".box", { x: 120, duration: 1 });
  }, { scope: root });

  return (
    <Box ref={root} className="relative h-screen w-full overflow-hidden">
      <Box className="box" size={120} background="#22c55e" rounded="24px" />
    </Box>
  );
}
```

---

## Модуль 1. Базовые методы GSAP

### Цель

Понять разницу между `set`, `to`, `from`, `fromTo` и начать уверенно запускать простые анимации.

### Функции модуля

- `gsap.set()`
- `gsap.to()`
- `gsap.from()`
- `gsap.fromTo()`

### Примеры

`gsap.set()`:

```tsx
gsap.set(".box", { opacity: 0.3, scale: 0.8, x: 0 });
```

`gsap.to()`:

```tsx
gsap.to(".box", { x: 200, rotation: 180, duration: 1.2 });
```

`gsap.from()`:

```tsx
gsap.from(".box", { y: 120, opacity: 0, scale: 0.5, duration: 1 });
```

`gsap.fromTo()`:

```tsx
gsap.fromTo(
  ".box",
  { x: -150, opacity: 0, scale: 0.4 },
  { x: 150, opacity: 1, scale: 1, duration: 1.4 }
);
```

### Практика

- Сделать 4 `Box`, по одному на каждый метод.
- Использовать только `x`, `y`, `opacity`, `scale`, `rotation`.

### Задание

В `DemoGsap.tsx` собрать 4 блока:
- первый едет вправо через `to`
- второй появляется снизу через `from`
- третий масштабируется через `fromTo`
- четвертый подготавливается через `set`, потом становится видимым через `to`

---

## Модуль 2. Время и характер движения

### Цель

Научиться управлять длительностью, задержкой, повторами и ease.

### Функции и свойства модуля

- `duration`
- `delay`
- `repeat`
- `repeatDelay`
- `yoyo`
- `ease`

### Примеры

`duration` и `delay`:

```tsx
gsap.to(".box", {
  x: 180,
  duration: 1.2,
  delay: 0.4,
});
```

`repeat` и `repeatDelay`:

```tsx
gsap.to(".box", {
  y: -30,
  duration: 0.6,
  repeat: -1,
  repeatDelay: 0.2,
});
```

`yoyo`:

```tsx
gsap.to(".box", {
  x: 200,
  duration: 1,
  repeat: -1,
  yoyo: true,
});
```

`ease`:

```tsx
gsap.from(".box", {
  y: 80,
  opacity: 0,
  duration: 0.9,
  ease: "back.out(1.7)",
});
```

### Практика

- Сравнить `duration: 0.4` и `duration: 2`.
- Сделать один и тот же вход с `none`, `power3.out`, `back.out(1.7)`.

### Задание

Сделать 6 `Box`:
- с короткой длительностью
- с длинной длительностью
- с задержкой
- с бесконечным `repeat`
- с `repeat + repeatDelay + yoyo`
- с красивым `ease` на появление

---

## Модуль 3. Работа с несколькими элементами

### Цель

Научиться анимировать список и сетку, а не один элемент.

### Функции и свойства модуля

- `stagger`
- `stagger.each`
- `stagger.amount`
- `stagger.from`
- `stagger.grid`

### Примеры

Простой `stagger`:

```tsx
gsap.from(".item", {
  y: 40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.1,
});
```

`stagger` как объект:

```tsx
gsap.from(".item", {
  scale: 0.6,
  opacity: 0,
  duration: 0.6,
  stagger: {
    each: 0.08,
    from: "center",
  },
});
```

### Практика

- Собрать список из 5 `Box`.
- Собрать сетку `3 x 3`.
- Проверить разницу между `stagger: 0.1` и `stagger: { amount: 1 }`.

### Задание

Сделать секцию с 9 карточками:
- сначала вертикальный reveal
- потом вариант с масштабом
- потом запуск из центра сетки

---

## Модуль 4. Callback-функции

### Цель

Понять жизненный цикл анимации и научиться реагировать на старт, обновление и завершение.

### Функции модуля

- `onStart`
- `onUpdate`
- `onComplete`
- `onRepeat`
- `onReverseComplete`

### Примеры

```tsx
gsap.to(".box", {
  x: 220,
  duration: 1.2,
  repeat: 1,
  yoyo: true,
  onStart: () => console.log("start"),
  onUpdate: () => console.log("update"),
  onRepeat: () => console.log("repeat"),
  onComplete: () => console.log("complete"),
});
```

### Практика

- Логировать фазы анимации в консоль.
- На `onComplete` менять цвет второго `Box` через `gsap.set()`.

### Задание

Сделать 3 блока:
- первый логирует `onStart`
- второй логирует `onUpdate`
- третий после `onComplete` запускает анимацию следующего блока

---

## Модуль 5. Control methods

### Цель

Научиться хранить ссылку на tween и управлять анимацией кнопками.

### Функции модуля

- `play()`
- `pause()`
- `resume()`
- `reverse()`
- `restart()`
- `seek()`
- `progress()`
- `timeScale()`
- `kill()`

### Пример

```tsx
const tween = gsap.to(".box", {
  x: 240,
  duration: 2,
  paused: true,
});

tween.play();
tween.pause();
tween.reverse();
tween.restart();
tween.timeScale(2);
```

### Практика

- Сделать один `Box` и панель управления анимацией.
- Отдельно проверить `timeScale(0.5)` и `timeScale(2)`.

### Задание

Собрать мини-плеер анимации:
- `Play`
- `Pause`
- `Reverse`
- `Restart`
- `Fast`
- `Slow`

---

## Модуль 6. Timeline

### Цель

Понять, как собирать несколько анимаций в одну управляемую сцену.

### Функции модуля

- `gsap.timeline()`
- `defaults`
- `.to()`
- `.from()`
- `.fromTo()`

### Пример

```tsx
const tl = gsap.timeline({
  defaults: { duration: 0.7, ease: "power3.out" },
});

tl.from(".title", { y: 40, opacity: 0 })
  .from(".card", { y: 30, opacity: 0, stagger: 0.1 })
  .from(".cta", { scale: 0.8, opacity: 0 });
```

### Практика

- Сделать hero-intro из заголовка, 3 карточек и кнопки.
- Все собрать только через одну timeline.

### Задание

Сделать сцену:
- сначала заголовок
- потом подзаголовок
- потом 3 карточки с `stagger`
- потом CTA-кнопка

---

## Модуль 7. Position parameter и labels

### Цель

Научиться точно синхронизировать части timeline.

### Функции модуля

- `"+=0.2"`
- `"-=0.3"`
- абсолютное время
- `addLabel()`
- позиционирование по label

### Пример

```tsx
const tl = gsap.timeline();

tl.addLabel("intro")
  .from(".title", { y: 40, opacity: 0 })
  .from(".subtitle", { y: 30, opacity: 0 }, "-=0.3")
  .from(".line", { scaleX: 0, transformOrigin: "left center" }, "intro+=0.2")
  .from(".cta", { y: 20, opacity: 0 }, "+=0.1");
```

### Практика

- Один экран собрать только через position parameter.
- Повторить ту же сцену, но уже с label.

### Задание

Собрать секцию, где:
- underline начинается раньше окончания заголовка
- кнопка стартует почти вместе с подзаголовком
- 3 карточки стартуют после label `"content"`

---

## Модуль 8. Полезные анимируемые свойства

### Цель

Научиться анимировать правильные свойства и не ломать производительность.

### Свойства модуля

- `x`, `y`
- `xPercent`, `yPercent`
- `scale`, `scaleX`, `scaleY`
- `rotation`
- `skewX`, `skewY`
- `opacity`
- `transformOrigin`
- `backgroundColor`
- `borderRadius`

### Пример

```tsx
gsap.to(".box", {
  x: 140,
  scale: 1.1,
  rotation: 12,
  borderRadius: "32px",
  backgroundColor: "#06b6d4",
  duration: 1,
});
```

### Практика

- Сделать 5 коротких примеров по одному свойству.
- Сравнить `x` и `left`, использовать в работе только `x`.

### Задание

Сделать карточку, которая:
- въезжает через `x`
- появляется через `opacity`
- слегка поворачивается
- меняет `borderRadius`

---

## Модуль 9. GSAP Utils

### Цель

Понять, как утилиты помогают в интерактивных анимациях.

### Функции модуля

- `gsap.utils.clamp()`
- `gsap.utils.mapRange()`
- `gsap.utils.interpolate()`
- `gsap.utils.random()`
- `gsap.utils.selector()`

### Примеры

`clamp`:

```tsx
const clampX = gsap.utils.clamp(-120, 120);
const nextX = clampX(200);
```

`mapRange`:

```tsx
const mapMouse = gsap.utils.mapRange(0, window.innerWidth, -30, 30);
```

`random`:

```tsx
const randomX = gsap.utils.random(-100, 100);
```

`selector`:

```tsx
const q = gsap.utils.selector(root);
gsap.to(q(".item"), { y: -20, stagger: 0.1 });
```

### Практика

- Сделать параллакс по курсору.
- Сделать случайное плавание декоративных `Box`.

### Задание

Собрать интерактивную сцену:
- курсор двигает 3 карточки с разной силой
- значения ограничиваются через `clamp`
- смещение считается через `mapRange`

---

## Модуль 10. React + GSAP паттерны

### Цель

Освоить безопасную интеграцию GSAP в React.

### Что изучаем

- `useGSAP()`
- `scope`
- `ref`
- cleanup через context
- когда использовать selector
- когда использовать отдельный ref

### Пример

```tsx
export function Cards() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.from(".card", {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
    });
  }, { scope: root });

  return (
    <Box ref={root} className="grid grid-cols-3 gap-4">
      <Box className="card" size={120} background="#22c55e" />
      <Box className="card" size={120} background="#38bdf8" />
      <Box className="card" size={120} background="#f59e0b" />
    </Box>
  );
}
```

### Практика

- Переписать старые примеры только через `useGSAP`.
- Убедиться, что селекторы ограничены `scope`.

### Задание

Сделать один компонент, где есть:
- intro-анимация списка
- кнопка, которая перезапускает timeline
- cleanup без утечек

---

## Модуль 11. ScrollTrigger

### Цель

Научиться делать анимации при прокрутке.

### Функции модуля

- `ScrollTrigger`
- `trigger`
- `start`
- `end`
- `scrub`
- `pin`
- `markers`
- `toggleActions`

### Пример

```tsx
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

gsap.from(".card", {
  y: 60,
  opacity: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".section",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});
```

### Практика

- Reveal секции по scroll.
- Pin блока на время прокрутки.
- Сцена с `scrub: true`.

### Задание

Сделать страницу с 3 секциями:
- первая просто reveal
- вторая pinned
- третья управляется через `scrub`

---

## Модуль 12. Адаптивность и accessibility

### Цель

Научиться адаптировать motion под устройства и уважать настройки пользователя.

### Функции модуля

- `gsap.matchMedia()`
- проверка `prefers-reduced-motion`

### Пример

```tsx
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  gsap.from(".card", { x: -80, opacity: 0, stagger: 0.1 });
});

mm.add("(max-width: 767px)", () => {
  gsap.from(".card", { y: 40, opacity: 0, stagger: 0.08 });
});
```

### Практика

- На desktop карточки въезжают слева.
- На mobile карточки появляются снизу.

### Задание

Сделать одну и ту же секцию в двух сценариях:
- desktop animation
- mobile animation

И добавить мягкий fallback для reduced motion.

---

## Модуль 13. Производительность и чистая архитектура

### Цель

Избежать типичных проблем при росте проекта.

### Что изучаем

- почему лучше `x/y`, а не `left/top`
- когда вреден бесконечный `repeat`
- как не плодить новые timeline на каждый рендер
- когда использовать `kill()`
- когда использовать `revert()`

### Правила

- анимируй `transform` и `opacity` в первую очередь
- используй `scope`
- не держи лишние бесконечные анимации
- не дублируй логику по компонентам, если можно вынести паттерн

### Практика

- Взять старую “плохую” анимацию и переписать на `x/y`.
- Убрать лишний re-render-зависимый код.

### Задание

Провести рефактор одного своего демо:
- упростить логику
- убрать лишние состояния
- оставить только GSAP и `Box`

---

## Модуль 14. Финальная практика

### Мини-проекты

1. Hero intro
2. Features grid reveal
3. Dashboard cards entrance
4. Scroll storytelling section
5. Onboarding animation

### Большие проекты

1. Landing first screen
   - timeline
   - labels
   - stagger
   - CTA reveal

2. Scroll-driven section
   - ScrollTrigger
   - pin
   - scrub
   - performance

3. UI Motion System
   - reusable паттерны анимаций для `Box`
   - hover
   - intro
   - reveal
   - loop

### Финальное задание

Собрать мини-страницу на `Box`, где будут:
- hero-блок
- 6 карточек с stagger
- scroll reveal секция
- pinned секция
- CTA с hover-анимацией

---

## Рекомендуемый порядок прохождения

1. Модуль 1: базовые методы
2. Модуль 2: время и ease
3. Модуль 3: stagger
4. Модуль 4: callbacks
5. Модуль 5: control methods
6. Модуль 6: timeline
7. Модуль 7: position parameter и labels
8. Модуль 8: свойства для анимации
9. Модуль 9: utils
10. Модуль 10: React-паттерны
11. Модуль 11: ScrollTrigger
12. Модуль 12: адаптивность
13. Модуль 13: performance
14. Модуль 14: финальная практика

---

## Как работать по курсу

Для каждого модуля:
1. Прочитай теорию.
2. Повтори примеры в `DemoGsap.tsx`.
3. Сделай практику.
4. Сделай задание.
5. Только потом переходи к следующему модулю.

Если хочешь превратить курс в учебный трек внутри проекта, можно дальше разбить его на файлы:
- `Gsap/01-basics.md`
- `Gsap/02-timing-and-ease.md`
- `Gsap/03-stagger.md`
- `Gsap/04-callbacks.md`
- `Gsap/05-controls.md`
- `Gsap/06-timeline.md`
- `Gsap/07-position-and-labels.md`
- `Gsap/08-properties.md`
- `Gsap/09-utils.md`
- `Gsap/10-react-patterns.md`
- `Gsap/11-scroll-trigger.md`
- `Gsap/12-responsive-and-a11y.md`
- `Gsap/13-performance.md`
- `Gsap/14-final-practice.md`

---

## Источники

- GSAP Installation: https://gsap.com/docs/v3/Installation/
- GSAP Core Docs: https://gsap.com/docs/v3/GSAP/
- GSAP Cheat Sheet: https://gsap.com/cheatsheet/
- ScrollTrigger Docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP on npm: https://www.npmjs.com/package/gsap
