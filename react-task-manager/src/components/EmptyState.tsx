type EmptyStateProps = {
  hasAnyTasks: boolean;
};

export function EmptyState({ hasAnyTasks }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-base font-extrabold text-slate-950 dark:text-white">
        {hasAnyTasks ? 'No tasks match these filters' : 'No tasks yet'}
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {hasAnyTasks
          ? 'Adjust search, status, priority, or sort controls to refine the list.'
          : 'Add a task with a priority to start building your work queue.'}
      </p>
    </div>
  );
}
