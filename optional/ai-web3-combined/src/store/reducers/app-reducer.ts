import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  newsLetterOpen: boolean;
  activeWalletName: string;
  mobileNavOpen: boolean;
}

const initialState: AppState = {
  newsLetterOpen: false,
  activeWalletName: '',
  mobileNavOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNewsLetterOpen: (state, action: PayloadAction<boolean>) => {
      state.newsLetterOpen = action.payload;
    },
    setActiveWalletName: (state, action: PayloadAction<string>) => {
      state.activeWalletName = action.payload;
    },
    setMobileNavOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileNavOpen = action.payload;
    },
  },
});

export const { setNewsLetterOpen, setActiveWalletName, setMobileNavOpen } =
  appSlice.actions;

export default appSlice.reducer;
