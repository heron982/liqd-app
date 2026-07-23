import { useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { getErrorMessage } from '@/modules/shared/library/api-client/api-error';
import { loadDashboardUseCase, logoutUseCase } from '@/modules/shared/library/composition';
import { queryKeys } from '@/modules/shared/library/query/query-keys';
import { useManualRefresh } from '@/modules/shared/library/query/use-manual-refresh';
import { useRefreshOnFocus } from '@/modules/shared/library/query/use-refresh-on-focus';
import { useAuthStore } from '@/modules/auth/stores/auth-store';

export function useHomePageViewModel() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const query = useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => loadDashboardUseCase.execute(),
  });

  useRefreshOnFocus(query.refetch);
  const { refreshing, refresh } = useManualRefresh(query.refetch);

  async function logout() {
    await logoutUseCase.execute();
    queryClient.clear();
    router.replace('/(auth)/login');
  }

  return {
    user,
    wallet: query.data?.wallet ?? null,
    market: query.data?.market ?? null,
    lastUpdatedAt: query.dataUpdatedAt ? new Date(query.dataUpdatedAt) : null,
    loading: query.isPending,
    refreshing,
    error: query.error
      ? getErrorMessage(query.error, 'Não foi possível carregar seus dados.')
      : null,
    refresh,
    logout,
    goToTrade: () => router.push('/(app)/trade'),
    goToTransactions: () => router.push('/(app)/transactions'),
  };
}
