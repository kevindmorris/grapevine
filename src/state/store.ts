import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import savedSlice from "./slices/savedSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    saved: savedSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
