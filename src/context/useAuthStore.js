import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
    (set) => ({
        token: null,
        user: null,
        _hasHydrated: false,

        setAuth: ({ token, user }) => set({ token, user }),

        logout: () => set({ token: null, user: null }),

        setHydrated: () => set({ _hasHydrated: true })
    }),
    {
        name: "auth-storage",
        onRehydrateStorage: () => (state) => {
            state.setHydrated()
        }
    }
    )
)

export default useAuthStore;
