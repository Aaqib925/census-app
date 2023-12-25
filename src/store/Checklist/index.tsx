import { createJSONStorage, persist } from 'zustand/middleware';
import { createZustandStore } from '../../utils/resetStore';

export interface userChecklists {
    userChecklist: any;
    setUserChecklist: (userChecklist: any) => void;
}

export const initialState = {
    userChecklist: [],
    setUserChecklist: () => {
        /**/
    },
};

const useUserChecklistStore = createZustandStore<userChecklists>()(
    persist(
        (set) => ({
            ...initialState,
            userChecklist: [],
            setUserChecklist: (userChecklist: any) =>
                set({ userChecklist }),
        }),
        {
            name: 'userChecklist-storage',
            storage: createJSONStorage(() => window.localStorage),
        }
    )
);

export default useUserChecklistStore;
