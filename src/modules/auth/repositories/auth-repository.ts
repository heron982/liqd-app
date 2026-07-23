import { ApiClientAdapter } from '@/modules/shared/library/api-client/api-client-adapter';
import type {
  AuthRepository as IAuthRepository,
  AuthSession,
  AuthUser,
  LoginInput,
  RegisterInput,
} from '@/modules/auth/interfaces/auth-repository';

export class AuthRepository implements IAuthRepository {
  constructor(private readonly apiClient: ApiClientAdapter) {}

  login(input: LoginInput): Promise<AuthSession> {
    return this.apiClient.post<AuthSession>('/login', input);
  }

  register(input: RegisterInput): Promise<AuthSession> {
    return this.apiClient.post<AuthSession>('/register', input);
  }

  me(): Promise<AuthUser> {
    return this.apiClient.get<AuthUser>('/me');
  }
}
