import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {UserInfo} from "../../../api/types/api-types.ts";
import {AuthorizationService} from "../../../api/AuthorizationService.ts";

interface UserState {
  isAuth:boolean,
  user:UserInfo | null
}

const initialState: UserState = {
  isAuth:false,
  user:null
};

export const userSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    setAuth: (state,action:PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action:PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    logout:(state)=>{
      state.isAuth = false;
      AuthorizationService.logout();
      state.user = null;
    }
  }
});

export default userSlice.reducer;
