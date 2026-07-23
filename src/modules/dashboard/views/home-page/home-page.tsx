import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/modules/shared/components/button';
import { RefreshingBanner } from '@/modules/shared/components/refreshing-banner';
import { colors, spacing } from '@/modules/shared/theme/tokens';
import { BalanceCard } from './components/balance-card';
import { PriceCard } from './components/price-card';
import { useHomePageViewModel } from './home-page-viewmodel';

export function HomePage() {
  const vm = useHomePageViewModel();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={vm.refreshing}
            onRefresh={vm.refresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
            progressBackgroundColor={colors.bgElevated}
            title="Atualizando…"
            titleColor={colors.textMuted}
          />
        }
      >
        <RefreshingBanner visible={vm.refreshing} />

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá{vm.user?.name ? `, ${vm.user.name}` : ''}</Text>
            <Text style={styles.brand}>Liqd</Text>
          </View>
          <Button label="Sair" onPress={vm.logout} variant="secondary" />
        </View>

        {vm.loading ? <ActivityIndicator color={colors.accent} /> : null}
        {vm.error ? <Text style={styles.error}>{vm.error}</Text> : null}
        {vm.wallet ? <BalanceCard wallet={vm.wallet} /> : null}
        {vm.market ? <PriceCard market={vm.market} lastUpdatedAt={vm.lastUpdatedAt} /> : null}

        <Button label="Comprar e vender" onPress={vm.goToTrade} />
        <Button label="Histórico" onPress={vm.goToTransactions} variant="secondary" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.md },
  greeting: { color: colors.textMuted, fontSize: 14 },
  brand: { color: colors.accent, fontSize: 28, fontWeight: '800' },
  error: { color: colors.danger },
});
