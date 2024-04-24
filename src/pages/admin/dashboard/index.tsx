import { Fragment, useEffect } from "react";
// import { BiLogOut } from "react-icons/bi";
import { BiSolidUserDetail } from "react-icons/bi";
import { BiTrain } from "react-icons/bi";
// import { FaRegUserCircle } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center py-4">
              <BiSolidUserDetail className="w-32 h-32 text-blue-500" />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Foydalanuvchilar
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Jami: {usersTotal}
              </span>
              <div className="flex mt-4 md:mt-6">
                <Link
                  to="/admin/users"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ko'rish
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center py-4">
              <FaTableList className="w-32 h-32 text-blue-500" />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Buyurtmalar
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Jami: {allUsersOrdersTotal}
              </span>
              <div className="flex mt-4 md:mt-6">
                <Link
                  to="/admin/orders"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ko'rish
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center py-4">
              <BiTrain className="w-32 h-32 text-blue-500" />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Vagonlar
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Jami: {wagonsTotal}
              </span>
              <div className="flex mt-4 md:mt-6">
                <Link
                  to="/admin/wagons"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ko'rish
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center py-4">
              <FaTableList className="w-32 h-32 text-red-500" />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Bekor qilingan buyurtmalar
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Jami: {cancelOrdersTotal}
              </span>
              <div className="flex mt-4 md:mt-6">
                <Link
                  to="/admin/canceled-orders"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ko'rish
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DashboardPage;
