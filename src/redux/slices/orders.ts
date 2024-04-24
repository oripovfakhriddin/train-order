import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const getAllUsersOrders = createAsyncThunk(
  "all-user-orders/fetching",
  async () => {
    const { data } = await request.get(`order/get-all`);
    return data;
  }
);

export const ordersSlice = createSlice({
  initialState,
  name: "allUsersOrders",
  reducers: {
    controlLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllUsersOrders.fulfilled,
        (state, { payload }: PayloadAction<UserOrdersTypes[]>) => {
          state.loading = false;
          state.usersOrders = payload;
          state.total = payload.length;
        }
      )
      .addCase(getAllUsersOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: allUsersOrderReducer, name: allUsersOrdersName } = ordersSlice;

const { controlLoading } = ordersSlice.actions;

export { allUsersOrderReducer as default, allUsersOrdersName, controlLoading };
