import { ApiClientAdapter } from '@/modules/shared/library/api-client/api-client-adapter';
import type { TradeResult } from '@/modules/trade/interfaces/trade';

export class TradeRepository {
  constructor(private readonly apiClient: ApiClientAdapter) {}

  buy(amountBrl: string): Promise<TradeResult> {
    return this.apiClient.post<TradeResult>('/trade/buy', { amount_brl: amountBrl });
  }

  sell(amountBtc: string): Promise<TradeResult> {
    return this.apiClient.post<TradeResult>('/trade/sell', { amount_btc: amountBtc });
  }
}
