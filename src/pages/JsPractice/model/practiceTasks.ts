export type TaskLevel = 'easy' | 'medium' | 'hard' | 'expert';

export type TaskFilter = 'all' | 'active' | 'completed';

export type PracticeTask = {
  id: string;
  title: string;
  topic: string;
  level: TaskLevel;
  done: boolean;
  estimatedTime?: number;
};

export const practiceTasks: PracticeTask[] = [
  {
    id: 'task-1',
    title: 'Повторить map',
    topic: 'Массивы',
    level: 'easy',
    done: true,
    estimatedTime: 5,
  },
  {
    id: 'task-2',
    title: 'Отфильтровать выполненные задачи',
    topic: 'Массивы',
    level: 'medium',
    done: false,
    estimatedTime: 10,
  },
  {
    id: 'task-3',
    title: 'Посчитать количество задач через reduce',
    topic: 'Массивы',
    level: 'medium',
    done: false,
    estimatedTime: 15,
  },
  {
    id: 'task-4',
    title: 'Найти задачу по id',
    topic: 'Методы массивов',
    level: 'hard',
    done: false,
    estimatedTime: 20,
  },
  {
    id: 'task-5',
    title: 'Объединить массивы',
    topic: 'Массивы',
    level: 'medium',
    done: false,
    estimatedTime: 25,
  },
  {
    id: 'task-6',
    title: 'Сортировать массивы',
    topic: 'Методы массивов',
    level: 'expert',
    done: false,
    estimatedTime: 30,
  },
];

export const levelLabels: Record<TaskLevel, string> = {
  easy: 'Легкий',
  medium: 'Средний',
  hard: 'Сложный',
  expert: 'Эксперт',
};

export const levelColors: Record<TaskLevel, 'green' | 'yellow' | 'red' | 'blue'> = {
  easy: 'green',
  medium: 'yellow',
  hard: 'blue',
  expert: 'red',
};
