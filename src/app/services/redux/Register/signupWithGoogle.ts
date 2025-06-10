import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";

interface GoogleLoginState {
  loading: boolean;
  error: string | null;
  success: boolean;
  token: string | null;
}

interface GoogleTokens {
  id_token?: string;
  access_token?: string;
  code?: string;
}

interface GoogleAuthResponse {
  token?: string;
  [key: string]: unknown;
}

interface ServerError {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

const initialState: GoogleLoginState = {
  loading: false,
  error: null,
  success: false,
  token: null,
};

export const loginWithGoogle = createAsyncThunk<
  GoogleAuthResponse,
  GoogleTokens,
  { rejectValue: string }
>("auth/loginWithGoogle", async (tokens, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<GoogleAuthResponse>(
      "/account/auth/social/google/",
      tokens
    );
    return response.data;
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const serverError = (error as { response?: { data?: ServerError | string } }).response?.data;

      if (typeof serverError === "string") {
        return rejectWithValue("Ошибка сервера. Попробуйте позже.");
      }

      if (serverError && typeof serverError === "object") {
        if (serverError.detail) {
          return rejectWithValue(serverError.detail);
        }
        if (serverError.message) {
          return rejectWithValue(serverError.message);
        }

        const firstKey = Object.keys(serverError)[0];
        const message = Array.isArray(serverError[firstKey])
          ? (serverError[firstKey] as unknown[])[0]
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
      state.token = null;
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
        state.token = action.payload.token ?? null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export const { resetGoogleLoginState } = googleLoginSlice.actions;
export default googleLoginSlice.reducer;