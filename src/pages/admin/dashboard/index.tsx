import { Fragment, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllUsersOrders } from "../../../redux/slices/orders";
import { getUsers } from "../../../redux/slices/user";
import { getWagons } from "../../../redux/slices/wagon";

const DashboardPage = () => {
  const { total: usersTotal, loading: usersLoading } = useAppSelector(
    (state) => state.user
  );
  const { total: allUsersOrdersTotal, loading: allUsersOrderLoading } =
    useAppSelector((state) => state.allUsersOrders);
  const { total: wagonsTotal, loading: wagonsLoading } = useAppSelector(
    (state) => state.wagon
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllUsersOrders());
    dispatch(getWagons());
  }, [dispatch]);

  return (
    <Fragment>
      {usersLoading && allUsersOrderLoading && wagonsLoading ? (
        <div
          id="crud-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        <div>
          <h1>Users: {usersTotal}</h1>
          <h1>AllUsersOrder: {allUsersOrdersTotal}</h1>
          <h1>Wagons: {wagonsTotal}</h1>
        </div>
      )}
    </Fragment>
  );
};

export default DashboardPage;
