# Большой курс по Node.js с нуля

Курс для новичка, который уже работает с React/Vite-проектом `react-practice` и хочет понять, зачем нужен Node.js, как он связан с frontend-разработкой и как постепенно перейти к backend/fullstack.

## Как пользоваться курсом

Не пытайся пройти все за один день. Node.js лучше учить слоями:

1. Сначала понять, что происходит, когда ты пишешь `npm run dev`.
2. Затем разобраться с `package.json`, пакетами и модулями.
3. Потом перейти к файловой системе, асинхронности и HTTP.
4. После этого собрать маленький backend API.
5. В конце подключить React-приложение к этому API.

Практика важнее чтения. После каждой главы есть задания. Если глава кажется простой, все равно сделай задание руками.

## 0. Анализ текущего проекта

Текущий проект - это frontend-приложение на React, TypeScript и Vite.

Главные файлы:

- `package.json` - описание проекта, зависимости и npm-скрипты.
- `package-lock.json` - точные версии установленных пакетов.
- `node_modules/` - установленные зависимости.
- `vite.config.ts` - настройка Vite.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - настройки TypeScript.
- `eslint.config.js` - настройка ESLint.
- `components.json` - настройка shadcn.
- `src/main.tsx` - точка входа React-приложения.
- `src/pages/App.tsx` - маршруты приложения.
- `src/pages/Home/Home.tsx` - главная страница.
- `src/shared/ui` - локальные UI-компоненты.
- `src/shared/components/ui` - shadcn/Base UI-компоненты.

В `package.json` есть такие команды:

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run format:check
npm run preview
```

Отдельный скрипт `typecheck` теперь есть. Он запускает `tsc -b`, а `npm run build` дополнительно выполняет ту же проверку перед production-сборкой:

```bash
tsc -b && vite build
```

Это значит:

1. Сначала TypeScript проверяет проект.
2. Если ошибок типов нет, Vite собирает production-версию.

Компоненты, которые уже есть в проекте:

- `Button`
- `IconButton`
- `Input`
- `Form`
- `Card`
- `CodeBlock`
- `Badge`
- `Avatar`
- `Image`
- `ImagesBadge`
- `LoadingUI`
- `ErrorUI`

Если компонента не хватает, его можно добавить через shadcn, потому что в проекте уже есть `components.json`.

## 1. Что такое Node.js

Node.js - это среда выполнения JavaScript вне браузера.

Обычно JavaScript ассоциируется с браузером:

- нажал кнопку;
- открыл модальное окно;
- отправил форму;
- изменил DOM;
- сделал запрос на сервер.

Node.js позволяет писать JavaScript для других задач:

- запускать локальный dev-сервер;
- читать и писать файлы;
- создавать backend API;
- работать с базами данных;
- писать CLI-утилиты;
- запускать сборщики вроде Vite;
- управлять зависимостями через npm;
- автоматизировать задачи проекта.

В твоем проекте Node.js уже используется, даже если ты не писал backend. Когда ты запускаешь:

```bash
npm run dev
```

работает Node.js. Он запускает Vite, читает конфиги, поднимает dev-сервер и отдает React-приложение в браузер.

## 2. Node.js и браузерный JavaScript

JavaScript в браузере умеет работать с:

- `window`;
- `document`;
- DOM;
- событиями клика;
- localStorage;
- fetch;
- формами;
- CSSOM.

Node.js работает с другим окружением:

- файлами;
- папками;
- процессами;
- переменными окружения;
- сетевыми портами;
- HTTP-серверами;
- npm-пакетами;
- операционной системой.

Пример браузерного кода:

```ts
document.querySelector('button')?.addEventListener('click', () => {
  console.log('Clicked');
});
```

Пример Node.js-кода:

```ts
import { readFile } from 'node:fs/promises';

const text = await readFile('package.json', 'utf-8');
console.log(text);
```

Главная мысль: язык один, окружения разные.

## 3. Установка и проверка Node.js

Проверь версии:

```bash
node -v
npm -v
```

`node` запускает JavaScript.

`npm` устанавливает пакеты и запускает scripts из `package.json`.

Минимальные версии для современных React/Vite-проектов обычно такие:

- Node.js LTS;
- npm, который идет вместе с Node.js.

Если проект уже запускается через `npm run dev`, значит Node.js установлен.

## 4. Терминал для новичка

Тебе часто понадобятся команды:

```bash
pwd
ls
cd folder-name
cd ..
mkdir folder-name
npx tsx file.ts
npm install
npm run dev
```

В PowerShell аналоги могут выглядеть так:

```powershell
Get-Location
Get-ChildItem
Set-Location src
New-Item -ItemType Directory server
```

Для проекта важнее всего понимать текущую папку. Команды npm надо запускать из корня проекта, где лежит `package.json`.

## 5. Первый Node.js-файл

Создай временный TypeScript-файл `playground/hello.ts`:

Перед первым запуском TypeScript-скриптов установи `tsx`:

```bash
npm install -D tsx
```

```ts
console.log('Hello from Node.js');
```

Запусти:

```bash
npx tsx playground/hello.ts
```

tsx запустит TypeScript-файл через Node.js без ручной компиляции.

Задание:

1. Создай файл `playground/info.ts`.
2. Выведи свое имя.
3. Выведи текущую дату.
4. Запусти файл через `npx tsx playground/info.ts`.

Пример:

```ts
const name = 'Ramazan';
const now = new Date();

console.log(name);
console.log(now.toISOString());
```

## 6. `package.json`

`package.json` - это паспорт проекта.

В нем обычно есть:

- `name` - имя проекта;
- `version` - версия;
- `type` - тип модулей;
- `scripts` - команды проекта;
- `dependencies` - пакеты для работы приложения;
- `devDependencies` - пакеты для разработки.

В твоем проекте есть:

```json
{
  "name": "react-practice",
  "private": true,
  "version": "0.0.0",
  "type": "module"
}
```

Важная строка:

```json
"type": "module"
```

Она говорит Node.js, что в проекте используется современный формат модулей:

```ts
import path from 'node:path';

export function sum(a: number, b: number): number {
  return a + b;
}
```

А не старый CommonJS:

```ts
const path = require('node:path');
module.exports = { sum };
```

## 7. npm scripts

Скрипты - это короткие команды в `package.json`.

Пример:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint ."
  }
}
```

Когда ты пишешь:

```bash
npm run dev
```

npm ищет `scripts.dev` и запускает команду `vite`.

Когда ты пишешь:

```bash
npm run build
```

npm запускает:

```bash
tsc -b && vite build
```

`&&` значит: выполнить вторую команду только если первая завершилась успешно.

В проекте для этого есть отдельный скрипт:

```json
{
  "scripts": {
    "typecheck": "tsc -b"
  }
}
```

Его можно запускать отдельно:

```bash
npm run typecheck
```

Это удобно, потому что проверку типов можно запускать отдельно от полной сборки.

## 8. Зависимости

Зависимости - это пакеты, которые проект использует.

Пример из твоего проекта:

```json
"dependencies": {
  "react": "^19.2.7",
  "react-dom": "^19.2.7",
  "vite": "^8.1.0"
}
```

Установка пакета:

```bash
npm install axios
```

Установка dev-пакета:

```bash
npm install -D vitest
```

После установки npm меняет:

- `package.json`;
- `package-lock.json`;
- `node_modules/`.

`node_modules` руками редактировать не надо.

## 9. `package-lock.json`

`package-lock.json` фиксирует точные версии всех пакетов.

Зачем он нужен:

- чтобы у тебя и у другого разработчика были одинаковые зависимости;
- чтобы CI собирал проект предсказуемо;
- чтобы обновления пакетов не ломали проект неожиданно.

Обычно файл коммитят в git.

Удалять его без причины не надо.

## 10. ES Modules

В современном Node.js чаще используют ES Modules.

Файл `math.ts`:

```ts
export function sum(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}
```

Файл `app.ts`:

```ts
import { sum, multiply } from './math.ts';

console.log(sum(2, 3));
console.log(multiply(2, 3));
```

Важно: при запуске TypeScript через `tsx` в учебных ESM-примерах удобно писать импорт с расширением `.ts`:

```ts
import { sum } from './math.ts';
```

В React/Vite TypeScript-проекте ты часто можешь писать короче, потому что Vite и TypeScript обрабатывают alias:

```ts
import { Button } from '@/shared/ui';
```

Это работает из-за Vite, TypeScript и alias-настроек.

## 11. Встроенные модули Node.js

Node.js поставляется со встроенными модулями.

Частые модули:

- `node:fs` - файловая система;
- `node:path` - пути;
- `node:http` - HTTP-сервер;
- `node:url` - URL;
- `node:crypto` - криптография;
- `node:events` - события;
- `node:process` - текущий процесс.

Пример:

```ts
import path from 'node:path';

const filePath = path.join('src', 'pages', 'Home', 'Home.tsx');
console.log(filePath);
```

Префикс `node:` показывает, что модуль встроенный.

## 12. Работа с файлами

Асинхронное чтение:

```ts
import { readFile } from 'node:fs/promises';

const packageJson = await readFile('package.json', 'utf-8');
console.log(packageJson);
```

Запись:

```ts
import { writeFile } from 'node:fs/promises';

await writeFile('playground/result.txt', 'Hello file');
```

Чтение JSON:

```ts
import { readFile } from 'node:fs/promises';

const raw = await readFile('package.json', 'utf-8');
const data = JSON.parse(raw);

console.log(data.name);
console.log(data.scripts);
```

Задание:

1. Прочитай `package.json`.
2. Выведи имя проекта.
3. Выведи список npm-скриптов.
4. Выведи количество dependencies.

## 13. Пути

Нельзя собирать пути строками:

```ts
const badPath = 'src' + '/' + 'main.tsx';
```

Лучше использовать `path.join`:

```ts
import path from 'node:path';

const filePath = path.join('src', 'main.tsx');
console.log(filePath);
```

Почему:

- Windows использует `\`;
- macOS/Linux используют `/`;
- `path.join` учитывает операционную систему.

## 14. Процесс и аргументы командной строки

`process` дает информацию о запущенной программе.

```ts
console.log(process.cwd());
console.log(process.argv);
console.log(process.env.NODE_ENV);
```

`process.cwd()` - текущая рабочая папка.

`process.argv` - аргументы командной строки.

Пример:

```ts
const name = process.argv[2] || 'Guest';
console.log(`Hello, ${name}`);
```

Запуск:

```bash
npx tsx playground/greet.ts Ramazan
```

## 15. Асинхронность

Node.js часто работает с асинхронными задачами:

- чтение файлов;
- запросы к API;
- работа с базой данных;
- ожидание сетевых соединений;
- таймеры.

Promise:

```ts
const promise = fetch('https://example.com');
```

`async/await`:

```ts
async function main() {
  const response = await fetch('https://example.com');
  console.log(response.status);
}

main();
```

В Node.js верхнеуровневый `await` работает в ES Modules:

```ts
const response = await fetch('https://example.com');
console.log(response.status);
```

## 16. Ошибки

Ошибки надо обрабатывать.

```ts
import { readFile } from 'node:fs/promises';

try {
  const text = await readFile('missing.txt', 'utf-8');
  console.log(text);
} catch (error) {
  console.error('Не удалось прочитать файл');
  console.error(error);
}
```

Правило:

- ошибка, которую можно ожидать, должна быть обработана;
- ошибка, которую нельзя обработать, должна быть залогирована;
- пользователю нельзя показывать внутренние детали сервера.

## 17. Event Loop простыми словами

Event Loop - механизм, который позволяет Node.js не блокироваться на ожидании.

Пример:

```ts
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

console.log('3');
```

Вывод:

```text
1
3
2
```

Почему так:

1. Синхронный код выполняется сразу.
2. `setTimeout` откладывает callback.
3. Node.js возвращается к callback позже.

## 18. HTTP-сервер без фреймворка

Node.js умеет создавать сервер без Express.

```ts
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Hello API' }));
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
```

Запуск:

```bash
npx tsx server/index.ts
```

Открой:

```text
http://localhost:3001
```

Это первый backend.

## 19. Роутинг вручную

Пример:

```ts
import http from 'node:http';

const server = http.createServer((req, res) => {
  if (req.url === '/api/health' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
});

server.listen(3001);
```

Так можно учиться, но в реальных проектах обычно берут фреймворк.

## 20. Express как следующий шаг

Express - популярный backend-фреймворк для Node.js.

Установка:

```bash
npm install express
npm install -D @types/express
```

Пример:

```ts
import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(3001, () => {
  console.log('API is running on http://localhost:3001');
});
```

Express удобен, потому что:

- проще писать маршруты;
- проще обрабатывать JSON;
- проще подключать middleware;
- проще масштабировать API.

## 21. REST API

REST API - способ организовать endpoints.

Пример для задач:

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

HTTP-методы:

- `GET` - получить данные;
- `POST` - создать;
- `PATCH` - частично обновить;
- `PUT` - заменить;
- `DELETE` - удалить.

Статусы:

- `200` - успешно;
- `201` - создано;
- `400` - плохой запрос;
- `401` - не авторизован;
- `403` - запрещено;
- `404` - не найдено;
- `500` - ошибка сервера.

## 22. Мини API задач

Пример учебного API:

```ts
import express from 'express';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const app = express();
const tasks: Task[] = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Connect React', completed: false },
];

app.use(express.json());

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const title = String(req.body.title ?? '').trim();

  if (!title) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const task: Task = {
    id: Date.now(),
    title,
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.listen(3001, () => {
  console.log('API is running on http://localhost:3001');
});
```

Это хранит данные в памяти. После перезапуска сервера данные пропадут. Для учебы это нормально.

## 23. Подключение React к Node API

В React можно сделать запрос:

```ts
async function loadTasks() {
  const response = await fetch('http://localhost:3001/api/tasks');
  const tasks = await response.json();
  return tasks;
}
```

Но при разработке может возникнуть CORS.

Есть два пути:

1. Настроить CORS на backend.
2. Настроить proxy в Vite.

Proxy в `vite.config.ts`:

```ts
export default defineConfig(() => {
  return {
    server: {
      proxy: {
        '/api': 'http://localhost:3001',
      },
    },
  };
});
```

После этого в React можно писать:

```ts
const response = await fetch('/api/tasks');
```

Это хороший вариант для твоего проекта.

## 24. CORS

CORS - правило браузера, которое ограничивает запросы между разными origin.

Origin включает:

- протокол;
- домен;
- порт.

Примеры разных origin:

```text
http://localhost:5173
http://localhost:3001
```

React dev-server и Node API обычно работают на разных портах, поэтому браузер может блокировать запросы.

Для Express можно поставить:

```bash
npm install cors
npm install -D @types/cors
```

И подключить:

```ts
import cors from 'cors';

app.use(cors());
```

Для production надо настраивать CORS строже.

## 25. Переменные окружения

Переменные окружения позволяют хранить настройки вне кода:

- порт сервера;
- строка подключения к базе;
- секреты;
- режим окружения.

Пример:

```bash
PORT=3001
```

В Node.js:

```ts
const port = process.env.PORT || 3001;
```

Часто используют пакет `dotenv`:

```bash
npm install dotenv
```

```ts
import 'dotenv/config';

const port = process.env.PORT || 3001;
```

Файл `.env` обычно не коммитят, если там есть секреты.

## 26. Валидация данных

Нельзя доверять данным от пользователя.

Плохой вариант:

```ts
app.post('/api/tasks', (req, res) => {
  tasks.push(req.body);
  res.json(req.body);
});
```

Лучше проверить:

```ts
app.post('/api/tasks', (req, res) => {
  const title = req.body.title;

  if (typeof title !== 'string' || title.trim().length === 0) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const task = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});
```

Для серьезных проектов можно использовать Zod.

## 27. Базы данных

Backend без базы хранит данные временно.

Популярные варианты:

- PostgreSQL - хороший выбор для серьезных приложений;
- SQLite - удобно для учебы и локальных проектов;
- MongoDB - документная база;
- MySQL - классическая реляционная база.

Для новичка хороший путь:

1. Сначала хранить данные в памяти.
2. Потом хранить данные в JSON-файле.
3. Потом перейти на SQLite.
4. Потом изучить PostgreSQL.

## 28. JSON-файл как учебное хранилище

Пример:

```ts
import { readFile, writeFile } from 'node:fs/promises';

type Db = {
  tasks: Array<{
    id: number;
    title: string;
    completed: boolean;
  }>;
};

const DB_PATH = 'server/db.json';

export async function readDb(): Promise<Db> {
  const raw = await readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw) as Db;
}

export async function writeDb(data: Db): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
}
```

Это не замена базе данных, но отлично помогает понять:

- асинхронность;
- JSON;
- CRUD;
- ошибки;
- структуру backend-кода.

## 29. Middleware

Middleware - функция, которая выполняется между запросом и ответом.

Пример:

```ts
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

Зачем middleware:

- логирование;
- авторизация;
- CORS;
- обработка JSON;
- обработка ошибок.

## 30. Обработка ошибок в Express

Простой обработчик:

```ts
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});
```

В production нельзя отправлять пользователю stack trace.

Плохо:

```ts
res.json({ error });
```

Лучше:

```ts
res.status(500).json({ message: 'Something went wrong' });
```

## 31. Авторизация простыми словами

Есть два понятия:

- authentication - кто ты;
- authorization - что тебе можно.

Типичный flow:

1. Пользователь вводит email и пароль.
2. Сервер проверяет пароль.
3. Сервер выдает token или cookie.
4. Frontend отправляет token/cookie в следующих запросах.
5. Сервер проверяет доступ.

Для новичка важно сначала понять HTTP, REST и хранение данных. Авторизацию лучше изучать после базового API.

## 32. Загрузка файлов

Node.js может принимать файлы:

- аватары;
- изображения;
- документы;
- архивы.

Для Express часто используют `multer`.

Но сначала надо понять:

- что такое multipart/form-data;
- где хранить файлы;
- как ограничивать размер;
- как проверять тип файла;
- как защищаться от опасных загрузок.

## 33. Логирование

`console.log` подходит для учебы.

В реальном backend лучше использовать логгер:

- pino;
- winston.

Пример учебного логирования:

```ts
app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    const ms = Date.now() - startedAt;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${ms}ms`);
  });

  next();
});
```

## 34. Тестирование

Тестировать можно:

- чистые функции;
- API endpoints;
- работу с файлами;
- валидацию;
- обработку ошибок.

Популярные инструменты:

- Vitest;
- Jest;
- Supertest.

Пример чистой функции:

```ts
export function normalizeTitle(title) {
  return title.trim().replace(/\s+/g, ' ');
}
```

Тест:

```ts
import { expect, test } from 'vitest';
import { normalizeTitle } from './normalize-title.ts';

test('normalizes spaces', () => {
  expect(normalizeTitle('  Learn   Node  ')).toBe('Learn Node');
});
```

## 35. TypeScript в Node.js

Твой frontend уже использует TypeScript.

Backend тоже можно писать на TypeScript.

Варианты запуска:

- компилировать через `tsc`;
- использовать `tsx` для разработки;
- использовать `ts-node`;
- использовать Bun/Deno, но это отдельные среды.

Для новичка удобный вариант:

```bash
npm install -D tsx
```

Скрипт:

```json
{
  "scripts": {
    "server:dev": "tsx server/index.ts"
  }
}
```

Пример `server/index.ts`:

```ts
import express from 'express';

const app = express();
const port = 3001;

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
```

## 36. Структура backend-папки

Для учебного backend рядом с React можно сделать:

```text
server/
  index.ts
  routes/
    tasks.routes.ts
  services/
    tasks.service.ts
  db/
    tasks.json
  utils/
    validate.ts
```

Что где хранить:

- `index.ts` - запуск сервера;
- `routes` - endpoints;
- `services` - бизнес-логика;
- `db` - временное хранилище;
- `utils` - вспомогательные функции.

Не надо сразу делать сложную архитектуру. Главное - чтобы было понятно, где вход, где маршруты, где данные.

## 37. Как Node.js связан с Vite

Vite - это инструмент, который работает в Node.js.

Когда ты пишешь:

```bash
npm run dev
```

происходит примерно следующее:

1. npm читает `package.json`.
2. npm запускает `vite`.
3. Vite читает `vite.config.ts`.
4. Vite поднимает dev-сервер.
5. Браузер открывает frontend.
6. При изменении файлов Vite быстро обновляет страницу.

Когда ты пишешь:

```bash
npm run build
```

происходит:

1. TypeScript проверяет типы.
2. Vite собирает оптимизированные файлы.
3. Результат попадает в `dist/`.

`dist/` - это то, что можно отдавать на production-хостинге.

## 38. shadcn в твоем проекте

В проекте есть `components.json`. Это значит, что shadcn уже настроен.

Важные алиасы:

```json
{
  "ui": "@/shared/components/ui",
  "lib": "@/shared/lib",
  "hooks": "@/shared/hooks"
}
```

Если нужен новый компонент, например dialog:

```bash
npx shadcn add dialog
```

Компонент должен попасть в:

```text
src/shared/components/ui
```

Но перед добавлением компонента проверь, нет ли уже похожего в:

```text
src/shared/ui
src/shared/components/ui
```

В проекте уже есть две зоны UI:

- `src/shared/ui` - твои локальные компоненты;
- `src/shared/components/ui` - shadcn/Base UI-компоненты.

Это важно не путать.

## 39. Практический fullstack-путь для этого проекта

Цель: React-приложение получает данные из Node.js API.

Этап 1 - добавить backend:

```text
server/index.ts
```

Этап 2 - добавить endpoint:

```text
GET /api/skills
```

Этап 3 - вернуть данные:

```json
[
  { "id": 1, "title": "Frontend" },
  { "id": 2, "title": "Backend" },
  { "id": 3, "title": "Node.js" }
]
```

Этап 4 - настроить Vite proxy:

```ts
server: {
  proxy: {
    '/api': 'http://localhost:3001'
  }
}
```

Этап 5 - заменить массив в `Home.tsx` на загрузку из API.

Сейчас в `Home.tsx` массив `items` находится прямо в компоненте. Позже его можно получать с backend:

```ts
const response = await fetch('/api/skills');
const skills = await response.json();
```

## 40. CLI-утилита для анализа проекта

Node.js можно использовать не только для backend, но и для утилит проекта.

Пример идеи:

```bash
npx tsx scripts/project-info.ts
```

Утилита может вывести:

- имя проекта;
- список scripts;
- количество dependencies;
- количество devDependencies;
- используется ли TypeScript;
- есть ли Vite;
- есть ли shadcn.

Пример:

```ts
import { readFile } from 'node:fs/promises';

type PackageJson = {
  name?: string;
  version?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const raw = await readFile('package.json', 'utf-8');
const pkg = JSON.parse(raw) as PackageJson;

console.log(`Project: ${pkg.name ?? 'unknown'}`);
console.log('Scripts:', Object.keys(pkg.scripts ?? {}));
console.log('Dependencies:', Object.keys(pkg.dependencies ?? {}).length);
console.log('Dev dependencies:', Object.keys(pkg.devDependencies ?? {}).length);
```

Это полезное упражнение, потому что оно связывает Node.js с реальным проектом.

## 41. Чеклист новичка Node.js

Ты готов двигаться дальше, если понимаешь:

- чем Node.js отличается от браузера;
- что такое `package.json`;
- что такое npm scripts;
- зачем нужен `node_modules`;
- зачем нужен `package-lock.json`;
- как запускать `.ts` файл через `tsx`;
- как читать файл через `fs/promises`;
- как работать с `async/await`;
- как создать простой HTTP-сервер;
- что такое REST API;
- как React может получить данные с Node API;
- почему бывает CORS;
- зачем нужны переменные окружения.

## 42. Частые ошибки новичков

Ошибка 1 - запуск npm не из корня проекта.

Решение: перед командой проверь, что рядом есть `package.json`.

Ошибка 2 - ручное редактирование `node_modules`.

Решение: зависимости меняют через npm.

Ошибка 3 - путаница между frontend и backend.

Решение: браузерный код не может напрямую читать файлы с диска, а Node.js может.

Ошибка 4 - отсутствие обработки ошибок.

Решение: используй `try/catch` и правильные HTTP-статусы.

Ошибка 5 - хранение секретов в коде.

Решение: используй `.env` и не коммить секреты.

Ошибка 6 - слишком сложная архитектура в начале.

Решение: начни с одного `server/index.ts`, потом разделяй код.

## 43. Мини-проект 1: project-info

Цель: написать Node.js-скрипт, который анализирует текущий frontend-проект.

Файл:

```text
scripts/project-info.ts
```

Функции:

1. Прочитать `package.json`.
2. Вывести имя проекта.
3. Вывести версию.
4. Вывести scripts.
5. Проверить, установлен ли React.
6. Проверить, установлен ли Vite.
7. Проверить, есть ли shadcn.

Пример вывода:

```text
Project: react-practice
Version: 0.0.0
Scripts: dev, typecheck, build, lint, format, format:check, preview
React: yes
Vite: yes
shadcn: yes
```

## 44. Мини-проект 2: простой API

Цель: создать backend на Node.js.

Endpoints:

```text
GET /api/health
GET /api/skills
POST /api/skills
```

Данные:

```ts
const skills = [
  { id: 1, title: 'Frontend' },
  { id: 2, title: 'Backend' },
  { id: 3, title: 'Node.js' },
];
```

Проверка:

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/skills
```

## 45. Мини-проект 3: подключение к React

Цель: заменить статический массив в `Home.tsx` на данные из API.

План:

1. Запустить backend на `3001`.
2. Запустить Vite на `5173`.
3. Настроить proxy в `vite.config.ts`.
4. Сделать `fetch('/api/skills')`.
5. Отобразить данные через существующий `Badge`.
6. Показать `LoadingUI` во время загрузки.
7. Показать `ErrorUI`, если запрос упал.

Так ты используешь уже существующие компоненты проекта.

## 46. Мини-проект 4: форма добавления навыка

Цель: добавить навык через UI.

Можно использовать компоненты:

- `Form`;
- `Input`;
- `Button`;
- `Card`;
- `Badge`.

Flow:

1. Пользователь вводит название навыка.
2. React отправляет `POST /api/skills`.
3. Backend валидирует `title`.
4. Backend добавляет навык.
5. React обновляет список.

Это маленький, но настоящий fullstack-сценарий.

## 47. Рекомендуемый порядок обучения

Неделя 1:

- Node.js basics;
- npm;
- modules;
- файловая система;
- scripts.

Неделя 2:

- async/await;
- HTTP;
- Express;
- REST;
- ошибки.

Неделя 3:

- API для навыков;
- подключение React;
- Vite proxy;
- формы;
- загрузка и ошибки.

Неделя 4:

- хранение в JSON;
- валидация;
- тесты;
- env;
- подготовка к базе данных.

## 48. Что добавить в проект позже

Полезные будущие улучшения:

```json
{
  "scripts": {
    "typecheck": "tsc -b",
    "server:dev": "tsx server/index.ts",
    "dev:full": "concurrently \"npm run dev\" \"npm run server:dev\""
  }
}
```

Пакеты для backend:

```bash
npm install express cors dotenv
npm install -D tsx @types/express @types/cors
```

Пакеты для одновременного запуска frontend и backend:

```bash
npm install -D concurrently
```

Но не устанавливай все сразу. Сначала пройди базовые главы и собери простой сервер.

## 49. Главная карта знаний

```text
JavaScript
  |
  +-- Browser
  |     +-- React
  |     +-- DOM
  |     +-- UI
  |     +-- fetch
  |
  +-- Node.js
        +-- npm
        +-- scripts
        +-- files
        +-- HTTP
        +-- API
        +-- databases
        +-- deploy

React project
  |
  +-- Vite runs on Node.js
  +-- npm scripts run through Node.js tooling
  +-- backend can be added with Node.js
  +-- shadcn components can build the UI for API data
```

## 50. Финальное задание курса

Собери маленькое fullstack-приложение внутри этого проекта:

Backend:

- `GET /api/skills`;
- `POST /api/skills`;
- `DELETE /api/skills/:id`;
- хранение в JSON-файле;
- валидация;
- обработка ошибок.

Frontend:

- список навыков через `Badge`;
- форма добавления через `Form`, `Input`, `Button`;
- удаление через `IconButton`;
- состояние загрузки через `LoadingUI`;
- состояние ошибки через `ErrorUI`;
- контейнер через `Card`.

Проверки:

```bash
npm run lint
npm run build
```

Если добавишь скрипт `typecheck`:

```bash
npm run typecheck
```

Когда это получится, ты уже не просто "учишь Node.js". Ты понимаешь, как Node.js становится backend-частью твоего React-проекта.

