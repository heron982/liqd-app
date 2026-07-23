import type { AuthRepository, RegisterInput } from '@/modules/auth/interfaces/auth-repository';
import { useAuthStore } from '@/modules/auth/stores/auth-store';

export class RegisterUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: RegisterInput) {
    const session = await this.authRepository.register(input);
    await useAuthStore.getState().setSession(session.token, session.user);
    return session;
  }
}
