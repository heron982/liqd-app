import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshingBanner } from '@/modules/shared/components/refreshing-banner';
import { colors, spacing } from '@/modules/shared/theme/tokens';
import { TransactionRow } from './components/transaction-row';
import { useHistoryPageViewModel } from './history-page-viewmodel';

export function HistoryPage() {
  const vm = useHistoryPageViewModel();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico</Text>
        <Text style={styles.subtitle}>Suas compras e vendas</Text>
      </View>

      <View style={styles.bannerWrap}>
        <RefreshingBanner visible={vm.refreshing} />
      </View>

      {vm.loading && vm.items.length === 0 ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 24 }} />
      ) : null}
      {vm.error ? <Text style={styles.error}>{vm.error}</Text> : null}

      <FlatList
        data={vm.items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
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
        ListEmptyComponent={
          !vm.loading ? <Text style={styles.empty}>Nenhuma transação ainda.</Text> : null
        }
        renderItem={({ item }) => <TransactionRow item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: 4 },
  bannerWrap: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textMuted },
  list: { padding: spacing.lg, flexGrow: 1 },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: 40 },
  error: { color: colors.danger, paddingHorizontal: spacing.lg },
});
