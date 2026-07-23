import type { ComponentProps } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RequireAuth } from '@/modules/auth/middlewares/require-auth';
import { colors } from '@/modules/shared/theme/tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];

function TabIcon({
  focused,
  active,
  inactive,
}: {
  focused: boolean;
  active: IconName;
  inactive: IconName;
}) {
  return (
    <Ionicons
      name={focused ? active : inactive}
      size={22}
      color={focused ? colors.accent : colors.textMuted}
    />
  );
}

export default function AppLayout() {
  return (
    <RequireAuth>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.bgElevated,
            borderTopColor: colors.border,
            height: 64,
            paddingTop: 6,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} active="home" inactive="home-outline" />
            ),
          }}
        />
        <Tabs.Screen
          name="trade"
          options={{
            title: 'Negociar',
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                active="swap-horizontal"
                inactive="swap-horizontal-outline"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: 'Histórico',
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} active="time" inactive="time-outline" />
            ),
          }}
        />
      </Tabs>
    </RequireAuth>
  );
}
