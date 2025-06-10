import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./Register/registerSlice";
import verifyReducer from "./OTP/verifySlice";
import googleLoginReducer from "./Register/signupWithGoogle";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    verify: verifyReducer,
    googleLogin: googleLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
