import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,

      login: (name: string) =>
        set({
          token: `demo-token-${name}-${Date.now()}`,
          userName: name,
        }),

      logout: () =>
        set({
          token: null,
          userName: null,
        }),
    }),
    {
      name: "betta-auth-storage",
    }
  )
);

export default useAuthStore;