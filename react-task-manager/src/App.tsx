import { useAppSelector } from './redux/hooks';

export function App() {
  const totalTasks = useAppSelector((state) => state.tasks.items.length);

  return <div>{totalTasks}</div>;
}
