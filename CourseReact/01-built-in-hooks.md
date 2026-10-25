# React · 01 · Встроенные хуки (все)

Правила хуков: вызываем только на верхнем уровне компонента/хука, не в условиях и циклах (исключение — `use`, см. ниже). Линтер: `eslint-plugin-react-hooks`.

## Состояние
- **`useState(initial | () => initial)`** — ленивая инициализация функцией для дорогих вычислений. Обновление через updater `setX(prev => ...)`.
- **`useReducer(reducer, init)`** — когда переходы состояния сложны или связаны. Редьюсер чистый; удобно тестировать отдельно.
- **`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`** — подписка на внешнее хранилище (то, на чём построены Zustand, Redux). `getSnapshot` обязан возвращать **закэшированное** значение, иначе бесконечный рендер.

## Контекст и ссылки
- **`useContext(Ctx)`** — читает ближайший провайдер. В React 19 провайдер пишется как `<Ctx value={...}>` без `.Provider`.
- **`useRef(initial)`** — изменяемое значение вне рендера и ссылка на DOM. Не читайте и не пишите `ref.current` во время рендера (правило компилятора).
- **`useImperativeHandle(ref, () => api)`** — ограниченный императивный API наружу (`focus()`, `scrollTo()`); ref теперь обычный prop.
- **`useId()`** — стабильный id для `aria-*`/`htmlFor`, одинаковый на сервере и клиенте. Не для ключей списка.

## Эффекты
- **`useEffect`** — после коммита, асинхронно относительно отрисовки.
- **`useLayoutEffect`** — после коммита, **до** отрисовки; для измерений DOM (размер тултипа). Блокирует отрисовку, использовать редко.
- **`useInsertionEffect`** — для библиотек CSS-in-JS, вставляющих `<style>` до layout. В прикладном коде не нужен.
- **`useEffectEvent(fn)`** (19.2) — «нереактивная» часть эффекта: читает свежие props/state, но не попадает в зависимости. Вызывать только внутри эффектов и не передавать дальше.

## Производительность и приоритеты
- **`useMemo` / `useCallback`** — мемоизация значения/функции. С React Compiler большей частью не нужны (файл 04).
- **`useTransition`** → `[isPending, startTransition]` — пометить обновление как несрочное; UI не блокируется.
- **`useDeferredValue(value, initialValue?)`** — «отстающая» копия значения для дорогих списков при вводе. Второй параметр появился в React 19.

## React 19: действия и данные
- **`use(promiseOrContext)`** — читает промис (с Suspense) или контекст; единственный «хук», который можно вызывать в условиях.
- **`useActionState(action, initial)`** → `[state, formAction, isPending]`.
- **`useOptimistic(state, reducer?)`** → `[optimistic, add]`.
- **`useFormStatus()`** (из `react-dom`) → `{ pending, data, method, action }` для вложенных компонентов формы.
- **`useDebugValue`** — подпись для кастомного хука в DevTools.
Подробности по 19-м хукам — в файле 02.

## Кастомный хук на `useSyncExternalStore`
```ts
import { useSyncExternalStore } from 'react';

function subscribe(cb: () => void) {
  window.addEventListener('storage', cb);
  return () => window.removeEventListener('storage', cb);
}
export function useLocalStorageValue(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key), // строка — примитив, кэшировать нечего
    () => null, // серверный снимок
  );
}
```

## Проверь себя
1. Чем `useLayoutEffect` отличается от `useEffect` по моменту вызова?
2. Почему `getSnapshot` должен возвращать одно и то же значение при неизменном хранилище?
3. Какая проблема эффекта решается `useEffectEvent`?
4. Чем `useDeferredValue` отличается от debounce?

## Задания в проекте
1. Откройте `src/shared/hooks/useLocalStorage.ts` и `useToggle.ts`: перепишите `useLocalStorage` на `useSyncExternalStore` (синхронизация между вкладками).
2. На странице курса сделайте демо `useTransition` + `useDeferredValue`: список из 5 000 элементов, фильтр по вводу. Сравните ощущения с обычным `useState`.
3. Сделайте компонент-тултип с `useLayoutEffect` для позиционирования; уберите мигание.
4. `useId`: форма с двумя полями и связанными `label`/`aria-describedby`.
5. `useImperativeHandle`: обернуть `Input` из `shared/ui` так, чтобы родитель мог вызвать `focus()` и `clear()`.
