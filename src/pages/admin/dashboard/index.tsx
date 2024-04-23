import { Fragment, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCancelOrders } from "../../../redux/slices/cancel-orders";
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
  const { total: cancelOrdersTotal, loading: cancelOrdersLoading } =
    useAppSelector((state) => state.cancelOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllUsersOrders());
    dispatch(getWagons());
    dispatch(getCancelOrders());
  }, [dispatch]);

  return (
    <Fragment>
      {usersLoading &&
      allUsersOrderLoading &&
      wagonsLoading &&
      cancelOrdersLoading ? (
        <div
          id="loading-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="">Foydalanuvchilar: {usersTotal}</div>
          <div className="">Vagonlar: {wagonsTotal}</div>
          <div className="">Buyurtmalar: {allUsersOrdersTotal}</div>
          <div className="">
            Bekor qilingan buyurtmalar: {cancelOrdersTotal}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DashboardPage;
