import express from 'express';
import cors from 'cors';
import type { Task } from './types';

const app = express();
const tasks: Task[] = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  { id: 3, title: 'Task 3', completed: false },
];

app.use(express.json());
app.use(cors());

app.get('/api/tasks', (_req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const title = String(req.body.title ?? '').trim();

  if (!title) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const task: Task = {
    id: tasks.length + 1,
    title,
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
