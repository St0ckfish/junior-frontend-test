import type { DragEvent } from 'react';

import type { BoardColumnId, Task } from '../features/tasks/tasksTypes';

type KanbanBoardProps = {
  tasks: Task[];
  onMoveTask: (taskId: string, columnId: BoardColumnId) => void;
};

type BoardColumn = {
  description: string;
  id: BoardColumnId;
  title: string;
};

const columns: BoardColumn[] = [
  {
    id: 'High',
    title: 'High Focus',
    description: 'Urgent active tasks',
  },
  {
    id: 'Medium',
    title: 'In Progress',
    description: 'Normal priority work',
  },
  {
    id: 'Low',
    title: 'Later',
    description: 'Low pressure tasks',
  },
  {
    id: 'Done',
    title: 'Done',
    description: 'Completed work',
  },
];

const priorityStyles = {
  High: 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300',
  Medium:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300',
  Low: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
};

const getColumnTasks = (tasks: Task[], columnId: BoardColumnId) => {
  if (columnId === 'Done') {
    return tasks.filter((task) => task.completed);
  }

  return tasks.filter((task) => !task.completed && task.priority === columnId);
};

export function KanbanBoard({ tasks, onMoveTask }: KanbanBoardProps) {
  const handleDragStart = (event: DragEvent<HTMLDivElement>, taskId: string) => {
    event.dataTransfer.setData('text/plain', taskId);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, columnId: BoardColumnId) => {
    event.preventDefault();

    const taskId = event.dataTransfer.getData('text/plain');

    if (taskId) {
      onMoveTask(taskId, columnId);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-950 dark:text-white">
              Kanban Board
            </h2>
          </div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Move cards between columns to update priority or completion.
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {columns.map((column) => {
          const columnTasks = getColumnTasks(tasks, column.id);

          return (
            <div
              key={column.id}
              className="min-h-80 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, column.id)}
            >
              <div className="mb-3 flex items-start justify-between gap-3 px-1">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {column.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {column.description}
                  </p>
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
                  {columnTasks.length}
                </span>
              </div>

              <div className="flex min-h-64 flex-col gap-3">
                {columnTasks.length === 0 ? (
                  <div className="flex min-h-28 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/70 px-4 text-center text-sm font-semibold text-slate-400 dark:border-slate-700 dark:bg-slate-950/40">
                    Drop tasks here
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="cursor-grab rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition active:cursor-grabbing dark:border-slate-800 dark:bg-slate-950"
                      draggable
                      onDragStart={(event) => handleDragStart(event, task.id)}
                    >
                      <p
                        className={`text-sm font-extrabold ${
                          task.completed
                            ? 'text-slate-400 line-through'
                            : 'text-slate-950 dark:text-white'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-bold ${
                            priorityStyles[task.priority]
                          }`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {task.completed ? 'Completed' : 'Active'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
