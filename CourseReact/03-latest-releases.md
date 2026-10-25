# React · 03 · Новое в релизах 19.1 → 19.2 → 19.3

> Проверка по журналу релизов: **19.2** вышел 1 октября 2025, **19.3** — 9 сентября 2026. Перед использованием сверяйтесь с react.dev: ниже то, что в журнале заявлено явно, и то, что я знаю как стабильную функциональность 19.2.

## React 19.1 (март 2025)
Улучшения Suspense (в т.ч. при SSR), **owner stacks** в dev-сообщениях об ошибках, поправки `useId`. Для прикладного кода — мелкие, но полезные для отладки.

## React 19.2 (октябрь 2025)
- **`<Activity mode="visible" | "hidden">`** — скрывает часть UI, **сохраняя состояние** и размонтируя эффекты; скрытое содержимое рендерится с низким приоритетом. Идеально для вкладок и предзагрузки соседнего экрана.
  ```tsx
  <Activity mode={tab === 'a' ? 'visible' : 'hidden'}><TabA /></Activity>
  <Activity mode={tab === 'b' ? 'visible' : 'hidden'}><TabB /></Activity>
  ```
- **`useEffectEvent`** — нереактивная логика внутри эффекта (см. файл 01). Не включать в зависимости, не передавать вниз.
- **`cacheSignal`** (для Server Components) — сигнал отмены, когда результат `cache()` больше не нужен.
- **Performance Tracks** — дорожки React в панели Performance Chrome DevTools (планировщик и компоненты).
- **Partial Pre-rendering** — предрендер статической оболочки с дорендером динамики.
- **`eslint-plugin-react-hooks` v6**: flat-конфиг и правила на основе компилятора.

## React 19.3 (сентябрь 2026)
- **`<ViewTransition />` + `addTransitionType`** — анимации через View Transitions API, управляемые React.
- **Fragment Refs** — `ref` на `<Fragment>`: даёт доступ к группе DOM-узлов без лишней обёртки.
- **`browser()` из `react-dom`** — `use(browser())` внутри `<Suspense>` помечает поддерево как «только в браузере» без ошибки восстановления при SSR.
- **`onBrowserBailout`** в серверных API — наблюдать, какие поддеревья отложены до браузера.
- **Trusted Types** — интеграция с API в рендеринге.
- Исправления Fast Refresh и `useEffectEvent` в `memo`/`forwardRef`-компонентах.

## ViewTransition на практике
В `Home.tsx` у вас уже:
```tsx
startTransition(() => setVisible((prev) => !prev));
{visible && <ViewTransition><Box ... /></ViewTransition>}
```
Анимация срабатывает только для обновлений **внутри transition** (или Suspense, `useDeferredValue`) — обычный `setState` её не запускает. Типы переходов (`addTransitionType('nav-forward')`) позволяют по-разному анимировать «вперёд/назад».

## Проверь себя
1. Чем `Activity hidden` отличается от условного рендера `{cond && <X/>}` с точки зрения состояния?
2. Почему `ViewTransition` не срабатывает от обычного `setState`?
3. Для чего `use(browser())` и чем он лучше `typeof window`?

## Задания в проекте
1. Сделайте на странице курса вкладки на `Activity`. Введите текст в инпут вкладки A, переключитесь на B и обратно: состояние должно сохраниться. Сравните с условным рендером.
2. Дополните `Home` из проекта: добавьте `name` для `ViewTransition` и анимацию смены цвета `Box`.
3. Добавьте анимацию перехода между страницами (`NavLink` → `startTransition`) с `addTransitionType`.
4. Включите в `eslint.config.js` правила `react-hooks/purity` и `react-hooks/set-state-in-effect` (сейчас `off`), исправьте найденное.
5. Включите дорожки React в Chrome DevTools и найдите самый дорогой рендер на странице `Practice`.
