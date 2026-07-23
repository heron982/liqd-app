import { useState } from 'react';
import { router } from 'expo-router';
import { getErrorMessage } from '@/modules/shared/library/api-client/api-error';
import { loginUseCase } from '@/modules/shared/library/composition';

export function useLoginPageViewModel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      await loginUseCase.execute({ email: email.trim(), password });
      router.replace('/(app)');
    } catch (err) {
      setError(getErrorMessage(err, 'Não foi possível entrar. Tente novamente.'));
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    submit,
    goToRegister: () => router.push('/(auth)/register'),
  };
}
