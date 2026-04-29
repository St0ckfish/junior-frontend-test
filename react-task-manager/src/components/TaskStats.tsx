type TaskStatsProps = {
  completed: number;
  highPriority: number;
  pending: number;
  total: number;
};

export function TaskStats({ completed, highPriority, pending, total }: TaskStatsProps) {
  const stats = [
    { label: 'Total', value: total },
    { label: 'Pending', value: pending },
    { label: 'Completed', value: completed },
    { label: 'High Priority', value: highPriority },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="text-xs font-bold text-slate-500 uppercase dark:text-slate-400">
            {stat.label}
          </p>
          <p className="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
