import type { TradeRepository } from '@/modules/trade/repositories/trade-repository';

export class SellBtcUseCase {
  constructor(private readonly tradeRepository: TradeRepository) {}

  execute(amountBtc: string) {
    return this.tradeRepository.sell(amountBtc);
  }
}
