import { useState } from 'react';

import { TaskControls } from './components/TaskControls';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
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
  setPriorityFilter,
  setSearchQuery,
  setSortBy,
  setStatusFilter,
  toggleTaskCompleted,
  updateTask,
} from './features/tasks/tasksSlice';
import type { Task, TaskDraft } from './features/tasks/tasksTypes';
import { useAppDispatch, useAppSelector } from './hooks/redux';

export function App() {
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector(selectTasks);
  const hasCompletedTasks = useAppSelector(selectHasCompletedTasks);
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
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-extrabold tracking-wide text-blue-600 uppercase">
            Redux Task Manager
          </p>
          <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">Task Manager</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
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
              <h2 className="text-sm font-extrabold text-slate-700 uppercase">Tasks</h2>
              <span className="text-sm font-semibold text-slate-500">
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
      </div>
    </main>
  );
}
