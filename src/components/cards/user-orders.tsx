import { Fragment } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import UserOrdersTypes from "../../types/user-orders";

interface UserOrdersCardProps extends UserOrdersTypes {
  index: number;
}

const UserOrdersCard = ({
  id,
  startTime,
  endTime,
  fromWhere,
  toWhere,
  price,
  index,
}: UserOrdersCardProps) => {
  const singleOrder = (id: string) => {
    localStorage.setItem("order-id", id);
  };

  return (
    <Fragment>
      <div className=" p-2 sm:p-4 md:p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between gap-3 mb-2 ">
          <p>T/r </p>
          <p>{index + 1}</p>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-3 mb-2">
          <p>Boshlanish vaqti: </p>
          <p>{startTime}</p>
        </div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <p>Tugash vaqti: </p>
          <p>{endTime}</p>
        </div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <p>Qayerdan: </p>
          <p>{fromWhere}</p>
        </div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <p>Qayerga: </p>
          <p>{toWhere}</p>
        </div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <p>Narxi: </p>
          <p>{price} $</p>
        </div>
        <NavLink
          to={"/my-single-order"}
          onClick={() => {
            singleOrder(id);
          }}
          className={
            "hover:text-white w-full p-2  text-gray-900 bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium transition-all rounded-lg text-sm inline-flex items-center justify-center gap-2 text-center"
          }
        >
          <AiOutlineInfoCircle className="w-6 h-6" />
          <span> Ko'proq...</span>
        </NavLink>
      </div>
    </Fragment>
  );
};

export default UserOrdersCard;
