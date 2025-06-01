import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./Register/registerSlice";
import verifyReducer from "./OTP/verifySlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
        verify: verifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
