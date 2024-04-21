import { useEffect } from "react";
import { Fragment } from "react";
import { BiEditAlt } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUsersOrders } from "../../../redux/slices/user-order";

const MySingleOrderPage = () => {
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

  const data = usersOrders.filter(
    (order) => order.id === localStorage.getItem("order-id")
  );

  console.log(data);

  return (
    <Fragment>
      <section>
        <div className="container flex flex-col items-center mt-4">
          <div className=" p-2 sm:p-4 md:p-6 max-w-[800px] w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Kim tomonidan: </p>
              <p>{data[0].owner.fullName} </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Telefon raqami: </p>
              <p>{data[0].owner.number} </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Jinsi: </p>
              <p>{data[0].owner.gender} </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Buyurtma yaratilgan sana: </p>
              <p>{data[0].createdTime.split("T")[0]} </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Buyurtma yaratilgan soat: </p>
              <p>{data[0].createdTime.split("T")[1].split(".")[0]} </p>
            </div>
            <hr />
            {data[0].createdTime === data[0].updatedTime ? (
              ""
            ) : (
              <Fragment>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Buyurtma tahrirlangan sana: </p>
                  <p>{data[0].updatedTime.split("T")[0]} </p>
                </div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Buyurtma tahrirlangan soat: </p>
                  <p>{data[0].createdTime.split("T")[1].split(".")[0]} </p>
                </div>
              </Fragment>
            )}
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Boshlanish kuni: </p>
              <p>{data[0].startTime.split(" ")[0]}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Boshlanish soati: </p>
              <p>{data[0].startTime.split(" ")[1]}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Tugash kuni: </p>
              <p>{data[0].endTime.split(" ")[0]}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Tugash kuni: </p>
              <p>{data[0].endTime.split(" ")[1]}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Qayerdan: </p>
              <p>{data[0].fromWhere}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Qayerga: </p>
              <p>{data[0].toWhere}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-3 mb-2">
              <p>Narxi: </p>
              <p>{data[0].price} $</p>
            </div>
            <hr />
            <div className="flex items-center flex-col sm:flex-row justify-between gap-3 mt-6">
              <button
                type="button"
                className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-sky-900"
              >
                <BiEditAlt className="h-5 w-5  mr-2" />
                Tahrirlash
              </button>
              {data[0].cancel ? (
                <button className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-600">
                  Bekor qilingan
                </button>
              ) : (
                <button className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-600">
                  <MdOutlineCancel className="h-5 w-5 mr-2" />
                  Bekor qilish
                </button>
              )}
              <button className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                <RiDeleteBin5Fill className="h-5 w-5  mr-2" />
                O'chirish
              </button>
            </div>
          </div>

          <div className="mt-5 max-w-[800px] w-full flex justify-center rounded-lg bg-dark-purple p-2 items-center">
            <Link
              className="w-full inline-flex items-center justify-center text-center text-white"
              to="/order"
            >
              <IoMdArrowRoundBack className="h-5 w-5  mr-2" />
              Qaytish
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default MySingleOrderPage;
