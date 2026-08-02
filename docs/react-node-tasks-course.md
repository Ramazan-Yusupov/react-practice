# React + Node.js: курс по созданию CRUD-задач

Курс продолжает предыдущий Node.js-курс и показывает, как вместе использовать React, TypeScript, Vite и Node.js/Express на примере задач: создать, показать список, отредактировать, отметить выполненной и удалить.

Фокус курса - TypeScript. Все скрипты и backend-файлы пишем в `.ts`, запускаем через `tsx`, а ошибки ищем через `npm run typecheck`.

## 0. Что уже есть в проекте

В проекте уже есть основа для fullstack-практики:

- React + Vite + TypeScript frontend.
- Express и CORS уже установлены.
- `tsx` уже установлен для запуска `.ts`-скриптов.
- В `vite.config.ts` уже есть proxy:

```ts
server: {
  proxy: {
    '/api': 'http://localhost:3000',
  },
}
```

Это значит: frontend может делать запросы на `/api/tasks`, а Vite перенаправит их на Node-сервер `http://localhost:3000/api/tasks`.

В проекте уже есть полезные UI-компоненты:

- `Card` - контейнер.
- `Form` - форма.
- `Input` - поле ввода.
- `Button` - кнопка.
- `IconButton` - кнопка с иконкой.
- `Badge` - бейдж.
- `LoadingUI` - состояние загрузки.
- `ErrorUI` - состояние ошибки.

## 1. Цель курса

В конце курса у тебя будет связка:

```text
React UI
  -> fetch('/api/tasks')
  -> Vite proxy
  -> Express API
  -> массив tasks в памяти
  -> JSON-ответ обратно в React
```

CRUD означает:

- `Create` - создать задачу.
- `Read` - получить список задач.
- `Update` - изменить задачу.
- `Delete` - удалить задачу.

Для задач это будет так:

```text
GET    /api/tasks          получить все задачи
POST   /api/tasks          создать задачу
PATCH  /api/tasks/:id      изменить задачу
DELETE /api/tasks/:id      удалить задачу
```

## 2. Рекомендуемая структура

Лучше не держать весь backend в случайном файле. Сделай так:

```text
node/
  script.ts
  types.ts
  tasks.store.ts
```

Frontend часть:

```text
src/
  pages/
    Home/
      Home.tsx
  shared/
    api/
      tasks.api.ts
    types/
      task.ts
```

Почему так:

- `node/script.ts` - запускает сервер и описывает endpoints.
- `node/types.ts` - типы backend.
- `node/tasks.store.ts` - временное хранилище задач.
- `src/shared/api/tasks.api.ts` - функции frontend для запросов.
- `src/shared/types/task.ts` - тип задачи для React.
- `Home.tsx` - экран, где пользователь работает с задачами.

## 3. Важное замечание по текущему backend

Если у тебя сейчас `app.listen(...)` находится внутри `app.post('/api/tasks', ...)`, это ошибка.

Плохо:

```ts
app.post('/api/tasks', (req, res) => {
  // create task

  app.listen(3000, () => {
    console.log('Server is running');
  });
});
```

Почему плохо:

- сервер должен запускаться один раз;
- `POST /api/tasks` должен только создавать задачу;
- при каждом POST нельзя снова запускать сервер.

Правильно:

```ts
app.post('/api/tasks', (req, res) => {
  // create task
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

## 4. Общий тип задачи

Начнем с типа:

```ts
export type Task = {
  id: number;
  title: string;
  completed: boolean;
};
```

Для frontend создай файл:

```text
src/shared/types/task.ts
```

Код:

```ts
export type Task = {
  id: number;
  title: string;
  completed: boolean;
};
```

Для backend можно создать похожий файл:

```text
node/types.ts
```

Код:

```ts
export type Task = {
  id: number;
  title: string;
  completed: boolean;
};
```

На старте можно продублировать тип. Позже, когда будешь увереннее, можно вынести общие типы в одну общую папку.

## 5. Backend: хранилище задач

Создай файл:

```text
node/tasks.store.ts
```

Код:

```ts
import type { Task } from './types';

let nextTaskId = 4;

const tasks: Task[] = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Learn Node.js', completed: false },
  { id: 3, title: 'Build CRUD tasks', completed: false },
];

export function getTasks(): Task[] {
  return tasks;
}

export function createTask(title: string): Task {
  const task: Task = {
    id: nextTaskId,
    title,
    completed: false,
  };

  nextTaskId += 1;
  tasks.push(task);

  return task;
}

export function updateTask(id: number, data: Partial<Omit<Task, 'id'>>): Task | null {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return null;
  }

  if (data.title !== undefined) {
    task.title = data.title;
  }

  if (data.completed !== undefined) {
    task.completed = data.completed;
  }

  return task;
}

export function deleteTask(id: number): boolean {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}
```

Что здесь важно:

- `tasks` хранится в памяти;
- после перезапуска сервера задачи сбросятся;
- `createTask` создает задачу;
- `updateTask` редактирует `title` и `completed`;
- `deleteTask` удаляет задачу по `id`.

## 6. Backend: Express CRUD API

Файл:

```text
node/script.ts
```

Полный вариант:

```ts
import cors from 'cors';
import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from './tasks.store';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/tasks', (_req, res) => {
  res.json(getTasks());
});

app.post('/api/tasks', (req, res) => {
  const title = String(req.body.title ?? '').trim();

  if (!title) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const task = createTask(title);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({ message: 'Task id must be a number' });
    return;
  }

  const title = req.body.title === undefined ? undefined : String(req.body.title).trim();
  const completed = req.body.completed;

  if (title !== undefined && !title) {
    res.status(400).json({ message: 'Title cannot be empty' });
    return;
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    res.status(400).json({ message: 'Completed must be boolean' });
    return;
  }

  const task = updateTask(id, { title, completed });

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({ message: 'Task id must be a number' });
    return;
  }

  const isDeleted = deleteTask(id);

  if (!isDeleted) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## 7. Backend: запуск сервера

Добавь script в `package.json`:

```json
{
  "scripts": {
    "server:dev": "tsx node/script.ts"
  }
}
```

Запуск:

```bash
npm run server:dev
```

Проверка в браузере:

```text
http://localhost:3000/api/tasks
```

Или через PowerShell:

```powershell
Invoke-RestMethod http://localhost:3000/api/tasks
```

## 8. Frontend: API-функции

Создай файл:

```text
src/shared/api/tasks.api.ts
```

Код:

```ts
import type { Task } from '@/shared/types/task';

export type CreateTaskDto = {
  title: string;
};

export type UpdateTaskDto = {
  title?: string;
  completed?: boolean;
};

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message ?? 'Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getTasks(): Promise<Task[]> {
  return request<Task[]>('/api/tasks');
}

export function createTask(data: CreateTaskDto): Promise<Task> {
  return request<Task>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
  return request<Task>(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteTask(id: number): Promise<void> {
  return request<void>(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}
```

Почему так лучше, чем писать `fetch` прямо в компоненте:

- компонент не разрастается;
- все URL лежат в одном месте;
- легче обрабатывать ошибки;
- легче менять backend позже.

## 9. Frontend: состояние задач

В `Home.tsx` тебе понадобятся состояния:

```ts
const [tasks, setTasks] = useState<Task[]>([]);
const [title, setTitle] = useState('');
const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
const [editingTitle, setEditingTitle] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

Что они значат:

- `tasks` - список задач;
- `title` - поле создания новой задачи;
- `editingTaskId` - id задачи, которая сейчас редактируется;
- `editingTitle` - новое название редактируемой задачи;
- `isLoading` - идет загрузка;
- `error` - текст ошибки.

## 10. Frontend: загрузка задач

```ts
async function loadTasks() {
  try {
    setIsLoading(true);
    setError(null);

    const data = await getTasks();
    setTasks(data);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to load tasks');
  } finally {
    setIsLoading(false);
  }
}
```

Загружать задачи нужно при открытии страницы:

```ts
useEffect(() => {
  void loadTasks();
}, []);
```

`void` показывает TypeScript и ESLint, что promise намеренно не ожидается в этом месте.

## 11. Frontend: создание задачи

```ts
async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    setError('Task title is required');
    return;
  }

  try {
    setError(null);

    const task = await createTask({ title: trimmedTitle });
    setTasks((prevTasks) => [...prevTasks, task]);
    setTitle('');
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to create task');
  }
}
```

Что здесь происходит:

1. Останавливаем стандартную отправку формы.
2. Чистим пробелы.
3. Проверяем пустую строку.
4. Отправляем POST-запрос.
5. Добавляем новую задачу в React-state.
6. Очищаем input.

## 12. Frontend: удаление задачи

```ts
async function handleDeleteTask(id: number) {
  try {
    setError(null);

    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to delete task');
  }
}
```

После успешного DELETE backend возвращает `204 No Content`, а frontend просто убирает задачу из массива.

## 13. Frontend: переключение completed

```ts
async function handleToggleTask(task: Task) {
  try {
    setError(null);

    const updatedTask = await updateTask(task.id, {
      completed: !task.completed,
    });

    setTasks((prevTasks) =>
      prevTasks.map((item) => (item.id === updatedTask.id ? updatedTask : item)),
    );
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to update task');
  }
}
```

Это `PATCH`, потому что меняется только одно поле.

## 14. Frontend: старт редактирования

```ts
function startEditTask(task: Task) {
  setEditingTaskId(task.id);
  setEditingTitle(task.title);
}
```

Когда пользователь нажимает `Edit`, мы запоминаем:

- какую задачу редактируем;
- какой текст сейчас в input редактирования.

## 15. Frontend: сохранение редактирования

```ts
async function handleSaveTask(id: number) {
  const trimmedTitle = editingTitle.trim();

  if (!trimmedTitle) {
    setError('Task title cannot be empty');
    return;
  }

  try {
    setError(null);

    const updatedTask = await updateTask(id, {
      title: trimmedTitle,
    });

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    setEditingTaskId(null);
    setEditingTitle('');
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to save task');
  }
}
```

## 16. Frontend: отмена редактирования

```ts
function cancelEditTask() {
  setEditingTaskId(null);
  setEditingTitle('');
}
```

Это локальное действие. Запрос на backend не нужен.

## 17. Полный пример `Home.tsx`

Ниже пример, который можно использовать как ориентир. Не обязательно копировать вслепую; лучше собрать его по частям.

```tsx
import { useEffect, useState } from 'react';
import { FaCheck, FaPen, FaTrash, FaXmark } from 'react-icons/fa6';
import { createTask, deleteTask, getTasks, updateTask } from '@/shared/api/tasks.api';
import type { Task } from '@/shared/types/task';
import { Badge, Button, Card, ErrorUI, Form, IconButton, Input, LoadingUI } from '@/shared/ui';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadTasks() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadTasks();
  }, []);

  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title is required');
      return;
    }

    try {
      setError(null);

      const task = await createTask({ title: trimmedTitle });
      setTasks((prevTasks) => [...prevTasks, task]);
      setTitle('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create task');
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      setError(null);

      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete task');
    }
  }

  async function handleToggleTask(task: Task) {
    try {
      setError(null);

      const updatedTask = await updateTask(task.id, {
        completed: !task.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((item) => (item.id === updatedTask.id ? updatedTask : item)),
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update task');
    }
  }

  function startEditTask(task: Task) {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  }

  function cancelEditTask() {
    setEditingTaskId(null);
    setEditingTitle('');
  }

  async function handleSaveTask(id: number) {
    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      setError('Task title cannot be empty');
      return;
    }

    try {
      setError(null);

      const updatedTask = await updateTask(id, {
        title: trimmedTitle,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );

      cancelEditTask();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save task');
    }
  }

  return (
    <Card title="Tasks" border="2px" maxWidth="2xl">
      <Form onSubmit={handleCreateTask}>
        <div className="flex gap-3">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="New task title"
            onClear={() => setTitle('')}
          />
          <Button type="submit" title="Add" variant="primary" />
        </div>
      </Form>

      {error && <ErrorUI error={error} />}
      {isLoading && <LoadingUI />}

      <div className="flex flex-col gap-3">
        {tasks.map((task) => {
          const isEditing = editingTaskId === task.id;

          return (
            <div key={task.id} className="flex items-center gap-3 border-2 border-white/20 rounded-xl p-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => void handleToggleTask(task)}
              />

              {isEditing ? (
                <Input
                  value={editingTitle}
                  onChange={(event) => setEditingTitle(event.target.value)}
                  onClear={() => setEditingTitle('')}
                />
              ) : (
                <div className="flex-1">
                  <p className={task.completed ? 'line-through text-gray-500' : 'text-white'}>
                    {task.title}
                  </p>
                </div>
              )}

              <Badge text={task.completed ? 'Done' : 'Active'} color={task.completed ? 'green' : 'yellow'} />

              {isEditing ? (
                <>
                  <IconButton
                    ariaLabel="Save task"
                    icon={<FaCheck />}
                    onClick={() => void handleSaveTask(task.id)}
                  />
                  <IconButton ariaLabel="Cancel edit" icon={<FaXmark />} onClick={cancelEditTask} />
                </>
              ) : (
                <IconButton ariaLabel="Edit task" icon={<FaPen />} onClick={() => startEditTask(task)} />
              )}

              <IconButton
                ariaLabel="Delete task"
                icon={<FaTrash />}
                variant="destructive"
                onClick={() => void handleDeleteTask(task.id)}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
```

## 18. Важная проверка по `Button`

В проекте есть два Button:

```text
src/shared/components/ui/button.tsx
src/shared/ui/Buttons/Button.tsx
```

Для этого курса удобнее использовать локальный UI export:

```ts
import { Button } from '@/shared/ui';
```

Почему:

- он уже поддерживает `variant="primary"`;
- он уже поддерживает `title`;
- он уже используется рядом с другими компонентами из `src/shared/ui`.

Если импортировать shadcn/Base UI Button:

```ts
import { Button } from '@/shared/components/ui/button';
```

то API пропсов будет другим.

## 19. Как проверять backend отдельно

Запусти сервер:

```bash
npm run server:dev
```

Проверь список:

```powershell
Invoke-RestMethod http://localhost:3000/api/tasks
```

Создай задачу:

```powershell
Invoke-RestMethod http://localhost:3000/api/tasks -Method Post -ContentType 'application/json' -Body '{"title":"Learn CRUD"}'
```

Измени задачу:

```powershell
Invoke-RestMethod http://localhost:3000/api/tasks/1 -Method Patch -ContentType 'application/json' -Body '{"completed":true}'
```

Удали задачу:

```powershell
Invoke-RestMethod http://localhost:3000/api/tasks/1 -Method Delete
```

## 20. Как запускать frontend и backend

В одном терминале:

```bash
npm run server:dev
```

Во втором терминале:

```bash
npm run dev
```

Открываешь frontend, и React обращается к `/api/tasks`.

Благодаря proxy в `vite.config.ts` запрос уйдет на Node-сервер.

## 21. Частые ошибки

Ошибка: `Cannot GET /api/tasks`.

Причина: endpoint не описан или сервер запущен не тот.

Решение: проверь `app.get('/api/tasks', ...)` и порт `3000`.

Ошибка: `Failed to fetch`.

Причина: backend не запущен.

Решение: запусти `npm run server:dev`.

Ошибка: запрос уходит на `localhost:5173/api/tasks`, но backend не отвечает.

Причина: proxy не настроен или backend не работает.

Решение: проверь `vite.config.ts`.

Ошибка: задача создается, но после перезапуска пропадает.

Причина: задачи хранятся в памяти.

Решение: это нормально для этого этапа. Следующий шаг - JSON-файл или база данных.

Ошибка: `app.listen` внутри `app.post`.

Причина: сервер запускается только после POST или пытается запускаться повторно.

Решение: `app.listen` должен быть внизу файла один раз.

## 22. Домашние задания

Задание 1: backend read/create

- Сделай `GET /api/tasks`.
- Сделай `POST /api/tasks`.
- Проверь через PowerShell.

Задание 2: backend update/delete

- Сделай `PATCH /api/tasks/:id`.
- Сделай `DELETE /api/tasks/:id`.
- Обработай `404`, если задача не найдена.

Задание 3: frontend list/create

- Загрузи задачи через `getTasks`.
- Покажи список в `Home.tsx`.
- Добавь форму создания задачи.

Задание 4: frontend edit/delete

- Добавь кнопку редактирования.
- Добавь сохранение нового title.
- Добавь кнопку удаления.

Задание 5: completed

- Добавь checkbox.
- При клике отправляй `PATCH`.
- Показывай `Done` или `Active` через `Badge`.

## 23. Следующий уровень

После CRUD в памяти можно улучшить проект:

1. Хранить задачи в JSON-файле.
2. Добавить фильтр `All / Active / Done`.
3. Добавить поиск по задачам.
4. Добавить `isSaving` для отдельных задач.
5. Добавить optimistic update.
6. Добавить backend-валидацию через Zod.
7. Добавить тесты API.
8. Перейти на SQLite или PostgreSQL.

## 24. Мини-чеклист готовности

Ты понял тему, если можешь объяснить:

- почему React делает запрос на `/api/tasks`, а отвечает Express;
- зачем нужен Vite proxy;
- почему `GET` не должен менять данные;
- почему создание задачи идет через `POST`;
- почему редактирование идет через `PATCH`;
- почему удаление идет через `DELETE`;
- почему `app.listen` должен быть один раз;
- зачем выносить `fetch` в `tasks.api.ts`;
- почему frontend-state надо обновлять после каждого успешного запроса.

## 25. Финальная схема

```text
Home.tsx
  |
  | uses
  v
tasks.api.ts
  |
  | fetch('/api/tasks')
  v
Vite proxy
  |
  | http://localhost:3000/api/tasks
  v
node/script.ts
  |
  | uses
  v
node/tasks.store.ts
  |
  | stores
  v
Task[] in memory
```

Это уже настоящий fullstack-паттерн: UI, клиентский API-слой, dev proxy, backend routes и слой данных.