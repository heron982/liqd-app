import { useState } from 'react';
import { router } from 'expo-router';
import { getErrorMessage } from '@/modules/shared/library/api-client/api-error';
import { registerUseCase } from '@/modules/shared/library/composition';

export function useRegisterPageViewModel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await registerUseCase.execute({
        name: name.trim(),
        email: email.trim(),
        password,
        password_confirmation: passwordConfirmation,
      });
      router.replace('/(app)');
    } catch (err) {
      setError(getErrorMessage(err, 'Não foi possível criar sua conta. Tente novamente.'));
    } finally {
      setLoading(false);
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    loading,
    error,
    submit,
    goToLogin: () => router.back(),
  };
}
