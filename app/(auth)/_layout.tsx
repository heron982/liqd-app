import { Stack } from 'expo-router';
import { GuestOnly } from '@/modules/auth/middlewares/guest-only';
import { colors } from '@/modules/shared/theme/tokens';

export default function AuthLayout() {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
    </GuestOnly>
  );
}
