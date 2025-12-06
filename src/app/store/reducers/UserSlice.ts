import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {AuthorizationService} from "../../../api/AuthorizationService.ts";

interface UserState {
  isAuth:boolean,
}

const initialState: UserState = {
  isAuth:false,
};

export const userSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    setAuth: (state,action:PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout:(state)=>{
      state.isAuth = false;
      AuthorizationService.logout();
    }
  }
});

export default userSlice.reducer;
