import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/modules/shared/components/card';
import { colors } from '@/modules/shared/theme/tokens';
import type { WalletBalance } from '@/modules/dashboard/interfaces/wallet';

export function BalanceCard({ wallet }: { wallet: WalletBalance }) {
  return (
    <Card>
      <Text style={styles.label}>Saldo em reais</Text>
      <Text style={styles.value}>R$ {wallet.balance_brl}</Text>
      <View style={styles.divider} />
      <Text style={styles.label}>Saldo em bitcoin</Text>
      <Text style={styles.valueSecondary}>{wallet.balance_btc} BTC</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  value: { color: colors.text, fontSize: 32, fontWeight: '800' },
  valueSecondary: { color: colors.accent, fontSize: 22, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
});
