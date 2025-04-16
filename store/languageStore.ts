import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Language = 'en' | 'th' | 'ru';

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

// Custom storage adapter
const customStorage = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(name);
    }
  },
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'en',
      setLanguage: (language) => set({ currentLanguage: language }),
    }),
    {
      name: 'language-store',
      storage: createJSONStorage(() => customStorage),
    }
  )
);