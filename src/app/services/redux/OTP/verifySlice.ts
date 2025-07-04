import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";

interface VerifyState {
  loading: boolean;
  error: string | null;
  success: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: string | null;
}

interface VerifyResponse {
  [key: string]: unknown;
  access_token?: string;
  refresh_token?: string;
  user?: string | null | boolean;
}

const initialState: VerifyState = {
  loading: false,
  error: null,
  success: false,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  user: null,
};

export const verifyCode = createAsyncThunk<
  VerifyResponse,
  { phone_number: string; code: string },
  { rejectValue: string }
>("auth/verifyCode", async ({ phone_number, code }, { rejectWithValue }) => {
  try {
    const cleanedPhoneNumber = phone_number
      .replace(/\+/g, "")
      .replace(/\s/g, "");
    const response = await apiClient.post<VerifyResponse>(
      "/account/verify_code/",
      {
        phone_number: cleanedPhoneNumber,
        code: String(code),
      }
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

    return rejectWithValue("Неизвестная ошибка при подтверждении кода");
  }
});

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetVerifyState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        const user = action.payload?.user;
        if (user === "False" || user === false || user === null) {
          state.user = null;
        } else {
          state.user = user as string;
        }

        if (action.payload.access_token) {
          state.accessToken = action.payload.access_token;
          localStorage.setItem("access_token", action.payload.access_token);
        }
        if (action.payload.refresh_token) {
          state.refreshToken = action.payload.refresh_token;
          localStorage.setItem("refresh_token", action.payload.refresh_token);
        }
      })
      .addCase(
        verifyCode.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Неизвестная ошибка";
          state.isAuthenticated = false;
          state.user = null;
        }
      );
  },
});

export const { resetVerifyState } = verifySlice.actions;
export default verifySlice.reducer;
