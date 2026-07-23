export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthSession = {
  user: AuthUser;
  token: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export interface AuthRepository {
  login(input: LoginInput): Promise<AuthSession>;
  register(input: RegisterInput): Promise<AuthSession>;
  me(): Promise<AuthUser>;
}
