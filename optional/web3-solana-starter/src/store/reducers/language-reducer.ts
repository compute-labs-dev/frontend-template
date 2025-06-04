// store/reducers/language-reducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'en' | 'zh' | 'de' | 'ja' | 'ko' | 'fil' | 'vi' | 'id';

export interface LanguageState {
  currentLanguage: Language;
}

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('language') as Language) || 'en';
};

const initialState: LanguageState = {
  currentLanguage: getInitialLanguage(),
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
