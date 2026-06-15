# 🐻 Полный курс по Zustand: От Установки до Мастерства

Этот курс разработан специально для твоего стека: **React/Next.js**, **TypeScript** и **Tailwind**. Мы пройдем путь от пустой папки до продвинутой архитектуры сторов.

---

## Модуль 1: Развертывание и Архитектура

### 1. Установка
В терминале твоего проекта:
```bash
npm install zustand
# или
yarn add zustand
```

### 2. Где создавать файлы?
В Junior-среде часто путают, куда класть логику. Лучшая практика для чистого кода:
- Создай папку `src/store` (или `app/store` в Next.js).
- Каждый стор — это отдельный файл (например, `useUserStore.ts`, `useProjectStore.ts`).

---

## Модуль 2: Твой первый Store (TypeScript-first)

Давай создадим стор для управления твоими коммерческими проектами (которых у тебя 7).

**Файл:** `src/store/useProjectStore.ts`
```tsx
import { create } from 'zustand';

// 1. Описываем интерфейс состояния
interface Project {
  id: number;
  title: string;
  isProduction: boolean;
}

interface ProjectState {
  projects: Project[];
  filter: 'all' | 'prod' | 'dev';
  // Методы (Actions)
  addProject: (newProject: Project) => void;
  setFilter: (filter: 'all' | 'prod' | 'dev') => void;
}

// 2. Создаем стор
export const useProjectStore = create<ProjectState>((set) => ({
  // Начальное состояние
  projects: [
    { id: 1, title: 'Unco Scanner', isProduction: true },
    { id: 2, title: 'Personal Site', isProduction: true },
  ],
  filter: 'all',

  // Изменение состояния
  addProject: (newProject) => 
    set((state) => ({ projects: [...state.projects, newProject] })),

  setFilter: (newFilter) => 
    set({ filter: newFilter }),
}));
```

### 💡 Как это работает (How it works):
- **`create<T>`**: Мы передаем интерфейс, чтобы TS подсказывал нам ключи внутри стора.
- **`set`**: Функция для обновления. Она сливает (merge) объекты, поэтому тебе не нужно копировать весь стор через `...state` для простых полей, но для массивов — обязательно.
- **Без провайдеров**: Заметил? Нам не нужен `<Provider>` в `layout.tsx`. Стор импортируется как обычный хук.

---

## Модуль 3: Использование в компонентах (Tailwind & TS)

**Файл:** `src/components/ProjectList.tsx`
```tsx
import { useProjectStore } from '../store/useProjectStore';

export const ProjectList = () => {
  // Селектор: берем только нужные данные
  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);

  const handleAdd = () => {
    addProject({
      id: Date.now(),
      title: 'New Commercial Project',
      isProduction: false
    });
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Мои проекты</h2>
      <ul className="space-y-2 mb-4">
        {projects.map((p) => (
          <li key={p.id} className="p-2 border border-slate-700 rounded hover:bg-slate-800 transition-colors">
            {p.title} {p.isProduction ? '✅' : '🛠️'}
          </li>
        ))}
      </ul>
      <button 
        onClick={handleAdd}
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 active:scale-95 transition-all"
      >
        Добавить проект
      </button>
    </div>
  );
};
```

---

## Модуль 4: Группировка: Селекторы и Оптимизация

**Важно:** Никогда не делай так: `const state = useProjectStore()`. Это заставит компонент перерендериваться при любом чихе в сторе.

**Правильно (Группировка по смыслу):**
```tsx
// Группируем выборку
const { projects, filter } = useProjectStore((state) => ({
  projects: state.projects,
  filter: state.filter
}));
```

---

## 🛠 Практическое задание №1:
1. Создай новый файл `useAnimationStore.tsx`.
2. Добавь в него состояние `staggerDelay` (число) и метод `updateDelay`.
3. Реализуй компонент с использованием **Tailwind**, где кнопка увеличивает задержку анимации для списка элементов.

---

## Модуль 5: Ошибки и Решения (Junior Guide)

**Частые ошибки:**
1. **Забыли `()` вокруг объекта в `set`**:
   - *Ошибка:* `set(state => { projects: [] })` (Вернет undefined)
   - *Исправление:* `set(state => ({ projects: [] }))`
2. **Мутация массива**:
   - *Ошибка:* `state.projects.push(item)` (Zustand не увидит изменений)
   - *Исправление:* Используй деструктуризацию `[...state.projects, item]`.

**Совет по архитектуре:**
Если проект большой, разделяй сторы. Не делай один "GlobalStore" на 2000 строк. Zustand позволяет создавать их сотнями — они легкие.
