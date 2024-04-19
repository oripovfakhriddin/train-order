import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "../../server/request";
import User from "../../types/user";

interface initialStateTypes {
  users: User[];
  loading: boolean;
  total: number;
}

const initialState: initialStateTypes = {
  users: [],
  loading: false,
  total: 0,
};

export const getUsers = createAsyncThunk("users/fetching", async () => {
  const { data } = await request.get("user/get-all");
  return data;
});

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    controlLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state, { payload }: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = payload;
          state.total = payload.length;
        }
      )
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: usersReducer, name: userName } = userSlice;

const { controlLoading } = userSlice.actions;

export { usersReducer as default, userName, controlLoading };
