import { useState } from 'react';

import { AppNavigation } from './components/AppNavigation';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskControls } from './components/TaskControls';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { ThemeToggle } from './components/ThemeToggle';
import { selectIsDarkMode } from './features/preferences/preferencesSelectors';
import { toggleTheme } from './features/preferences/preferencesSlice';
import {
  selectHasCompletedTasks,
  selectFilteredTasks,
  selectPriorityFilter,
  selectSearchQuery,
  selectSortBy,
  selectStatusFilter,
  selectTaskStats,
  selectTasks,
} from './features/tasks/tasksSelectors';
import {
  addTask,
  clearCompletedTasks,
  deleteTask,
  moveTaskOnBoard,
  setPriorityFilter,
  setSearchQuery,
  setSortBy,
  setStatusFilter,
  toggleTaskCompleted,
  updateTask,
} from './features/tasks/tasksSlice';
import type { Task, TaskDraft } from './features/tasks/tasksTypes';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { useHashRoute } from './hooks/useHashRoute';

export function App() {
  const dispatch = useAppDispatch();
  const { navigate, route } = useHashRoute();
  const allTasks = useAppSelector(selectTasks);
  const hasCompletedTasks = useAppSelector(selectHasCompletedTasks);
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const tasks = useAppSelector(selectFilteredTasks);
  const priorityFilter = useAppSelector(selectPriorityFilter);
  const searchQuery = useAppSelector(selectSearchQuery);
  const sortBy = useAppSelector(selectSortBy);
  const stats = useAppSelector(selectTaskStats);
  const statusFilter = useAppSelector(selectStatusFilter);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSubmitTask = (taskDraft: TaskDraft) => {
    if (editingTask) {
      dispatch(updateTask({ ...taskDraft, id: editingTask.id }));
      setEditingTask(null);
      return;
    }

    dispatch(addTask(taskDraft));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));

    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : undefined}>
      <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 transition-colors sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <header className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-extrabold tracking-wide text-blue-600 uppercase dark:text-blue-400">
                Redux Task Manager
              </p>
              <div className="flex items-center gap-2">
                <AppNavigation activeRoute={route} onNavigate={navigate} />
                <ThemeToggle isDarkMode={isDarkMode} onToggle={() => dispatch(toggleTheme())} />
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white">
                  Task Manager
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Manage priorities, update tasks in place, and keep your work saved locally.
                </p>
              </div>
            </div>
          </header>

          <TaskStats
            completed={stats.completed}
            highPriority={stats.highPriority}
            pending={stats.pending}
            total={stats.total}
          />

          {route === 'board' ? (
            <KanbanBoard
              tasks={allTasks}
              onMoveTask={(taskId, columnId) => dispatch(moveTaskOnBoard({ taskId, columnId }))}
            />
          ) : (
            <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
              <div className="flex flex-col gap-4">
                <TaskForm
                  key={editingTask?.id ?? 'new-task'}
                  editingTask={editingTask}
                  onCancelEdit={() => setEditingTask(null)}
                  onSubmit={handleSubmitTask}
                />
                <TaskControls
                  hasCompletedTasks={hasCompletedTasks}
                  priorityFilter={priorityFilter}
                  searchQuery={searchQuery}
                  sortBy={sortBy}
                  statusFilter={statusFilter}
                  onClearCompleted={() => {
                    dispatch(clearCompletedTasks());
                    setEditingTask(null);
                  }}
                  onPriorityChange={(filter) => dispatch(setPriorityFilter(filter))}
                  onSearchChange={(query) => dispatch(setSearchQuery(query))}
                  onSortChange={(sort) => dispatch(setSortBy(sort))}
                  onStatusChange={(status) => dispatch(setStatusFilter(status))}
                />
              </div>

              <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-sm font-extrabold text-slate-700 uppercase dark:text-slate-300">
                    Tasks
                  </h2>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Showing {tasks.length} of {allTasks.length}
                  </span>
                </div>
                <TaskList
                  hasAnyTasks={allTasks.length > 0}
                  tasks={tasks}
                  onDelete={handleDeleteTask}
                  onEdit={setEditingTask}
                  onToggle={(id) => dispatch(toggleTaskCompleted(id))}
                />
              </section>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
