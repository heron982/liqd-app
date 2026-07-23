/// <reference types="jest" />

import { LoginUseCase } from '@/modules/auth/use-cases/login-use-case';

describe('LoginUseCase', () => {
  it('persists session after login', async () => {
    const authRepository = {
      login: jest.fn().mockResolvedValue({
        token: 'tok',
        user: { id: 1, name: 'Ada', email: 'ada@example.com' },
      }),
      register: jest.fn(),
      me: jest.fn(),
    };

    const setSession = jest.fn();
    jest.spyOn(require('@/modules/auth/stores/auth-store').useAuthStore, 'getState').mockReturnValue({
      setSession,
    });

    const useCase = new LoginUseCase(authRepository);
    const result = await useCase.execute({ email: 'ada@example.com', password: 'secret' });

    expect(authRepository.login).toHaveBeenCalled();
    expect(setSession).toHaveBeenCalledWith('tok', result.user);
  });
});
