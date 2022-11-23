import {createSlice, configureStore} from '@reduxjs/toolkit';

export interface IUiState {
  currentScreen: number;
  openDrawer: boolean;
}

const UiStateSlice = createSlice({
  name: 'ui_state',
  initialState: {
    currentScreen: 0,
    openDrawer: false,
  },
  reducers: {
    updateCurrentScreen(state, action) {
      return {
        ...state,
        currentScreen: action.payload,
      };
    },
    updateOpenDrawer(state, action) {
      return {
        ...state,
        openDrawer: action.payload,
      };
    },
  },
});

export const {updateCurrentScreen, updateOpenDrawer} = UiStateSlice.actions;

export interface IStore {
  uiState: IUiState;
}

export default {
  uiState: UiStateSlice.reducer,
};
