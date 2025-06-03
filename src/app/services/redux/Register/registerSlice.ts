import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      // Убираем + и пробелы
      const cleanedPhoneNumber = phoneNumber.replace(/\+/g, "").replace(/\s/g, "");

      // Важно: путь с конечным слэшем, как в Swagger
      const response = await apiClient.post("/account/register/", {
        phone_number: cleanedPhoneNumber,
      });
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
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
