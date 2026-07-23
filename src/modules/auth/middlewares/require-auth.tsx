import { ReactNode } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/modules/auth/stores/auth-store';

export function RequireAuth({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);

  if (!hydrated) return null;
  if (!token) return <Redirect href="/(auth)/login" />;
  return <>{children}</>;
}
