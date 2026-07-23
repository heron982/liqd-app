import { useCallback, useState } from 'react';

/** Tracks pull-to-refresh only — silent refetches (focus/invalidation) stay invisible. */
export function useManualRefresh(refetch: () => Promise<unknown>) {
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return { refreshing, refresh };
}
