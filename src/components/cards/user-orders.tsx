import { Fragment } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import Cookies from "js-cookie";

import { ORDER_ID } from "../../constants";
import UserOrdersTypes from "../../types/user-orders";

interface UserOrdersCardProps extends UserOrdersTypes {
  index: number;
}

const UserOrdersCard = ({
  id,
  startTime,
  endTime,
  fromWhere,
  cancel,
  toWhere,
  price,
  index,
}: UserOrdersCardProps) => {
  const singleOrder = (id: string) => {
    Cookies.set(ORDER_ID, id);
  };

  return (
    <Fragment>
      <div className="!from-cyan-200 p-2 hover:-translate-y-6 transition-[300ms] sm:p-4 md:p-6 relative  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {cancel ? (
          <h1 className="text-center  text-white absolute top-1  right-0 left-0">
            <span className="bg-red-500 rounded-xl p-1">
              <b>Bekor qilingan</b>
            </span>
          </h1>
        ) : (
          ""
        )}
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
            "hover:text-white w-full p-2  text-gray-900 bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium transition-all rounded-lg text-sm inline-flex items-center justify-center gap-2 text-center"
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
