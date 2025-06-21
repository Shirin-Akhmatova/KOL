import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";

interface GoogleLoginState {
  loading: boolean;
  error: string | null;
  success: boolean;
  access: string | null;
  refresh: string | null;
  user: string | null;
}

const initialState: GoogleLoginState = {
  loading: false,
  error: null,
  success: false,
  access: null,
  refresh: null,
  user: null,
};

interface GoogleTokens {
  access_token?: string;
}

export const loginWithGoogle = createAsyncThunk<
  any,
  GoogleTokens,
  { rejectValue: string }
>("auth/loginWithGoogle", async (tokens, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(
      "/account/auth/social/google/",
      tokens
    );
    return response.data;
  } catch (error: any) {
    const serverError = error.response?.data;

    if (serverError) {
      if (typeof serverError === "string") {
        return rejectWithValue("Ошибка сервера. Попробуйте позже.");
      }

      if (typeof serverError === "object") {
        if (serverError.detail) return rejectWithValue(serverError.detail);
        if (serverError.message) return rejectWithValue(serverError.message);

        const firstKey = Object.keys(serverError)[0];
        const message = Array.isArray(serverError[firstKey])
          ? serverError[firstKey][0]
          : serverError[firstKey];
        return rejectWithValue(`${firstKey}: ${message}`);
      }
    }

    return rejectWithValue("Неизвестная ошибка при входе через Google");
  }
});

const googleLoginSlice = createSlice({
  name: "googleLogin",
  initialState,
  reducers: {
    resetGoogleLoginState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
    setAccessToken: (state, action) => {
      state.access = action.payload;
    },
    logout: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.access = null;
      state.refresh = null;
      state.user = null;

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    resetGoogleUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.access = action.payload?.access ?? null;
        state.refresh = action.payload?.refresh ?? null;
        state.user = action.payload?.user ?? null;

        if (action.payload?.access) {
          localStorage.setItem("access_token", action.payload.access);
        }
        if (action.payload?.refresh) {
          localStorage.setItem("refresh_token", action.payload.refresh);
        }
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export const {
  resetGoogleLoginState,
  setAccessToken,
  logout,
  resetGoogleUser,
} = googleLoginSlice.actions;

export default googleLoginSlice.reducer;
