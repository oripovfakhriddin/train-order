import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { USER_ID } from "../../constants";
import request from "../../server/request";
import UserOrdersTypes from "../../types/user-orders";

interface initialStateTypes {
  usersOrders: UserOrdersTypes[];
  loading: boolean;
  total: number;
}

const initialState: initialStateTypes = {
  usersOrders: [],
  loading: false,
  total: 0,
};

export const getUsersOrders = createAsyncThunk(
  "user-orders/fetching",
  async () => {
    const { data } = await request.get(`/user/get-my-orders`, {
      params: {
        id: Cookies.get(USER_ID),
      },
    });
    return data;
  }
);

export const userOrdersSlice = createSlice({
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
        (state, { payload }: PayloadAction<UserOrdersTypes[]>) => {
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

const { reducer: usersOrderReducer, name: userOrdersName } = userOrdersSlice;

const { controlLoading } = userOrdersSlice.actions;

export { usersOrderReducer as default, userOrdersName, controlLoading };
