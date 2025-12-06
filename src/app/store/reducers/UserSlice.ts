import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated:boolean,
  id:string,
  login:string
}

const initialState: UserState = {
  isAuthenticated:false,
  id:'',
  login:''
};

export const userSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    isAuthenticated: (state) => {
      state.isAuthenticated = !!localStorage.getItem('access_token');
    },
    authenticate: (state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
    },
    logout:(state)=>{
      state.isAuthenticated = false;
    }
  }
});

export default userSlice.reducer;
