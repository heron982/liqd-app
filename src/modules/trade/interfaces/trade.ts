import type { WalletBalance } from '@/modules/dashboard/interfaces/wallet';

export type TradeTransaction = {
  id: number;
  type: 'buy' | 'sell';
  amount_brl: string;
  amount_btc: string;
  btc_price: string;
  created_at: string;
};

export type TradeResult = {
  wallet: WalletBalance;
  transaction: TradeTransaction;
};
