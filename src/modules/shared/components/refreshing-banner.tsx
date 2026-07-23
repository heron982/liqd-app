import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/modules/shared/theme/tokens';

type Props = {
  visible: boolean;
  label?: string;
};

export function RefreshingBanner({ visible, label = 'Atualizando…' }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.banner} accessibilityLiveRegion="polite">
      <ActivityIndicator color={colors.accent} size="small" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
});
