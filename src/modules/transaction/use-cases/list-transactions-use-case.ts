import type { TransactionRepository } from '@/modules/transaction/repositories/transaction-repository';

export class ListTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute() {
    const response = await this.transactionRepository.list();
    return response.data;
  }
}
