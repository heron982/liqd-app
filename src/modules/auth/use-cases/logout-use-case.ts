import { useAuthStore } from '@/modules/auth/stores/auth-store';

export class LogoutUseCase {
  async execute() {
    await useAuthStore.getState().clearSession();
  }
}
