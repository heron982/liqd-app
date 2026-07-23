import { ApiClientAdapter } from '@/modules/shared/library/api-client/api-client-adapter';
import type { WalletBalance } from '@/modules/dashboard/interfaces/wallet';

export class WalletRepository {
  constructor(private readonly apiClient: ApiClientAdapter) {}

  getBalance(): Promise<WalletBalance> {
    return this.apiClient.get<WalletBalance>('/wallet');
  }
}
