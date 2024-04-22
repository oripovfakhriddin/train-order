import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import Children from "../../types/children";
import allUsersOrderReducer, { allUsersOrdersName } from "../slices/orders";
import usersReducer, { userName } from "../slices/user";
import usersOrderReducer, { userOrdersName } from "../slices/user-order";
import wagonsReducer, { wagonName } from "../slices/wagon";

const reducer = {
  [wagonName]: wagonsReducer,
  [userName]: usersReducer,
  [userOrdersName]: usersOrderReducer,
  [allUsersOrdersName]: allUsersOrderReducer,
};

export const Store = configureStore({
  reducer,
});

const StoreProvider = ({ children }: Children) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default StoreProvider;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
