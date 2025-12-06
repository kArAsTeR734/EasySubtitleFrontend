import {combineReducers, configureStore} from "@reduxjs/toolkit";
import transcriptionReducer from "./reducers/TranscriptionSlice"
import modalReducer from "./reducers/ModalSlice"
import userReducer from "./reducers/UserSlice"

const rootReducer = combineReducers({
  transcriptionReducer,
  modalReducer,
  userReducer
})

export const setupStore = () =>{
  return configureStore({
    reducer:rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']