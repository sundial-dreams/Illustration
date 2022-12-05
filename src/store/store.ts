import {createSlice, configureStore, SliceCaseReducers} from '@reduxjs/toolkit';

export interface IUiState {
  currentScreen: string;
  currentScreenIndex: number;
  openDrawer: boolean;
}

const UiStateSlice = createSlice({
  name: 'ui_state',
  initialState: {
    currentScreen: 'Discover',
    currentScreenIndex: 0,
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
    updateCurrentScreenIndex(state, action) {
      return {
        ...state,
        currentScreenIndex: action.payload,
      };
    },
  },
});

export const {updateCurrentScreen, updateOpenDrawer, updateCurrentScreenIndex} =
  UiStateSlice.actions;

export interface IUserState {
  auth: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  };
  name: string;
  avatar: string;
  backgroundImageUrl: string;
  comment: string;
}

const UserStateSlice = createSlice<IUserState, SliceCaseReducers<IUserState>>({
  name: 'user_state',
  initialState: {
    auth: {
      refreshToken: '',
      accessToken: '',
      expiresAt: '',
    },
    name: '',
    avatar: '',
    backgroundImageUrl: '',
    comment: '',
  },
  reducers: {
    updateToken(
      state,
      action: {
        type: string;
        payload: {accessToken: string; refreshToken: string; expiresAt: string};
      },
    ) {
      return {
        ...state,
        token: action.payload,
      };
    },
    resetToken(state, action) {
      return {
        ...state,
        auth: {
          refreshToken: '',
          accessToken: '',
          expiresAt: '',
        },
      };
    },
  },
});

export const {updateToken, resetToken} = UserStateSlice.actions;

export interface IStore {
  uiState: IUiState;
  userState: IUserState;
}

export default {
  uiState: UiStateSlice.reducer,
  userState: UserStateSlice.reducer,
};
