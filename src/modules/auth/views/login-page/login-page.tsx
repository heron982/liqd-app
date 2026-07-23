import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/modules/shared/components/button';
import { Screen } from '@/modules/shared/components/screen';
import { TextField } from '@/modules/shared/components/text-field';
import { colors, spacing } from '@/modules/shared/theme/tokens';
import { useLoginPageViewModel } from './login-page-viewmodel';

export function LoginPage() {
  const vm = useLoginPageViewModel();

  return (
    <Screen scroll>
      <View style={styles.hero}>
        <Text style={styles.brand}>Liqd</Text>
        <Text style={styles.subtitle}>Compre e venda bitcoin com saldo inicial.</Text>
      </View>

      <TextField
        label="E-mail"
        value={vm.email}
        onChangeText={vm.setEmail}
        placeholder="voce@email.com"
        keyboardType="email-address"
      />
      <TextField
        label="Senha"
        value={vm.password}
        onChangeText={vm.setPassword}
        placeholder="••••••••"
        secureTextEntry
      />

      {vm.error ? <Text style={styles.error}>{vm.error}</Text> : null}

      <Button label="Entrar" onPress={vm.submit} loading={vm.loading} />
      <Button label="Criar conta" onPress={vm.goToRegister} variant="secondary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: spacing.sm, marginBottom: spacing.md, marginTop: spacing.xl },
  brand: { color: colors.accent, fontSize: 40, fontWeight: '800', letterSpacing: -1 },
  subtitle: { color: colors.textMuted, fontSize: 16, lineHeight: 22 },
  error: { color: colors.danger, fontSize: 14 },
});
