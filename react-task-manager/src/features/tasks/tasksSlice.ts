import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { loadTasks } from './tasksStorage';
import type {
  BoardMove,
  PriorityFilter,
  StatusFilter,
  TaskDraft,
  TaskSort,
  TasksState,
} from './tasksTypes';

const initialState: TasksState = {
  items: loadTasks(),
  priorityFilter: 'All',
  searchQuery: '',
  sortBy: 'Newest',
  statusFilter: 'All',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<TaskDraft & { id: string }>) => {
        const timestamp = Date.now();

        state.items.unshift({
          id: action.payload.id,
          title: action.payload.title.trim(),
          priority: action.payload.priority,
          completed: false,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      },
      prepare: (task: TaskDraft) => ({
        payload: {
          ...task,
          id: nanoid(),
        },
      }),
    },
    updateTask: (state, action: PayloadAction<TaskDraft & { id: string }>) => {
      const task = state.items.find((item) => item.id === action.payload.id);

      if (!task) {
        return;
      }

      task.title = action.payload.title.trim();
      task.priority = action.payload.priority;
      task.updatedAt = Date.now();
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompleted: (state, action: PayloadAction<string>) => {
      const task = state.items.find((item) => item.id === action.payload);

      if (task) {
        task.completed = !task.completed;
        task.updatedAt = Date.now();
      }
    },
    setPriorityFilter: (state, action: PayloadAction<PriorityFilter>) => {
      state.priorityFilter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<TaskSort>) => {
      state.sortBy = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<StatusFilter>) => {
      state.statusFilter = action.payload;
    },
    clearCompletedTasks: (state) => {
      state.items = state.items.filter((task) => !task.completed);
    },
    moveTaskOnBoard: (state, action: PayloadAction<BoardMove>) => {
      const task = state.items.find((item) => item.id === action.payload.taskId);

      if (!task) {
        return;
      }

      task.completed = action.payload.columnId === 'Done';

      if (action.payload.columnId !== 'Done') {
        task.priority = action.payload.columnId;
      }

      task.updatedAt = Date.now();
    },
  },
});

export const {
  addTask,
  clearCompletedTasks,
  deleteTask,
  setPriorityFilter,
  setSearchQuery,
  setSortBy,
  setStatusFilter,
  moveTaskOnBoard,
  toggleTaskCompleted,
  updateTask,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
