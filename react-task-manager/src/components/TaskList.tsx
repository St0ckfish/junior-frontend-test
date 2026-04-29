import type { Task } from '../features/tasks/tasksTypes';
import { EmptyState } from './EmptyState';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  hasAnyTasks: boolean;
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => void;
};

export function TaskList({ hasAnyTasks, tasks, onDelete, onEdit, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState hasAnyTasks={hasAnyTasks} />;
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
