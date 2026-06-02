import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
    (set) => ({
        token: null,
        user: null,
        _hasHydrated: false,

        setAuth: ({ token, user }) =>
        set({
            token,
            user,
        }),

        setFoto: (url) => set((state) => ({
            user: { ...state.user, fotoUrl: url }
        })),

        logout: () =>
        set({
            token: null,
            user: null,
        }),

        setHydrated: () => set({ _hasHydrated: true }),
    }),
    {
        name: "auth-storage",

        onRehydrateStorage: () => (state) => {
        if (state) {
            state.setHydrated?.();
        }
        },
    },
    ),
);

export default useAuthStore;
