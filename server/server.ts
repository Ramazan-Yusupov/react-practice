import express, { type Request, type Response } from 'express';
import cors from 'cors';

// ---------- Интерфейсы ----------

interface User {
  id: number;
  name: string;
}

interface Task {
  id: number;
  userId: number;
  title: string;
  done: boolean;
}

// ---------- Инициализация ----------

const app = express();
app.use(cors());
app.use(express.json());

// ---------- "База данных" в памяти ----------

const users: User[] = [
  { id: 1, name: 'Рамазан' },
  { id: 2, name: 'Алина' },
  { id: 3, name: 'Марат' },
];

const tasks: Task[] = [
  { id: 1, userId: 1, title: 'Выучить useQuery', done: true },
  { id: 2, userId: 1, title: 'Разобрать инвалидацию кэша', done: false },
  { id: 3, userId: 2, title: 'Настроить useMutation', done: false },
  { id: 4, userId: 2, title: 'Сделать пагинацию', done: false },
  { id: 5, userId: 3, title: 'Optimistic update для лайков', done: false },
];
let nextTaskId: number = tasks.length + 1;

// Добавим ещё задач, чтобы было удобно тестировать пагинацию/infinite query
for (let i = 6; i <= 42; i++) {
  tasks.push({
    id: i,
    userId: (i % 3) + 1,
    title: `Задача №${i}`,
    done: Math.random() > 0.7,
  });
  nextTaskId = i + 1;
}

// ---------- Вспомогательные штуки для "реалистичности" ----------

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Если в query передать ?fail=true — эндпоинт с шансом 100% вернёт 500.
// Это удобно, чтобы руками потестировать retry / onError в React Query.
function maybeFail(req: Request, res: Response) {
  if (req.query.fail === 'true') {
    res.status(500).json({ message: 'Симулированная серверная ошибка' });
    return true;
  }
  return false;
}

// ---------- USERS ----------

app.get('/api/users', async (req, res) => {
  await delay(400);
  res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
  await delay(300);
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  res.json(user);
});

// ---------- TASKS (основной ресурс для практики) ----------

// GET /api/tasks?page=1&limit=10&search=react&userId=1
app.get('/api/tasks', async (req, res) => {
  await delay(500);
  if (maybeFail(req, res)) return;

  const { page = '1', limit = '10', search = '', userId } = req.query;
  let result = tasks;

  if (userId) {
    result = result.filter((t) => t.userId === Number(userId));
  }
  if (search) {
    result = result.filter((t) => t.title.toLowerCase().includes(String(search).toLowerCase()));
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const start = (pageNum - 1) * limitNum;
  const paginated = result.slice(start, start + limitNum);

  res.json({
    data: paginated,
    page: pageNum,
    limit: limitNum,
    total: result.length,
    hasMore: start + limitNum < result.length,
  });
});

app.get('/api/tasks/:id', async (req, res) => {
  await delay(300);
  if (maybeFail(req, res)) return;

  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: 'Задача не найдена' });
  res.json(task);
});

app.post('/api/tasks', async (req, res) => {
  await delay(500);
  if (maybeFail(req, res)) return;

  const { title, userId } = req.body;
  if (!title || !userId) {
    return res.status(400).json({ message: 'title и userId обязательны' });
  }

  const newTask = { id: nextTaskId++, userId: Number(userId), title, done: false };
  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', async (req, res) => {
  await delay(400);
  if (maybeFail(req, res)) return;

  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: 'Задача не найдена' });

  Object.assign(task, req.body);
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await delay(400);
  if (maybeFail(req, res)) return;

  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Задача не найдена' });

  tasks.splice(index, 1);
  res.status(204).end();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Учебный API запущен: http://localhost:${PORT}`);
});
