import type { TradeRepository } from '@/modules/trade/repositories/trade-repository';

export class BuyBtcUseCase {
  constructor(private readonly tradeRepository: TradeRepository) {}

  execute(amountBrl: string) {
    return this.tradeRepository.buy(amountBrl);
  }
}
