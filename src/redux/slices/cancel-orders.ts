import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "../../server/request";
import UserOrdersTypes from "../../types/user-orders";

interface initialStateTypes {
  cancelOrders: UserOrdersTypes[];
  loading: boolean;
  total: number;
}

const initialState: initialStateTypes = {
  cancelOrders: [],
  loading: false,
  total: 0,
};

export const getCancelOrders = createAsyncThunk("wagons/fetching", async () => {
  const { data } = await request.get("order/get-canceled-orders");
  return data;
});

export const wagonSlice = createSlice({
  initialState,
  name: "cancelOrders",
  reducers: {
    controlLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCancelOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCancelOrders.fulfilled,
        (state, { payload }: PayloadAction<UserOrdersTypes[]>) => {
          state.loading = false;
          state.cancelOrders = payload;
          state.total = payload.length;
        }
      )
      .addCase(getCancelOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: cancelOrdersReducer, name: cancelOrdersName } = wagonSlice;

const { controlLoading } = wagonSlice.actions;

export { cancelOrdersReducer as default, cancelOrdersName, controlLoading };
