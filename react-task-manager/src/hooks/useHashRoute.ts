import { useEffect, useState } from 'react';

export type AppRoute = 'tasks' | 'board';

const getRouteFromHash = (): AppRoute => {
  if (typeof window === 'undefined') {
    return 'tasks';
  }

  return window.location.hash === '#/board' ? 'board' : 'tasks';
};

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigate = (nextRoute: AppRoute) => {
    window.location.hash = nextRoute === 'board' ? '#/board' : '#/';
  };

  return {
    navigate,
    route,
  };
}
