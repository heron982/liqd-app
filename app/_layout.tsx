import { useEffect, useState, type ReactNode } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { bootstrapSessionUseCase } from '@/modules/shared/library/composition';
import { queryClient } from '@/modules/shared/library/query/query-client';
import { useQueryFocusManager } from '@/modules/shared/library/query/use-query-focus-manager';
import { colors } from '@/modules/shared/theme/tokens';

function AppProviders({ children }: { children: ReactNode }) {
  useQueryFocusManager();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void (async () => {
      await bootstrapSessionUseCase.execute();
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
      </AppProviders>
    </GestureHandlerRootView>
  );
}
