import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface ModalSliceProps{
  isOpen:boolean,
  title:string,
}

const initialState: ModalSliceProps = {
  isOpen:false,
  title:'Вход',
}

export const modalSlice = createSlice({
  name: "ModalSlice",
  initialState,
  reducers:{
    switchAuthMode(state,action:PayloadAction<string>){
      state.title = action.payload
    },

    onClose(state,action:PayloadAction<boolean>){
      state.isOpen = action.payload
    }
  }
})

export default modalSlice.reducer;