import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import savedSlice from "./slices/savedSlice";
import controlsSlice from "./slices/controlsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    saved: savedSlice,
    controls: controlsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
