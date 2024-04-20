import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { USER_ID } from "../../constants";
import request from "../../server/request";
import User from "../../types/user";

interface initialStateTypes {
  usersOrders: any;
  loading: boolean;
  total: number;
}

const initialState: initialStateTypes = {
  usersOrders: [],
  loading: false,
  total: 0,
};

export const getUsersOrders = createAsyncThunk(
  "users-orders/fetching",
  async () => {
    const { data } = await request.get(
      `/user/${Cookies.get(USER_ID)}/get-my-orders`
    );
    return data;
  }
);

export const userSlice = createSlice({
  initialState,
  name: "userOrders",
  reducers: {
    controlLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUsersOrders.fulfilled,
        (state, { payload }: PayloadAction<User[]>) => {
          state.loading = false;
          state.usersOrders = payload;
          state.total = payload.length;
        }
      )
      .addCase(getUsersOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: usersOrderReducer, name: userOrdersName } = userSlice;

const { controlLoading } = userSlice.actions;

export { usersOrderReducer as default, userOrdersName, controlLoading };
