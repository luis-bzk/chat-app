import { create } from 'zustand';

interface UIStore {
  menuOpen: boolean;
  toggleMenuMobile: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  menuOpen: false,
  toggleMenuMobile: () => set((state) => ({ menuOpen: !state.menuOpen })),
}));
