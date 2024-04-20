import { Fragment, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUsers } from "../../../redux/slices/user";
import { getUsersOrders } from "../../../redux/slices/user-order";
import { getWagons } from "../../../redux/slices/wagon";

const DashboardPage = () => {
  const { total: usersTotal, loading: usersLoading } = useAppSelector(
    (state) => state.user
  );
  const { total: usersOrdersTotal, loading: usersOrderLoading } =
    useAppSelector((state) => state.userOrders);
  const { total: wagonsTotal, loading: wagonsLoading } = useAppSelector(
    (state) => state.wagon
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUsersOrders());
    dispatch(getWagons());
  }, [dispatch]);

  return (
    <Fragment>
      {usersLoading && usersOrderLoading && wagonsLoading ? (
        <div
          id="crud-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        <div>
          <h1>Users: {usersTotal}</h1>
          <h1>UsersOrder: {usersOrdersTotal}</h1>
          <h1>Wagons: {wagonsTotal}</h1>
        </div>
      )}
    </Fragment>
  );
};

export default DashboardPage;
