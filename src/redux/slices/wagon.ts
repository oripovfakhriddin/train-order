import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "../../server/request";
import Wagon from "../../types/wagons";

interface initialStateTypes {
  wagons: Wagon[];
  loading: boolean;
  total: number;
}

const initialState: initialStateTypes = {
  wagons: [],
  loading: false,
  total: 0,
};

export const getWagons = createAsyncThunk("wagons/fetching", async () => {
  const { data } = await request.get("wagon/get-all");
  return data;
});

export const wagonSlice = createSlice({
  initialState,
  name: "wagon",
  reducers: {
    controlLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWagons.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getWagons.fulfilled,
        (state, { payload }: PayloadAction<Wagon[]>) => {
          state.loading = false;
          state.wagons = payload;
          state.total = payload.length;
        }
      )
      .addCase(getWagons.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: wagonsReducer, name: wagonName } = wagonSlice;

const { controlLoading } = wagonSlice.actions;

export { wagonsReducer as default, wagonName, controlLoading };
