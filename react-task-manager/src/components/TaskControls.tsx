import { taskPriorities } from '../features/tasks/tasksTypes';
import type { PriorityFilter, StatusFilter, TaskSort } from '../features/tasks/tasksTypes';

type TaskControlsProps = {
  hasCompletedTasks: boolean;
  priorityFilter: PriorityFilter;
  searchQuery: string;
  sortBy: TaskSort;
  statusFilter: StatusFilter;
  onClearCompleted: () => void;
  onPriorityChange: (priority: PriorityFilter) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sortBy: TaskSort) => void;
  onStatusChange: (status: StatusFilter) => void;
};

const priorityFilters: PriorityFilter[] = ['All', ...taskPriorities];
const statusFilters: StatusFilter[] = ['All', 'Active', 'Completed'];
const sortOptions: TaskSort[] = ['Newest', 'Oldest', 'Priority'];

export function TaskControls({
  hasCompletedTasks,
  priorityFilter,
  searchQuery,
  sortBy,
  statusFilter,
  onClearCompleted,
  onPriorityChange,
  onSearchChange,
  onSortChange,
  onStatusChange,
}: TaskControlsProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Search tasks
          </span>
          <input
            className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 transition outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-blue-950"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Filter by title"
            value={searchQuery}
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Priority</span>
          <div className="grid grid-cols-2 gap-2">
            {priorityFilters.map((filter) => (
              <button
                key={filter}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  priorityFilter === filter
                    ? 'bg-slate-950 text-white dark:bg-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
                onClick={() => onPriorityChange(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status</span>
            <select
              className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-950"
              onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
              value={statusFilter}
            >
              {statusFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Sort by
            </span>
            <select
              className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-950"
              onChange={(event) => onSortChange(event.target.value as TaskSort)}
              value={sortBy}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          className="h-10 rounded-lg border border-red-200 px-3 text-sm font-bold text-red-700 transition enabled:hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:text-red-300 dark:enabled:hover:bg-red-950"
          disabled={!hasCompletedTasks}
          onClick={onClearCompleted}
          type="button"
        >
          Clear completed
        </button>
      </div>
    </section>
  );
}
