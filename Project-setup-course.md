# Настройки проекта для React: ESLint, Prettier, Vite и рабочие скрипты

## 1. Зачем вообще настраивать проект

В небольшом проекте можно писать код почти без правил, но в командной разработке это быстро приводит к проблемам:

- у каждого свой стиль кода
- появляются случайные ошибки
- проект собирается локально, но падает у другого разработчика
- сложно поддерживать одинаковое качество кода

Поэтому в проектах обычно настраивают:

- `ESLint` для проверки кода
- `Prettier` для форматирования
- `TypeScript` проверки типов
- `Vite` конфиг для сборки и алиасов
- скрипты в `package.json` для единых команд
- `CI` проверки для автоматического контроля

---

## 2. Что обычно настраивают в крупных проектах

Базовый набор чаще всего такой:

- `eslint`
- `prettier`
- `.prettierignore`
- `.eslintignore` или ignore внутри flat config
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `env` переменные
- `npm scripts` для проверок
- `husky` и `lint-staged` для pre-commit
- `GitHub Actions` для автоматических проверок

Для этого проекта самый полезный старт:

- усилить `eslint`
- добавить `prettier`
- добавить `format` и `format:check`
- добавить `type-check`
- настроить alias в `vite` и `tsconfig`
- добавить единый `check` script

---

## 3. ESLint: зачем нужен и что обычно настраивают

`ESLint` проверяет код и помогает находить:

- неиспользуемые переменные
- потенциальные ошибки
- проблемы в React hooks
- плохие импорты
- нарушения правил команды

### Что часто используют в проектах

- базовые правила `@eslint/js`
- `typescript-eslint`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- иногда `eslint-plugin-import`
- иногда `eslint-plugin-unused-imports`
- иногда `eslint-plugin-jsx-a11y`

### Минимум для этого проекта

У тебя уже есть база на `React + TypeScript`, поэтому полезно иметь:

- проверку `ts/tsx`
- правила для hooks
- запрет лишних переменных
- игнор `dist`, `node_modules`

### Что полезно добавить в крупных проектах

- `no-console` как `warn` или `error`
- `eqeqeq`
- `curly`
- `no-debugger`
- `unused-imports`
- контроль порядка импортов

### Пример идей для правил

```js
rules: {
  "no-console": "warn",
  "no-debugger": "error",
  "eqeqeq": ["error", "always"],
  "curly": ["error", "all"]
}
```

### Полезные команды

```bash
npm run lint
```

Если хочешь уметь исправлять часть проблем автоматически, часто добавляют:

```json
"lint:fix": "eslint . --fix"
```

---

## 4. Prettier: зачем нужен и что обычно настраивают

`Prettier` не ищет логические ошибки. Он отвечает за единый стиль кода:

- отступы
- кавычки
- запятые
- длину строк
- переносы

Это очень полезно в команде, потому что:

- код у всех выглядит одинаково
- меньше споров о стиле
- ревью становится проще

### Что обычно добавляют

Файл `.prettierrc`

Пример:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

### Полезный `.prettierignore`

Обычно туда добавляют:

```txt
dist
node_modules
coverage
package-lock.json
```

### Полезные команды

```json
"format": "prettier . --write",
"format:check": "prettier . --check"
```

Что делают:

- `npm run format` форматирует файлы
- `npm run format:check` только проверяет форматирование

Именно `format:check` очень часто используют в крупных проектах и в `CI`.

---

## 5. ESLint и Prettier вместе

Это важный момент:

- `ESLint` отвечает за качество и правила кода
- `Prettier` отвечает за внешний вид кода

Обычно их не смешивают.

Хорошая практика:

- `ESLint` для ошибок и правил
- `Prettier` для форматирования

### Полезный набор команд

```json
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"format": "prettier . --write",
"format:check": "prettier . --check"
```

---

## 6. TypeScript: что полезно проверять

Даже если проект уже на `TypeScript`, полезно вынести отдельную команду для проверки типов.

### Почему это важно

Иногда:

- линтер молчит
- проект еще не запущен
- но типы уже сломаны

### Полезная команда

```json
"type-check": "tsc --noEmit"
```

Что делает:

- запускает проверку типов
- не создает сборку

Это очень полезно:

- локально
- в `CI`
- перед `pull request`

---

## 7. Vite config: что в нем обычно настраивают

`vite.config.ts` часто используют не только для запуска dev-сервера, но и для инфраструктуры проекта.

### Что полезно настроить

#### 1. Alias

Очень частая практика в больших проектах:

```ts
resolve: {
  alias: {
    '@': '/src',
  },
}
```

Это позволяет писать:

```ts
import { Box } from '@/shared/ui/Box/Box';
```

вместо длинных относительных путей:

```ts
import { Box } from '../../../shared/ui/Box/Box';
```

#### 2. plugins

Обычно в `Vite` уже подключают:

- `react()`
- иногда плагины для `svgr`
- иногда `vite-tsconfig-paths`

#### 3. server

Для локальной разработки иногда настраивают:

```ts
server: {
  port: 3000,
  open: true,
}
```

Это не обязательно, но удобно.

#### 4. build

В крупных проектах иногда дополнительно настраивают:

- `sourcemap`
- `outDir`
- `chunkSizeWarningLimit`

Пример:

```ts
build: {
  sourcemap: true,
}
```

---

## 8. Alias нужно настроить не только в Vite

Это частая ошибка новичков:

- alias добавили в `vite.config.ts`
- а `TypeScript` про него не знает

Поэтому alias нужно дублировать в `tsconfig`.

### Пример для `tsconfig`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Тогда:

- `Vite` понимает alias
- `TypeScript` тоже понимает alias
- редактор правильно подсказывает импорты

---

## 9. Какие scripts полезно иметь в package.json

Для текущего проекта хороший набор скриптов был бы таким:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier . --write",
  "format:check": "prettier . --check",
  "type-check": "tsc --noEmit",
  "check": "npm run lint && npm run type-check && npm run build"
}
```

### Что здесь особенно полезно

- `lint` — обычная проверка линтером
- `lint:fix` — автоисправление части ошибок
- `format` — форматирование
- `format:check` — проверка без изменений
- `type-check` — отдельная проверка типов
- `check` — единая команда для локальной полной проверки

---

## 10. Что полезно запускать в CI

Для командной разработки хороший минимум:

```bash
npm ci
npm run format:check
npm run lint
npm run type-check
npm run build
```

### Почему именно так

- `npm ci` ставит зависимости строго по lock-файлу
- `format:check` проверяет единый стиль кода
- `lint` проверяет правила качества
- `type-check` ловит ошибки типов
- `build` подтверждает, что проект реально собирается

Это очень близко к тому, как устроены реальные фронтенд-проекты в командах.

---

## 11. Что обычно добавляют еще

### 1. Husky

Позволяет запускать проверки перед коммитом.

Например:

- `lint-staged`
- `format` только для измененных файлов

### 2. lint-staged

Полезно, чтобы перед коммитом запускались проверки только по измененным файлам.

Например:

```json
"lint-staged": {
  "*.{js,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,scss,css}": [
    "prettier --write"
  ]
}
```

### 3. EditorConfig

Файл `.editorconfig` помогает синхронизировать:

- отступы
- тип переноса строк
- кодировку

Это тоже часто используют в крупных проектах.

Пример:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
```

---

## 12. Какие настройки особенно полезны для этого проекта

Для текущего `React + Vite + TypeScript` проекта я бы рекомендовал в первую очередь:

1. Добавить `Prettier`
2. Добавить `format` и `format:check`
3. Добавить `type-check`
4. Добавить `check`
5. Настроить alias `@`
6. Проверять все это в `CI`

Это даст:

- единый стиль кода
- меньше случайных ошибок
- удобнее импорты
- понятную команду полной проверки

---

## 13. Практический минимум для проекта

Если хочется не перегружать проект, но сделать его более взрослым, хватит такого набора.

### Установки

```bash
npm install -D prettier
```

Опционально позже:

```bash
npm install -D husky lint-staged
```

### Файлы

Добавить:

- `.prettierrc`
- `.prettierignore`
- при желании `.editorconfig`

### Скрипты

Добавить в `package.json`:

```json
"lint:fix": "eslint . --fix",
"format": "prettier . --write",
"format:check": "prettier . --check",
"type-check": "tsc --noEmit",
"check": "npm run lint && npm run type-check && npm run build"
```

### В CI запускать

```bash
npm ci
npm run format:check
npm run lint
npm run type-check
npm run build
```

---

## 14. Какой набор считается хорошим стартом

Если коротко, для нормальной современной разработки хватит такого:

- `ESLint`
- `Prettier`
- `TypeScript type-check`
- alias в `Vite` и `tsconfig`
- `check` script
- `CI` с `format:check`, `lint`, `type-check`, `build`

Это уже не просто учебный проект, а проект с нормальной инженерной базой.

---

## 15. Итог

В крупных проектах важны не только компоненты и логика, но и инфраструктура разработки.

Самые полезные улучшения для этого репозитория:

- `Prettier` для единообразного форматирования
- `format:check` для автоматической проверки стиля
- `type-check` для контроля типов
- `check` как общая команда проверки
- alias в `vite.config.ts` и `tsconfig`
- `CI`, который проверяет проект автоматически

---

## 16. Мини-шпаргалка

### Полезные dev-зависимости

```bash
npm install -D prettier
```

Позже:

```bash
npm install -D husky lint-staged
```

### Полезные scripts

```json
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"format": "prettier . --write",
"format:check": "prettier . --check",
"type-check": "tsc --noEmit",
"check": "npm run lint && npm run type-check && npm run build"
```

### Полезные CI шаги

```bash
npm ci
npm run format:check
npm run lint
npm run type-check
npm run build
```

### Самое важное

- `ESLint` проверяет качество кода
- `Prettier` форматирует код
- `type-check` проверяет типы
- `build` подтверждает, что проект собирается
- `CI` автоматизирует все эти проверки
