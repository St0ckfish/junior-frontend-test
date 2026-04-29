import { useState } from 'react';
import type { FormEvent } from 'react';

import { taskPriorities } from '../features/tasks/tasksTypes';
import type { Task, TaskDraft, TaskPriority } from '../features/tasks/tasksTypes';

type TaskFormProps = {
  editingTask: Task | null;
  onCancelEdit: () => void;
  onSubmit: (task: TaskDraft) => void;
};

const initialPriority: TaskPriority = 'Medium';

export function TaskForm({ editingTask, onCancelEdit, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(editingTask?.title ?? '');
  const [priority, setPriority] = useState<TaskPriority>(editingTask?.priority ?? initialPriority);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    onSubmit({
      title: normalizedTitle,
      priority,
    });

    if (!editingTask) {
      setTitle('');
      setPriority(initialPriority);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">Task title</span>
          <input
            className="h-11 rounded-lg border border-slate-300 px-3 text-sm text-slate-950 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Write a clear task title"
            value={title}
          />
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-semibold text-slate-700">Priority</legend>
          <div className="grid grid-cols-3 gap-2">
            {taskPriorities.map((taskPriority) => (
              <label
                key={taskPriority}
                className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                  priority === taskPriority
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <input
                  className="sr-only"
                  checked={priority === taskPriority}
                  name="priority"
                  onChange={() => setPriority(taskPriority)}
                  type="radio"
                />
                {taskPriority}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            className="h-11 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            type="submit"
          >
            {editingTask ? 'Save changes' : 'Add task'}
          </button>
          {editingTask ? (
            <button
              className="h-11 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              onClick={onCancelEdit}
              type="button"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}
