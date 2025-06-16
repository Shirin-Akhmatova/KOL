import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";

interface VerifyState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface VerifyResponse {
  [key: string]: unknown;
}

interface ServerError {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

const initialState: VerifyState = {
  loading: false,
  error: null,
  success: false,
};

export const verifyCode = createAsyncThunk<
  VerifyResponse,
  { phone_number: string; code: string },
  { rejectValue: string }
>(
  "auth/verifyCode",
  async ({ phone_number, code }, { rejectWithValue }) => {
    try {
      const cleanedPhoneNumber = phone_number.replace(/\+/g, '').replace(/\s/g, '');
      
      const response = await apiClient.post<VerifyResponse>("/account/verify_code/", {
        phone_number: cleanedPhoneNumber,
        code: String(code),
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
      return rejectWithValue("Неизвестная ошибка при подтверждении кода");
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetVerifyState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export const { resetVerifyState } = verifySlice.actions;
export default verifySlice.reducer;