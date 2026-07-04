import { Badge, Button, Card } from '@/shared/ui';
import { levelColors, levelLabels } from './model/practiceTasks';
import { usePracticeTask } from './model/usePracticeTask';
import { FaTrash } from 'react-icons/fa6';
import { TaskForm } from './ui/TaskForm';

export function JsPractice() {
  const {
    filters,
    filter,
    tasks,
    addTask,
    completedCount,
    activeCount,
    progressPercent,
    filteredTasks,
    setFilter,
    resetProgress,
    toggleTask,
    deleteTask,
  } = usePracticeTask();

  return (
    <section className="flex justify-between gap-3">
      <div className="space-y-6 max-w-5xl w-full">
        <TaskForm onCreateTask={addTask} />
      </div>
      <div className="space-y-6">
        <Card className="border border-white/10 bg-white/3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold">Общий прогресс</p>
              <p className="text-sm text-gray-400">
                Выполнено {completedCount} из {tasks.length} задач
              </p>
            </div>
            <Badge text={`${progressPercent}%`} color="blue" />
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge text="Всего" count={tasks.length} color="blue" />
              <Badge text="В работе" count={activeCount} color="yellow" />
              <Badge text="Выполнено" count={completedCount} color="green" />
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={resetProgress}
              disabled={completedCount === 0}
            >
              Сбросить прогресс
            </Button>
          </div>
        </Card>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <Button
              key={item.value}
              size="sm"
              variant={filter === item.value ? 'primary' : 'ghost'}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        {filteredTasks.length === 0 ? (
          <Card className="border border-dashed border-white/20 text-center text-gray-400">
            По этому фильтру задач пока нет.
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-3 overflow-y-auto max-h-[calc(100vh-450px)] scrollbar-none">
            {filteredTasks.map((task) => (
              <Card key={task.id} borderColor={levelColors[task.level]} border="2px">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <p className="max-w-65 truncate text-lg font-semibold" title={task.title}>
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-400">{task.topic}</p>
                  </div>
                  <Badge color={levelColors[task.level]} text={levelLabels[task.level]} />
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className={task.done ? 'text-green-400' : 'text-yellow-400'}>
                    {task.done ? '✓ Выполнено' : '○ В работе'}
                  </span>
                  <span className="font-medium text-slate-500">
                    {task.estimatedTime ? `⏱ ${task.estimatedTime} мин` : '⏱ Время не указано'}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <Button
                    size="sm"
                    variant={task.done ? 'ghost' : 'outline'}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.done ? 'Вернуть в работу' : 'Отметить выполненной'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"

                    icon={<FaTrash className="h-4 w-4" color="red" />}
                    onClick={() => deleteTask(task.id)}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
