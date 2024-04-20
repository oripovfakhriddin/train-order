import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUsersOrders } from "../../../redux/slices/user-order";
const UserOrderPage = () => {
  const { loading, total, usersOrders } = useAppSelector(
    (state) => state.userOrders
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersOrders());
  }, [dispatch]);

  console.log(loading);
  console.log(total);
  console.log(usersOrders);

  return <div>UserOrderPage</div>;
};

export default UserOrderPage;
