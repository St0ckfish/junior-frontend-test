import type { Task } from '../features/tasks/tasksTypes';

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => void;
};

const priorityStyles = {
  High: 'bg-red-50 text-red-700 border-red-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export function TaskItem({ task, onDelete, onEdit, onToggle }: TaskItemProps) {
  const createdDate = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
  }).format(task.createdAt);

  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <button
            aria-label={task.completed ? 'Mark task as pending' : 'Mark task as completed'}
            className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded border text-xs font-black transition ${
              task.completed
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-300 bg-white text-transparent hover:border-blue-500'
            }`}
            onClick={() => onToggle(task.id)}
            type="button"
          >
            ✓
          </button>

          <div className="min-w-0">
            <p
              className={`text-base font-bold break-words ${
                task.completed ? 'text-slate-400 line-through' : 'text-slate-950'
              }`}
            >
              {task.title}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${
                  priorityStyles[task.priority]
                }`}
              >
                {task.priority}
              </span>
              <span className="text-xs font-semibold text-slate-400">Created {createdDate}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            onClick={() => onEdit(task)}
            type="button"
          >
            Edit
          </button>
          <button
            className="rounded-md border border-red-200 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
            onClick={() => onDelete(task.id)}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
