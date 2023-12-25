import { createJSONStorage, persist } from "zustand/middleware";
import { createZustandStore } from "../../utils/resetStore";

const initialState: any = {
  token: "",
  user: {} as any,
};

export interface AuthState {
  isLoggedIn?: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user?: any;
  setUserData: (user: any) => void;
}

const useAuthStore = createZustandStore<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,

      setIsLoggedIn: (isLoggedIn: boolean): void => {
        set({ isLoggedIn });
      },

      setUserData: (user: any): void => {
        set({ user });
      },
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "userAuth-storage",
      storage: createJSONStorage(() => window.localStorage),
    }
  )
);

export default useAuthStore;
