import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationService } from '@/api/services/AuthorizationService.ts';
import type { UserInfo } from '@/entities/User/models/types.ts';

export interface UserState {
  isAuth: boolean;
  user: UserInfo | null;
}

const initialState: UserState = {
  isAuth: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      AuthorizationService.logout();
      state.user = null;
      localStorage.removeItem('access_token');
    },
  },
});

export default userSlice.reducer;
