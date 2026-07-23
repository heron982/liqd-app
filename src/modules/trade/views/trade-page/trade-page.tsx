import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/modules/shared/components/button';
import { Card } from '@/modules/shared/components/card';
import { Screen } from '@/modules/shared/components/screen';
import { TextField } from '@/modules/shared/components/text-field';
import { colors, spacing } from '@/modules/shared/theme/tokens';
import { useTradePageViewModel } from './trade-page-viewmodel';

export function TradePage() {
  const vm = useTradePageViewModel();

  return (
    <Screen scroll refreshing={vm.refreshing} onRefresh={vm.refresh}>
      <Text style={styles.title}>Comprar e vender</Text>
      <Text style={styles.subtitle}>Use o preço atual para negociar BTC.</Text>

      <View style={styles.modeRow}>
        <Button label="Comprar" onPress={() => vm.setMode('buy')} variant={vm.mode === 'buy' ? 'primary' : 'secondary'} />
        <Button label="Vender" onPress={() => vm.setMode('sell')} variant={vm.mode === 'sell' ? 'primary' : 'secondary'} />
      </View>

      {vm.market ? (
        <Card>
          <Text style={styles.meta}>Preço atual</Text>
          <Text style={styles.price}>R$ {vm.market.price}</Text>
        </Card>
      ) : null}

      {vm.wallet ? (
        <Card>
          <Text style={styles.meta}>Saldo em reais: R$ {vm.wallet.balance_brl}</Text>
          <Text style={styles.meta}>Saldo em bitcoin: {vm.wallet.balance_btc}</Text>
        </Card>
      ) : null}

      <TextField
        label={vm.amountLabel}
        value={vm.amount}
        onChangeText={vm.setAmount}
        keyboardType="decimal-pad"
        placeholder={vm.mode === 'buy' ? '100.00' : '0.0001'}
      />

      {vm.error ? <Text style={styles.error}>{vm.error}</Text> : null}
      {vm.success ? (
        <Text style={styles.success}>
          {vm.success.transaction.type === 'buy' ? 'Compra' : 'Venda'} concluída: {vm.success.transaction.amount_btc} BTC
        </Text>
      ) : null}

      <Button label={vm.submitLabel} onPress={vm.submit} loading={vm.loading || vm.bootLoading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textMuted },
  modeRow: { flexDirection: 'row', gap: spacing.sm },
  meta: { color: colors.textMuted },
  price: { color: colors.accent, fontSize: 24, fontWeight: '700' },
  error: { color: colors.danger },
  success: { color: colors.accent },
});
