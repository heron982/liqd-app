import { useQuery } from '@tanstack/react-query';
import { getErrorMessage } from '@/modules/shared/library/api-client/api-error';
import { listTransactionsUseCase } from '@/modules/shared/library/composition';
import { queryKeys } from '@/modules/shared/library/query/query-keys';
import { useManualRefresh } from '@/modules/shared/library/query/use-manual-refresh';
import { useRefreshOnFocus } from '@/modules/shared/library/query/use-refresh-on-focus';

export function useHistoryPageViewModel() {
  const query = useQuery({
    queryKey: queryKeys.transactions,
    queryFn: async () => {
      const data = await listTransactionsUseCase.execute();
      return Array.isArray(data) ? data : [];
    },
  });

  useRefreshOnFocus(query.refetch);
  const { refreshing, refresh } = useManualRefresh(query.refetch);

  return {
    items: query.data ?? [],
    loading: query.isPending,
    refreshing,
    error: query.error
      ? getErrorMessage(query.error, 'Não foi possível carregar o histórico.')
      : null,
    refresh,
  };
}
