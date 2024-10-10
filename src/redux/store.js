import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { serverStatusSlice } from "./stores/serverStatusSlice";


const rootReducer = combineReducers({
  serverStatus: serverStatusSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
