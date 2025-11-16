import type {UserData} from "../../../api/types/api-types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface UserSliceProps{
  user:UserData,
  isAuthenticated:boolean,
}

const initialState:UserSliceProps = {
  user:{
    id:'12345',
    login:'Hikaru'
  },
  isAuthenticated:false
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setIsAuthenticated(state,action:PayloadAction<boolean>){
      state.isAuthenticated = action.payload;
    }
  }
})


export default userSlice.reducer;
