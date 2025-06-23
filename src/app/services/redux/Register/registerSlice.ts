import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface RegisterResponse {
  [key: string]: unknown;
}

interface ServerError {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk<
  RegisterResponse,
  string,
  { rejectValue: string }
>(
  "auth/registerUser",
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const cleanedPhoneNumber = phoneNumber.replace(/\+/g, "").replace(/\s/g, "");

      const response = await apiClient.post<RegisterResponse>("/account/register/", {
        phone_number: cleanedPhoneNumber,
      });
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

      return rejectWithValue("Неизвестная ошибка при регистрации");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer; 