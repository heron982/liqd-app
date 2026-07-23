export type TransactionItem = {
  id: number;
  type: 'buy' | 'sell';
  amount_brl: string;
  amount_btc: string;
  btc_price: string;
  created_at: string;
};
