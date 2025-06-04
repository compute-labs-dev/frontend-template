import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
}

const initialState: UiState = {
  sidebarOpen: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = uiSlice.actions;

export default uiSlice.reducer; 