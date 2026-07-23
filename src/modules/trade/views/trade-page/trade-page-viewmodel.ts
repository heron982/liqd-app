import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/modules/shared/library/api-client/api-error';
import {
  buyBtcUseCase,
  loadDashboardUseCase,
  sellBtcUseCase,
} from '@/modules/shared/library/composition';
import { queryKeys } from '@/modules/shared/library/query/query-keys';
import { useManualRefresh } from '@/modules/shared/library/query/use-manual-refresh';
import { useRefreshOnFocus } from '@/modules/shared/library/query/use-refresh-on-focus';
import type { TradeResult } from '@/modules/trade/interfaces/trade';

export type TradeMode = 'buy' | 'sell';

export function useTradePageViewModel() {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<TradeMode>('buy');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState<TradeResult | null>(null);

  const dashboardQuery = useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => loadDashboardUseCase.execute(),
  });

  useRefreshOnFocus(dashboardQuery.refetch);
  const { refreshing, refresh } = useManualRefresh(dashboardQuery.refetch);

  const tradeMutation = useMutation({
    mutationFn: async () => {
      const value = amount.replace(',', '.');
      return mode === 'buy'
        ? buyBtcUseCase.execute(value)
        : sellBtcUseCase.execute(value);
    },
    onSuccess: async (result) => {
      setSuccess(result);
      setAmount('');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard }),
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions }),
      ]);
    },
  });

  const queryError = dashboardQuery.error
    ? getErrorMessage(dashboardQuery.error, 'Não foi possível carregar os dados.')
    : null;
  const mutationError = tradeMutation.error
    ? getErrorMessage(tradeMutation.error, 'Não foi possível concluir a operação.')
    : null;

  return {
    mode,
    setMode: (next: TradeMode) => {
      setMode(next);
      setSuccess(null);
      tradeMutation.reset();
    },
    amount,
    setAmount: (value: string) => {
      setAmount(value);
      setSuccess(null);
      tradeMutation.reset();
    },
    wallet: dashboardQuery.data?.wallet ?? null,
    market: dashboardQuery.data?.market ?? null,
    loading: tradeMutation.isPending,
    bootLoading: dashboardQuery.isPending,
    refreshing,
    error: mutationError ?? queryError,
    success,
    submit: () => {
      setSuccess(null);
      tradeMutation.mutate();
    },
    refresh,
    amountLabel: mode === 'buy' ? 'Valor em reais' : 'Quantidade em bitcoin',
    submitLabel: mode === 'buy' ? 'Comprar bitcoin' : 'Vender bitcoin',
  };
}
