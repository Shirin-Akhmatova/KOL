import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./Register/registerSlice";
import verifyReducer from "./OTP/verifySlice";
import googleLoginReducer from "./Register/signupWithGoogle";
import userReducer from "./Register/googleLoginSlice";
import putUserReducer from "./Register/userSlice";
import authReducer from "./authSlice/authSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    verify: verifyReducer,
    googleLogin: googleLoginReducer,
    user: userReducer,
    putUser: putUserReducer,
        auth: authReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
