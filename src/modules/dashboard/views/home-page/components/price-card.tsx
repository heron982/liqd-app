import { StyleSheet, Text } from 'react-native';
import { Card } from '@/modules/shared/components/card';
import { colors } from '@/modules/shared/theme/tokens';
import type { BtcPrice } from '@/modules/dashboard/interfaces/wallet';

type Props = {
  market: BtcPrice;
  lastUpdatedAt?: Date | null;
};

export function PriceCard({ market, lastUpdatedAt }: Props) {
  const updatedLabel = lastUpdatedAt
    ? `Atualizado às ${lastUpdatedAt.toLocaleTimeString('pt-BR')}`
    : 'Puxe a tela para atualizar';

  return (
    <Card>
      <Text style={styles.label}>Preço do bitcoin</Text>
      <Text style={styles.value}>R$ {market.price}</Text>
      <Text style={styles.hint}>{updatedLabel}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  value: { color: colors.text, fontSize: 28, fontWeight: '800' },
  hint: { color: colors.textMuted, fontSize: 12 },
});
