import { ApiClientAdapter } from '@/modules/shared/library/api-client/api-client-adapter';
import { env } from '@/modules/shared/config/env';
import { getAuthToken } from '@/modules/auth/stores/auth-store';
import { AuthRepository } from '@/modules/auth/repositories/auth-repository';
import { LoginUseCase } from '@/modules/auth/use-cases/login-use-case';
import { RegisterUseCase } from '@/modules/auth/use-cases/register-use-case';
import { LogoutUseCase } from '@/modules/auth/use-cases/logout-use-case';
import { BootstrapSessionUseCase } from '@/modules/auth/use-cases/bootstrap-session-use-case';
import { WalletRepository } from '@/modules/dashboard/repositories/wallet-repository';
import { MarketRepository } from '@/modules/dashboard/repositories/market-repository';
import { LoadDashboardUseCase } from '@/modules/dashboard/use-cases/load-dashboard-use-case';
import { TradeRepository } from '@/modules/trade/repositories/trade-repository';
import { BuyBtcUseCase } from '@/modules/trade/use-cases/buy-btc-use-case';
import { SellBtcUseCase } from '@/modules/trade/use-cases/sell-btc-use-case';
import { TransactionRepository } from '@/modules/transaction/repositories/transaction-repository';
import { ListTransactionsUseCase } from '@/modules/transaction/use-cases/list-transactions-use-case';

const apiClient = new ApiClientAdapter(env.apiUrl, () => getAuthToken());

const authRepository = new AuthRepository(apiClient);
const walletRepository = new WalletRepository(apiClient);
const marketRepository = new MarketRepository(apiClient);
const tradeRepository = new TradeRepository(apiClient);
const transactionRepository = new TransactionRepository(apiClient);

export const loginUseCase = new LoginUseCase(authRepository);
export const registerUseCase = new RegisterUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase();
export const bootstrapSessionUseCase = new BootstrapSessionUseCase(authRepository);
export const loadDashboardUseCase = new LoadDashboardUseCase(walletRepository, marketRepository);
export const buyBtcUseCase = new BuyBtcUseCase(tradeRepository);
export const sellBtcUseCase = new SellBtcUseCase(tradeRepository);
export const listTransactionsUseCase = new ListTransactionsUseCase(transactionRepository);
