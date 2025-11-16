import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated:boolean,
  id:string,
  login:string
}

const initialState: UserState = {
  isAuthenticated:true,
  id:'',
  login:''
};

export const userSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    authenticate: (state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
    }
  }
});

export default userSlice.reducer;
