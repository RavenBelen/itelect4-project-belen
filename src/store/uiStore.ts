import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  isDarkMode: boolean;
  plantSearchTerm: string;
  toggleDarkMode: () => void;
  setPlantSearchTerm: (term: string) => void;
}

const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      plantSearchTerm: "",
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setPlantSearchTerm: (term) => set({ plantSearchTerm: term }),
    }),
    {
      name: "betta-ui-storage",
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);

export default useUiStore;
