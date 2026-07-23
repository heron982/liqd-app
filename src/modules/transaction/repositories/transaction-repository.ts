import { ApiClientAdapter } from '@/modules/shared/library/api-client/api-client-adapter';
import type { TransactionItem } from '@/modules/transaction/interfaces/transaction';

export class TransactionRepository {
  constructor(private readonly apiClient: ApiClientAdapter) {}

  list(): Promise<{ data: TransactionItem[] }> {
    return this.apiClient.get<{ data: TransactionItem[] }>('/transactions');
  }
}
