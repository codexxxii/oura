import { create } from "zustand";

type ContextProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useStore = create<ContextProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
