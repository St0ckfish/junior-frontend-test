type EmptyStateProps = {
  hasAnyTasks: boolean;
};

export function EmptyState({ hasAnyTasks }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <p className="text-base font-extrabold text-slate-950">
        {hasAnyTasks ? 'No tasks match these filters' : 'No tasks yet'}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {hasAnyTasks
          ? 'Adjust search, status, priority, or sort controls to refine the list.'
          : 'Add a task with a priority to start building your work queue.'}
      </p>
    </div>
  );
}
