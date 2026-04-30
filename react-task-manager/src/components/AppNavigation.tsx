import type { AppRoute } from '../hooks/useHashRoute';

type AppNavigationProps = {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
};

const links: Array<{ label: string; route: AppRoute }> = [
  { label: 'Tasks', route: 'tasks' },
  { label: 'Board', route: 'board' },
];

export function AppNavigation({ activeRoute, onNavigate }: AppNavigationProps) {
  return (
    <nav className="flex rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950">
      {links.map((link) => (
        <button
          key={link.route}
          className={`rounded-md px-3 py-2 text-sm font-extrabold transition ${
            activeRoute === link.route
              ? 'bg-slate-950 text-white dark:bg-blue-600'
              : 'text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
          }`}
          onClick={() => onNavigate(link.route)}
          type="button"
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
}
