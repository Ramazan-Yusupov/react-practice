import { practiceTasks, type PracticeTask, type TaskFilter } from './practiceTasks';
import type { CreateTaskValues } from './taskSchema';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'В работе' },
  { value: 'completed', label: 'Выполнено' },
];

export function usePracticeTask() {
  const [filter, setFilter] = useLocalStorage<TaskFilter>('filter', 'all') as [
    TaskFilter,
    (value: TaskFilter) => void,
  ];
  const [tasks, setTasks] = useLocalStorage<PracticeTask[]>('tasks', practiceTasks) as [
    PracticeTask[],
    (value: PracticeTask[] | ((prevValue: PracticeTask[]) => PracticeTask[])) => void,
  ];

  const filteredTasks = tasks.filter((task: PracticeTask) => {
    if (filter === 'active') {
      return !task.done;
    }
    if (filter === 'completed') {
      return task.done;
    }
    return true;
  });

  const completedCount = tasks.reduce((count: number, task: PracticeTask) => {
    return task.done ? count + 1 : count;
  }, 0);

  const activeCount = tasks.length - completedCount;

  const progressPercent =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (taskId: string) => {
    setTasks((currentTasks: PracticeTask[]) =>
      currentTasks.map((task: PracticeTask) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const resetProgress = () => {
    setTasks((currentTasks: PracticeTask[]) =>
      currentTasks.map((task: PracticeTask) => ({
        ...task,
        done: false,
      })),
    );
    setFilter('all');
  };

  const deleteTask = (taskId: string) => {
    setTasks((currentTasks: PracticeTask[]) =>
      currentTasks.filter((task: PracticeTask) => task.id !== taskId),
    );
  };

  const addTask = (taskData: CreateTaskValues) => {
    setTasks((currentTasks: PracticeTask[]) => [
      {
        id: crypto.randomUUID(),
        title: taskData.title,
        topic: taskData.topic,
        level: taskData.level,
        estimatedTime: taskData.estimatedTime,
        done: false,
      },
      ...currentTasks,
    ]);
    setFilter('all');
  };

  return {
    filter,
    filters,
    setFilter,
    tasks,
    setTasks,
    toggleTask,
    resetProgress,
    filteredTasks,
    completedCount,
    deleteTask,
    activeCount,
    progressPercent,
    addTask,
  };
}
