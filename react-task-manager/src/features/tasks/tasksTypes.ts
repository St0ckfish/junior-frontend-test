export const taskPriorities = ['High', 'Medium', 'Low'] as const;

export type TaskPriority = (typeof taskPriorities)[number];
export type PriorityFilter = TaskPriority | 'All';
export type StatusFilter = 'All' | 'Active' | 'Completed';
export type TaskSort = 'Newest' | 'Oldest' | 'Priority';

export type Task = {
  id: string;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};

export type TasksState = {
  items: Task[];
  priorityFilter: PriorityFilter;
  searchQuery: string;
  sortBy: TaskSort;
  statusFilter: StatusFilter;
};

export type TaskDraft = {
  title: string;
  priority: TaskPriority;
};
