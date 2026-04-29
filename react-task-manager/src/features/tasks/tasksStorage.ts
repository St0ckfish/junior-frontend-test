import type { Task } from './tasksTypes';

const TASKS_STORAGE_KEY = 'react-task-manager:tasks';

const isBrowser = typeof window !== 'undefined';

export const loadTasks = (): Task[] => {
  if (!isBrowser) {
    return [];
  }

  try {
    const storedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY);
    const parsedTasks = storedTasks ? (JSON.parse(storedTasks) as Task[]) : [];

    return parsedTasks.map((task) => ({
      ...task,
      createdAt: task.createdAt ?? Date.now(),
      updatedAt: task.updatedAt ?? task.createdAt ?? Date.now(),
    }));
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};
