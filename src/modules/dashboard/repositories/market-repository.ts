import { ApiClientAdapter } from '@/modules/shared/library/api-client/api-client-adapter';
import type { BtcPrice } from '@/modules/dashboard/interfaces/wallet';

export class MarketRepository {
  constructor(private readonly apiClient: ApiClientAdapter) {}

  getBtcPrice(): Promise<BtcPrice> {
    return this.apiClient.get<BtcPrice>('/market/btc');
  }
}
