import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/modules/shared/components/button';
import { Screen } from '@/modules/shared/components/screen';
import { TextField } from '@/modules/shared/components/text-field';
import { colors, spacing } from '@/modules/shared/theme/tokens';
import { useRegisterPageViewModel } from './register-page-viewmodel';

export function RegisterPage() {
  const vm = useRegisterPageViewModel();

  return (
    <Screen scroll>
      <View style={styles.hero}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Você começa com R$ 10.000 e 0 BTC.</Text>
      </View>

      <TextField label="Nome" value={vm.name} onChangeText={vm.setName} autoCapitalize="words" />
      <TextField
        label="E-mail"
        value={vm.email}
        onChangeText={vm.setEmail}
        keyboardType="email-address"
      />
      <TextField label="Senha" value={vm.password} onChangeText={vm.setPassword} secureTextEntry />
      <TextField
        label="Confirmar senha"
        value={vm.passwordConfirmation}
        onChangeText={vm.setPasswordConfirmation}
        secureTextEntry
      />

      {vm.error ? <Text style={styles.error}>{vm.error}</Text> : null}

      <Button label="Criar conta" onPress={vm.submit} loading={vm.loading} />
      <Button label="Já tenho conta" onPress={vm.goToLogin} variant="secondary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: spacing.sm, marginBottom: spacing.md },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: 15 },
  error: { color: colors.danger },
});
