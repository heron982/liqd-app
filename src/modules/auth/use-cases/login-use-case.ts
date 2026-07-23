import type { AuthRepository, LoginInput } from '@/modules/auth/interfaces/auth-repository';
import { useAuthStore } from '@/modules/auth/stores/auth-store';

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: LoginInput) {
    const session = await this.authRepository.login(input);
    await useAuthStore.getState().setSession(session.token, session.user);
    return session;
  }
}
