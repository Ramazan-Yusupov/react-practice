# React · 07 · Паттерны, архитектура, тесты

## Паттерны компонентов
- **Композиция вместо props-ада**: `children`, слоты-пропсы, render props только если нужно передать данные.
- **Compound components** (`<Tabs><Tabs.List/>…`) с общим контекстом: гибкий API без десятка булевых пропсов.
- **Controlled / uncontrolled** — поддерживайте оба режима в UI-кит-компонентах (`value`/`defaultValue`).
- **Кастомные хуки** — выделяйте логику, не JSX: `useToggle`, `useDebounce`, `useMediaQuery`.
- **Состояние рядом с использованием (colocation)** и подъём только по необходимости. Глобальное — в Zustand/Query, не в контексте «на всё».
- **Контекст**: хранит редко меняющиеся значения (тема, пользователь). Частые обновления в контексте перерендерят всех потребителей.
- **Дискриминированные объединения** для состояний: `{ status: 'idle' } | { status: 'error'; error: Error }` вместо россыпи булевых.

## Архитектура
У вас уже слои в духе Feature-Sliced Design: `pages`, `widgets`, `shared`. Правило импорта: **вверх по слоям нельзя** (`shared` не знает про `pages`). В проекте стоит выровнять:
- вынести всё API в `shared/api` (сейчас `tasksApi.ts` дублируется в `api/` и `lib/`);
- слой `entities`/`features` для сущностей (task, card) и действий (создать, пометить выполненной);
- публичные API модулей через `index.ts`.

## Доступность (минимум)
Семантические теги, `label`/`htmlFor` (или `useId`), `aria-live` для ошибок, управление фокусом при открытии модалок, контраст.

## Тесты
Стек: **Vitest + React Testing Library + user-event** (у вас уже стоит `jsdom`, Vitest ещё нет).
```bash
npm i -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom
```
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('переключает состояние', async () => {
  render(<Toggle />);
  await userEvent.click(screen.getByRole('button', { name: /включить/i }));
  expect(screen.getByRole('button', { name: /выключить/i })).toBeInTheDocument();
});
```
Принципы: тестируем **поведение с точки зрения пользователя** (роли, тексты), а не внутреннее состояние; запросы мокаем на границе сети (MSW), а не функции хуков; тестируем кастомные хуки через `renderHook`.

## Проверь себя
1. Когда compound-компонент лучше набора булевых пропсов?
2. Почему большой контекст вредит производительности?
3. Что тестирует `getByRole` и почему он предпочтительнее `getByTestId`?

## Задания в проекте
1. Объедините дубли `tasksApi.ts`, приведите структуру к слоям (`entities/task`, `features/toggle-task`).
2. Подключите Vitest (`vite.config.ts` → `test: { environment: 'jsdom' }`), добавьте скрипт `test` и включите его в `npm run check`.
3. Напишите тесты: `Button`, `useToggle`, форма «Новая задача» (файл 02) с мок-ответами MSW.
4. Сделайте `Tabs` как compound-компонент и протестируйте клавиатурную навигацию.
5. Проведите ревизию доступности страницы `Practice` (кнопки, статус загрузки, ошибки).
