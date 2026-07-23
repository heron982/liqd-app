import type { AuthRepository } from '@/modules/auth/interfaces/auth-repository';
import { useAuthStore } from '@/modules/auth/stores/auth-store';

export class BootstrapSessionUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute() {
    const store = useAuthStore.getState();
    await store.hydrate();
    const token = useAuthStore.getState().token;
    if (!token) return null;

    try {
      const user = await this.authRepository.me();
      store.setUser(user);
      return user;
    } catch {
      await store.clearSession();
      return null;
    }
  }
}
