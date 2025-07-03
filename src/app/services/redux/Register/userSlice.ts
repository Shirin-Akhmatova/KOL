import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";
import { logout } from "./signupWithGoogle";

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  phone_number?: string;
}

interface UserState {
  loading: boolean;
  error: string | null;
  success: boolean;
  user: UserData | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

export const updateUserData = createAsyncThunk<
  UserData,
  UserData,
  { rejectValue: string }
>("user/updateUserData", async (user: UserData, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;

  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return rejectWithValue(
        "Access token отсутствует. Пожалуйста, войдите снова."
      );
    }

    const response = await apiClient.patch("/account/user/", user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const serverError = error.response?.data;

    if (
      serverError?.code === "token_not_valid" &&
      serverError?.messages?.some(
        (msg: any) =>
          msg.token_class === "AccessToken" &&
          msg.message === "Token is expired"
      )
    ) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      dispatch(logout());
      return rejectWithValue("Сессия истекла, пожалуйста, войдите снова.");
    }

    if (
      serverError &&
      ((typeof serverError === "string" &&
        serverError.includes("duplicate key value")) ||
        (typeof serverError === "object" &&
          (serverError.message?.includes("duplicate key value") ||
            serverError.detail?.includes("duplicate key value"))))
    ) {
      return rejectWithValue("Номер уже используется");
    }

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

    return rejectWithValue(
      "Неизвестная ошибка при отправке данных пользователя"
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
