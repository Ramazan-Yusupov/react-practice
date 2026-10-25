# React · 02 · React 19: Actions, формы, `use`

## 1. Что такое Action
**Action** — асинхронная функция, запущенная внутри transition. React сам ведёт pending-состояние, ошибки и оптимистичные обновления. Формы получили `action` вместо `onSubmit`:
```tsx
<form action={async (formData: FormData) => { await save(formData.get('title') as string); }}>
```
После успешного action **неуправляемые** поля формы сбрасываются автоматически.

## 2. `useActionState`
```tsx
import { useActionState } from 'react';

type State = { error: string | null };

async function createTask(prev: State, formData: FormData): Promise<State> {
  const title = String(formData.get('title') ?? '').trim();
  if (!title) return { error: 'Введите название' };
  const res = await fetch('http://localhost:4000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, userId: 1 }),
  });
  if (!res.ok) return { error: 'Не удалось создать задачу' };
  return { error: null };
}

export function NewTaskForm() {
  const [state, formAction, isPending] = useActionState(createTask, { error: null });
  return (
    <form action={formAction}>
      <input name="title" />
      <button disabled={isPending}>{isPending ? 'Сохраняем…' : 'Добавить'}</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}
```
Сигнатура action: `(prevState, formData) => newState`. Серверные запросы внутри `useActionState` идут **последовательно** (очередь).

## 3. `useFormStatus`
Только внутри дочернего компонента формы, импорт из `react-dom`:
```tsx
import { useFormStatus } from 'react-dom';
function Submit() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? '…' : 'Отправить'}</button>;
}
```

## 4. `useOptimistic`
Показывает ожидаемый результат до ответа сервера; по завершении action откатывается к реальному состоянию.
```tsx
const [optimisticTasks, addOptimistic] = useOptimistic(
  tasks,
  (current, title: string) => [{ id: -1, userId: 1, title, done: false }, ...current],
);
async function action(formData: FormData) {
  const title = String(formData.get('title'));
  addOptimistic(title);       // мгновенно
  await createOnServer(title); // затем реальное
}
```
Вызывать `addOptimistic` нужно внутри action/transition.

## 5. `use`
```tsx
function Tasks({ promise }: { promise: Promise<Task[]> }) {
  const tasks = use(promise); // приостанавливает компонент до resolve (нужен <Suspense>)
  return tasks.map((t) => <li key={t.id}>{t.title}</li>);
}
```
Промис должен быть **стабильным** (создан вне рендера или закэширован), иначе новый промис на каждом рендере. Контекст через `use(Ctx)` можно читать условно (после `if`/`return`).

## 6. Мелкие, но важные изменения 19
- **`ref` — обычный prop**: `forwardRef` больше не нужен для новых компонентов.
- **Cleanup у ref-callback**: `ref={(el) => { ...; return () => ...; }}`.
- **`<Ctx value>`** вместо `<Ctx.Provider>`.
- **Метаданные в компоненте**: `<title>`, `<meta>`, `<link>` поднимаются в `<head>` автоматически.
- **Ресурсы**: `preload`, `preinit`, `preconnect`, `prefetchDNS` из `react-dom`; `<link rel="stylesheet" precedence="default">`.
- **Ошибки**: `createRoot(el, { onCaughtError, onUncaughtError, onRecoverableError })` — единая точка логирования.
- **Custom Elements** поддерживаются полностью.

## Actions и TanStack Query: когда что
Actions отлично решают **отправку формы и её pending-состояние**. Для **кэша серверных данных, инвалидации, ретраев, пагинации** нужен TanStack Query. Они дополняют друг друга: в action вызывайте `mutation.mutateAsync(...)`, а оптимистичный слой решайте либо `useOptimistic`, либо `onMutate` в Query (разберём в `tanstack/`).

## Проверь себя
1. Что возвращает `useActionState` и в каком порядке?
2. Почему `useFormStatus` не работает в том же компоненте, где стоит `<form>`?
3. Что случится, если передать в `use()` промис, созданный прямо в рендере?
4. Какие поля формы сбрасываются автоматически и когда?

## Задания в проекте
1. На `Practice` добавьте форму «Новая задача» на `useActionState` → `POST /api/tasks` (сервер уже есть). Покажите ошибку `?fail=true`.
2. Вынесите кнопку отправки в `Submit` с `useFormStatus`.
3. Добавьте `useOptimistic`: новая задача появляется в списке сразу, потом подтверждается; при `fail` — откатывается.
4. Переведите `Button`/`Input` из `shared/ui` на `ref` как prop (если там `forwardRef`).
5. Добавьте на страницу курса `<title>` прямо в компоненте и убедитесь, что он попал в `<head>`.
