import { create } from "zustand"
import { persist } from "zustand/middleware"

const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            rol: null,
            user: null,

            setAuth: ({ token, rol, user }) =>
                set({ token, rol, user }),

            setUser: (user) =>
                set((state) => ({
                    user: { ...state.user, ...user }
                })),

            logout: () =>
                set({ token: null, rol: null, user: null })
        }),
        { name: "auth-storage" }
    )
)

export default useAuthStore