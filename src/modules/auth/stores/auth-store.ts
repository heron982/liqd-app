import { secureDelete, secureGet, secureSet } from '@/modules/shared/library/secure-storage';
import { create } from 'zustand';
import type { AuthUser } from '@/modules/auth/interfaces/auth-repository';

const TOKEN_KEY = 'liqd.auth.token';

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  hydrated: boolean;
  setSession: (token: string, user: AuthUser) => Promise<void>;
  clearSession: () => Promise<void>;
  hydrate: () => Promise<void>;
  setUser: (user: AuthUser) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  hydrated: false,

  async setSession(token, user) {
    await secureSet(TOKEN_KEY, token);
    set({ token, user });
  },

  async clearSession() {
    await secureDelete(TOKEN_KEY);
    set({ token: null, user: null });
  },

  async hydrate() {
    const token = await secureGet(TOKEN_KEY);
    set({ token, hydrated: true });
  },

  setUser(user) {
    set({ user });
  },
}));

export function getAuthToken(): string | null {
  return useAuthStore.getState().token;
}
