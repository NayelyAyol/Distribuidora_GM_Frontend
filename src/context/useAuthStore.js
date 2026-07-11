import { create } from "zustand";
import { persist } from "zustand/middleware";
import useVentaStore from "../features/vendedor/ventas/context/useVentaStore"; 

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

        logout: () => {
            set({
                token: null,
                user: null,
            });

            useVentaStore.getState().resetVentaCompleta();
        },

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
