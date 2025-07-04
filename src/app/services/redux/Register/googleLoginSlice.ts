import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string | null;
  gender: string;
  phone_number: string | null;
  is_phone_verified: boolean;
  created_at: string;
}

export const fetchUserData = createAsyncThunk<
  User,
  void,
  { state: any; rejectValue: string }
>("user/fetchUserData", async (_, { getState, rejectWithValue }) => {
  try {
    const state: any = getState();
    // Добавляем fallback на localStorage если access в state отсутствует
    const access = state.googleLogin.access || localStorage.getItem('access_token');
    
    if (!access) {
      throw new Error("Токен доступа не найден");
    }

    const response = await apiClient.get<ApiResponse<User>>("/account/user/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Не удалось получить данные пользователя");
  }
});

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean; // Добавленное поле
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false, // Инициализация нового поля
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false; // Сброс состояния
    },
    // Новый reducer для установки статуса аутентификации
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true; 
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { resetUserState, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;