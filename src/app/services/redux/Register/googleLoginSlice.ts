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
    const access = state.googleLogin.access;

    const response = await apiClient.get<ApiResponse<User>>("/account/user/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    console.log(response.data);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue("Не удалось получить данные пользователя");
  }
});

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
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
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
