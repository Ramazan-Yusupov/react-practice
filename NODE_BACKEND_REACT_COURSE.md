# Курс Node.js для подключения backend к React-проектам

Цель курса: научиться превращать React-приложение из локального интерфейса в полноценный клиент-серверный проект. Учебный пример - список тегов: тег можно создать, удалить, перетащить в любое место, отфильтровать, настроить количество колонок и размер карточек.

## Текущая точка проекта

В проекте уже есть React + TypeScript + Vite, `useTags`, `Badge`, `Card`, `Input`, `Button`, `express`, `cors`, `tsx`, `motion`, `gsap`, `zustand`.

Сейчас теги хранятся локально через `useLocalStorage`. Это хороший первый этап, но перед backend нужно привести frontend к форме, которую потом легко подключить к API.

## Что сначала сделать на frontend

1. Расширить модель тега:

```ts
export interface ITag {
  id: string;
  label: string;
  position: number;
  createdAt?: string;
  updatedAt?: string;
}
```

2. Разделить логику тегов:

- `useTags` - временное локальное состояние и бизнес-операции.
- `tags.api.ts` - будущие запросы к backend.
- `TagBadge.tsx` - отображение одного тега.
- `TagGrid.tsx` - сетка, drag-and-drop, сортировка.
- `TagFilters.tsx` - фильтры, выбор колонок и размера карточки.

3. Добавить действия:

- `createTag(label)` - создать тег.
- `deleteTag(id)` - удалить тег.
- `reorderTags(tags)` - сохранить новый порядок.
- `clearTags()` - удалить все локально, позже можно убрать или защитить confirm.
- `setGridColumns(1..12)` - выбор количества колонок.
- `setCardSize('sm' | 'md' | 'lg' | 'xl')` - размер карточек.

4. Добавить ограничения:

- пустой тег нельзя создать;
- дубликаты по `label.toLowerCase().trim()` нельзя создать;
- максимум длины, например 24-32 символа;
- delete-кнопка не должна запускать drag;
- drag должен запускаться за отдельную иконку-ручку;
- порядок должен сохраняться после перезагрузки.

5. Добавить UI-состояния:

- пустой список;
- ошибка создания дубля;
- pending при запросе к API;
- optimistic update при drag и delete;
- rollback, если backend вернул ошибку.

## Drag-and-drop: варианты библиотек

### Вариант 1. Motion

Подходит, если нужен самый простой React-путь и плавные layout-анимации. В официальной документации `Reorder.Group` и `Reorder.Item` делают drag-to-reorder списки, а соседние элементы автоматически анимируются при изменении порядка.

Плюсы:

- уже установлен в проекте;
- хорошо дружит с React-состоянием;
- минимум кода;
- удобно анимировать появление и удаление через `AnimatePresence`.

Минусы:

- `Reorder` лучше всего подходит для одного направления, например вертикального списка;
- для полноценной сетки 1-12 колонок и сложного перемещения по grid может стать тесно.

Когда выбрать: если сначала делаем простой список/ряд тегов, а grid-перестановка несложная.

### Вариант 2. GSAP

Подходит, если важна максимальная ручная настройка анимации. В проекте уже стоят `gsap` и `@gsap/react`. Для перестановок полезен подход FLIP: сначала запоминаем позицию элементов, меняем порядок в DOM, затем плавно анимируем элементы к новой позиции.

Плюсы:

- очень мощная анимация;
- отлично подходит для сложных эффектов;
- можно анимировать grid, размеры, появление и удаление;
- есть Draggable и Flip.

Минусы:

- больше imperative-кода;
- нужно аккуратно синхронизировать DOM и React state;
- для обычной сортировки тегов это может быть избыточно.

Когда выбрать: если хочется глубоко изучать анимации и делать кастомный эффект перетаскивания.

### Вариант 3. Anime.js

Подходит как легкий animation engine. В новых версиях есть `createDraggable`, callbacks и layout-анимации.

Плюсы:

- понятный API;
- есть draggable-возможности;
- можно сделать красивую ручную анимацию.

Минусы:

- пока не установлен в проекте;
- больше работы руками для React-сортировки;
- для state-driven React UI менее удобен, чем специализированные DnD-библиотеки.

Когда выбрать: если хочешь отдельно потренировать Anime.js и не против писать больше интеграционного кода.

Установка, если выберешь:

```bash
npm install animejs
```

### Практичный вариант для этого проекта

Для реальной сетки тегов лучше всего рассмотреть `@dnd-kit/sortable` + `motion`.

`@dnd-kit` отвечает за корректный drag-and-drop, сенсоры мыши/тача/клавиатуры, collision detection и sortable grid. `motion` отвечает за приятные layout-анимации, появление и удаление.

Установка, если выберешь этот путь:

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

## UI для тегов

Badge тега должен состоять из:

- drag handle icon, например `DotsSixVertical` из `@phosphor-icons/react`;
- текст тега;
- delete button;
- `aria-label` для drag и delete;
- `data-tag-id` для тестов и анимаций.

Пример поведения:

- пользователь вводит тег и нажимает Enter или Add;
- тег появляется в конце списка;
- пользователь берет тег за drag-иконку;
- тег можно переместить в любую позицию;
- остальные теги плавно освобождают место;
- новый порядок сохраняется в `localStorage`, позже в backend.

## Фильтр и настройки

Фильтр лучше сделать отдельной панелью.

Минимальные настройки:

- поиск по названию тега;
- сортировка: `custom`, `name-asc`, `name-desc`, `created-desc`, `created-asc`;
- количество колонок: от 1 до 12;
- размер карточки: `sm`, `md`, `lg`, `xl`;
- кнопка reset.

Для колонок удобнее использовать CSS variable:

```tsx
<div
  className="grid gap-2"
  style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
>
  {tags.map(...)}
</div>
```

Для responsive можно ограничивать колонки:

- mobile: максимум 2-3;
- tablet: максимум 6;
- desktop: максимум 12.

## Что подготовить для backend

Frontend должен заранее перейти на API-образное мышление:

- все операции с тегами должны быть async;
- каждый action должен иметь loading/error состояние;
- локальный порядок тегов должен храниться как `position`;
- UI не должен зависеть от того, где лежат данные: localStorage или server;
- типы `Tag`, `CreateTagDto`, `ReorderTagsDto` должны быть рядом с API.

Пример типов:

```ts
export type Tag = {
  id: string;
  label: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateTagDto = {
  label: string;
};

export type ReorderTagsDto = {
  ids: string[];
};
```

## Backend API для учебного проекта

Минимальные endpoints:

```http
GET /api/tags
POST /api/tags
DELETE /api/tags/:id
PATCH /api/tags/reorder
```

Позже:

```http
GET /api/tags?search=react&sort=name-asc
PATCH /api/tags/:id
DELETE /api/tags
GET /api/settings
PATCH /api/settings
```

Ответы:

```ts
type ApiSuccess<T> = {
  data: T;
};

type ApiError = {
  message: string;
  code?: string;
  details?: unknown;
};
```

## Курс по Node.js

### Модуль 1. Node.js база

Цель: понять, что backend - это отдельное приложение, которое принимает HTTP-запросы и возвращает данные.

Темы:

- что такое runtime Node.js;
- npm scripts;
- CommonJS и ES Modules;
- `process.env`;
- работа с файлами;
- async/await;
- базовый HTTP-сервер.

Практика: создать простой endpoint `GET /health`.

### Модуль 2. Express

Цель: поднять API рядом с React-проектом.

Темы:

- `express()`;
- middleware;
- `cors`;
- JSON body parser;
- routes;
- controllers;
- services;
- error handler.

Практика: `GET /api/tags`, `POST /api/tags`, `DELETE /api/tags/:id`.

### Модуль 3. REST и структура данных

Цель: научиться проектировать API до написания кода.

Темы:

- resource-based routes;
- status codes;
- DTO;
- validation;
- duplicate checks;
- сортировка и фильтрация;
- pagination на будущее.

Практика: запретить дубликаты тегов и добавить `position`.

### Модуль 4. Хранение данных

Цель: перейти от массива в памяти к постоянному хранению.

Этапы:

- сначала in-memory array;
- затем JSON-файл для тренировки;
- затем база данных.

Для базы лучше выбрать один путь:

- PostgreSQL + Prisma;
- SQLite + Prisma для локальной практики;
- Supabase/Neon Postgres позже, когда понадобится облако.

Практика: теги сохраняются после перезапуска backend.

### Модуль 5. React + API

Цель: заменить `localStorage` на запросы к server.

Темы:

- `fetch`;
- `AbortController`;
- loading/error;
- optimistic update;
- rollback;
- `.env` для `VITE_API_URL`;
- единый API-клиент.

Практика: список тегов работает через backend.

### Модуль 6. Drag order sync

Цель: сохранять порядок после drag.

Темы:

- локальное изменение порядка;
- debounce сохранения;
- `PATCH /api/tags/reorder`;
- конфликт состояний;
- optimistic UI.

Практика: перетащил тег - после перезагрузки порядок остался тем же.

### Модуль 7. Settings API

Цель: сохранить настройки интерфейса.

Темы:

- количество колонок;
- размер карточки;
- сортировка;
- фильтр;
- local settings vs user settings.

Практика: настройки grid/card сохраняются.

### Модуль 8. Архитектура проекта

Цель: сделать код поддерживаемым.

Frontend:

```txt
src/features/tags/
  api/tags.api.ts
  model/types.ts
  model/useTagsStore.ts
  ui/TagBadge.tsx
  ui/TagGrid.tsx
  ui/TagFilters.tsx
```

Backend:

```txt
server/
  src/app.ts
  src/server.ts
  src/routes/tags.routes.ts
  src/controllers/tags.controller.ts
  src/services/tags.service.ts
  src/repositories/tags.repository.ts
  src/middlewares/error.middleware.ts
```

### Модуль 9. Проверки и качество

Темы:

- TypeScript strict thinking;
- ESLint;
- Prettier;
- API validation через `zod`;
- backend tests;
- frontend tests для hooks и UI;
- проверка build перед изменениями.

Практика:

```bash
npm run check
```

### Модуль 10. Production basics

Темы:

- environment variables;
- CORS whitelist;
- логирование;
- rate limit;
- auth позже;
- deployment frontend/backend;
- миграции базы;
- backup данных.

## Порядок реализации проекта

1. Привести типы тегов к `id`, `label`, `position`.
2. Убрать обязательность редактирования тега: delete + create достаточно.
3. Добавить drag handle icon в `Badge` или отдельный `TagBadge`.
4. Вынести теговую сетку в `TagGrid`.
5. Добавить выбор колонок 1-12.
6. Добавить выбор размера карточки.
7. Выбрать drag-подход: `motion`, `gsap`, `anime.js` или `@dnd-kit + motion`.
8. Сделать reorder локально.
9. Сделать API-контракт в `tags.api.ts`.
10. Поднять Express backend.
11. Переключить frontend с localStorage на API.
12. Добавить сохранение порядка и настроек.

## Мой рекомендуемый выбор

Для учебного и рабочего результата: `@dnd-kit/sortable + motion`.

Причина: drag-and-drop и сортировка - это не только анимация. Нужны сенсоры, collision detection, доступность, корректное поведение в grid и сохранение порядка. `motion` хорошо добавит плавность, а `@dnd-kit` возьмет на себя механику.

Если хочешь изучать именно анимации глубже, второй хороший путь - `GSAP Flip + Draggable`, но кода будет больше.

## Полезные ссылки

- Motion Reorder: https://motion.dev/docs/react-reorder
- GSAP Flip: https://gsap.com/docs/v3/Plugins/Flip/
- GSAP Draggable: https://gsap.com/docs/v3/Plugins/Draggable/
- Anime.js Draggable: https://animejs.com/documentation/draggable/
- dnd kit Sortable: https://docs.dndkit.com/presets/sortable
