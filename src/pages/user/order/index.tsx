import { Fragment, useEffect } from "react";

import UserOrdersCard from "../../../components/cards/user-orders";
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

  return (
    <Fragment>
      {loading ? (
        <div
          id="crud-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        <section>
          <div className="container">
            <div className="my-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <h1 className="text-2xl sm:text-4xl">Mening buyurtmalarim</h1>
              <h4 className="text-xl sm:text-1xl py-1 px-6 bg-sky-300 rounded-lg">
                Jami: {total}
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {usersOrders.map((order, index) => (
                <UserOrdersCard key={index} {...order} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default UserOrderPage;
