import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectPriorityFilter = (state: RootState) => state.tasks.priorityFilter;
export const selectSearchQuery = (state: RootState) => state.tasks.searchQuery;
export const selectSortBy = (state: RootState) => state.tasks.sortBy;
export const selectStatusFilter = (state: RootState) => state.tasks.statusFilter;

const priorityWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export const selectFilteredTasks = createSelector(
  [selectTasks, selectPriorityFilter, selectSearchQuery, selectSortBy, selectStatusFilter],
  (tasks, priorityFilter, searchQuery, sortBy, statusFilter) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return tasks
      .filter((task) => {
        const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
        const matchesStatus =
          statusFilter === 'All' ||
          (statusFilter === 'Completed' ? task.completed : !task.completed);
        const matchesSearch =
          normalizedQuery.length === 0 || task.title.toLowerCase().includes(normalizedQuery);

        return matchesPriority && matchesStatus && matchesSearch;
      })
      .toSorted((firstTask, secondTask) => {
        if (sortBy === 'Priority') {
          return priorityWeight[secondTask.priority] - priorityWeight[firstTask.priority];
        }

        if (sortBy === 'Oldest') {
          return firstTask.createdAt - secondTask.createdAt;
        }

        return secondTask.createdAt - firstTask.createdAt;
      });
  },
);

export const selectTaskStats = createSelector([selectTasks], (tasks) => {
  const completed = tasks.filter((task) => task.completed).length;
  const highPriority = tasks.filter((task) => task.priority === 'High' && !task.completed).length;

  return {
    total: tasks.length,
    completed,
    highPriority,
    pending: tasks.length - completed,
  };
});

export const selectHasCompletedTasks = createSelector([selectTasks], (tasks) =>
  tasks.some((task) => task.completed),
);
