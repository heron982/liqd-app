import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/modules/shared/theme/tokens';
import type { TransactionItem } from '@/modules/transaction/interfaces/transaction';

export function TransactionRow({ item }: { item: TransactionItem }) {
  const isBuy = item.type === 'buy';
  const date = new Date(item.created_at).toLocaleString('pt-BR');

  return (
    <View style={styles.row}>
      <View style={styles.top}>
        <Text style={[styles.type, isBuy ? styles.buy : styles.sell]}>
          {isBuy ? 'Compra' : 'Venda'}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.line}>{item.amount_btc} BTC</Text>
      <Text style={styles.meta}>
        Total R$ {item.amount_brl} · Preço R$ {item.btc_price}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.bgElevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  type: { fontWeight: '800', fontSize: 12, letterSpacing: 0.6 },
  buy: { color: colors.accent },
  sell: { color: colors.warning },
  date: { color: colors.textMuted, fontSize: 12 },
  line: { color: colors.text, fontSize: 16, fontWeight: '700' },
  meta: { color: colors.textMuted, fontSize: 13 },
});
