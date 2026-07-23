import type { MarketRepository } from '@/modules/dashboard/repositories/market-repository';
import type { WalletRepository } from '@/modules/dashboard/repositories/wallet-repository';

export class LoadDashboardUseCase {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly marketRepository: MarketRepository,
  ) {}

  async execute() {
    const [wallet, market] = await Promise.all([
      this.walletRepository.getBalance(),
      this.marketRepository.getBtcPrice(),
    ]);
    return { wallet, market };
  }
}
