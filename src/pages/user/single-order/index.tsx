import { useEffect, useState } from "react";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";

import { ORDER_ID, TRAIN_STATION } from "../../../constants";
import orderSchema from "../../../schema/order";
import request from "../../../server/request";
import OrderFormValues from "../../../types/order";
import UserOrdersTypes from "../../../types/user-orders";

interface UserOrderTypes extends UserOrdersTypes {
  type: string;
}

const MySingleOrderPage = () => {
  const [orderData, setOrderData] = useState<UserOrderTypes | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: yupResolver(orderSchema),
  });

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orderUserId, setOrderUserId] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const refetch = () => {
    setCallback(!callback);
  };

  const getSingleOrderData = async () => {
    setLoading(true);
    const { data } = await request.get("order/get-order-by-id", {
      params: { id: Cookies.get(ORDER_ID) },
    });
    setOrderData(data);
    setLoading(false);
  };

  useEffect(() => {
    getSingleOrderData();
  }, [callback]);

  const onSubmit: SubmitHandler<OrderFormValues> = async (values) => {
    try {
      setEditLoading(true);
      const startDateObjectDay = new Date(values.startTimeDay);
      const endDateObjectDay = new Date(values.endTimeDay);

      const d1 =
        startDateObjectDay.toISOString().split("T")[0] +
        "T" +
        values.startTimeDate;

      const d2 =
        endDateObjectDay.toISOString().split("T")[0] + "T" + values.endTimeDate;

      const dataOrder = {
        startTime: d1,
        endTime: d2,
        fromWhere: values.fromWhere,
        toWhere: values.toWhere,
      };
      if (
        dataOrder.startTime !== dataOrder.endTime &&
        dataOrder.fromWhere !== dataOrder.toWhere
      ) {
        const { data } = await request.put(
          "/order/change-order-time",
          dataOrder,
          {
            params: { id: orderUserId },
          }
        );
        setEditLoading(false);
        closeEditModal();
        refetch();
        toast.success(data.message);
      } else {
        toast.error("Siz kiritga qiymatlarda xatolik mavjud");
      }
    } finally {
      setEditLoading(false);
      refetch();
    }
  };

  const cancelUserOrder = async () => {
    try {
      setCancelLoading(true);
      const { data } = await request.put(
        "order/cancel",
        { orderUserId },
        { params: { id: orderUserId } }
      );
      if (data.status === "SUCCESS") {
        setCancelLoading(false);
        closeCancelModal();
        refetch();
        toast.success(data.message);
      }
      refetch();
    } finally {
      setCancelLoading(false);
      refetch();
    }
  };

  const showCancelModal = (id: string) => {
    setIsCancelModalOpen(true);
    setOrderUserId(id);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const showEditModal = (id: string) => {
    if (orderData) {
      setValue("startTimeDate", orderData?.startTime.split(" ")[1], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("startTimeDay", orderData?.startTime.split(" ")[0], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("fromWhere", orderData?.fromWhere, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("toWhere", orderData?.toWhere, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("endTimeDay", orderData?.endTime.split(" ")[0], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("endTimeDate", orderData?.endTime.split(" ")[1], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
    setIsEditModalOpen(true);
    setOrderUserId(id);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Fragment>
      {loading ? (
        <div
          id="crud-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        orderData && (
          <section className="mb-4">
            <div className="container flex flex-col items-center mt-4">
              <div
                className={`${
                  orderData.cancel ? "bg-red-300" : "bg-white"
                } p-2 sm:p-4 md:p-6 max-w-[800px] w-full  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Kim tomonidan: </p>
                  <p>{orderData?.owner.fullName} </p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Telefon raqami: </p>
                  <p>{orderData?.owner.number} </p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Jinsi: </p>
                  <p>{orderData?.owner.gender} </p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Buyurtma yaratilgan sana: </p>
                  <p>{orderData?.createdTime.split("T")[0]} </p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Buyurtma yaratilgan soat: </p>
                  <p>{orderData?.createdTime.split("T")[1].split(".")[0]} </p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Boshlanish kuni: </p>
                  <p>{orderData?.startTime.split(" ")[0]}</p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Boshlanish soati: </p>
                  <p>{orderData?.startTime.split(" ")[1]}</p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Tugash kuni: </p>
                  <p>{orderData?.endTime.split(" ")[0]}</p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Tugash soati: </p>
                  <p>{orderData?.endTime.split(" ")[1]}</p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Qayerdan: </p>
                  <p>{orderData?.fromWhere}</p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Qayerga: </p>
                  <p>{orderData?.toWhere}</p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Turi: </p>
                  <p>{orderData?.type}</p>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p>Narxi: </p>
                  <p>{orderData?.price} so'm</p>
                </div>
                <hr />
                <div className="flex items-center flex-col sm:flex-row justify-between gap-3 mt-6">
                  {orderData?.cancel ? (
                    <button
                      type="button"
                      onClick={() => {
                        toast.info("Ushbu buyurtma allaqachon bekor qilingan!");
                      }}
                      className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-sky-900"
                    >
                      <BiEditAlt className="h-5 w-5  mr-2" />
                      Tahrirlash
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        showEditModal(orderData?.id);
                      }}
                      className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-sky-900"
                    >
                      <BiEditAlt className="h-5 w-5  mr-2" />
                      Tahrirlash
                    </button>
                  )}

                  {orderData?.cancel ? (
                    <button className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-600">
                      Bekor qilingan
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        showCancelModal(orderData?.id);
                      }}
                      className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-600"
                    >
                      <MdOutlineCancel className="h-5 w-5 mr-2" />
                      Bekor qilish
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-5 max-w-[800px] w-full flex justify-center rounded-lg bg-dark-purple items-center">
                <Link
                  className="w-full inline-flex p-2 items-center justify-center text-center text-white"
                  to="/order"
                >
                  <IoMdArrowRoundBack className="h-5 w-5  mr-2" />
                  Qaytish
                </Link>
              </div>
            </div>
          </section>
        )
      )}

      {/* START Cancel order Modal  */}
      <div
        className={`${
          isCancelModalOpen ? "flex" : "hidden"
        } fixed backdrop-blur top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0  max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeCancelModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-orange-500 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {cancelLoading
                  ? "Bekor qilinmoqda..."
                  : "Ushbu buyurtmani bekor qilishni tasdiqlaysizmi?"}
              </h3>
              <button
                type="button"
                onClick={cancelUserOrder}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                {cancelLoading ? "Kuting..." : "Tasdiqlash"}
              </button>
              <button
                type="button"
                onClick={closeCancelModal}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* FINISH Cancel order Modal  */}

      {/* START Order Modal  */}
      <div
        id="order-modal"
        aria-hidden="true"
        className={`${
          isEditModalOpen ? "flex" : "hidden"
        } backdrop-blur overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 
        justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editLoading ? "O'zgartirilmoqda..." : "O'zgartirish!"}
              </h3>
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="order-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Boshlanish sanasi
                  </label>
                  <input
                    {...register("startTimeDay", { valueAsDate: true })}
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />{" "}
                  {errors?.startTimeDay && (
                    <p className="text-red-500 text-[14px]">
                      {errors.startTimeDay.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Boshlanish vaqti
                  </label>
                  <input
                    {...register("startTimeDate")}
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                  {errors?.startTimeDate && (
                    <p className="text-red-500 text-[14px]">
                      {errors.startTimeDate.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Qayerdan
                  </label>
                  <select
                    {...register("fromWhere")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {TRAIN_STATION.map((station, index) => (
                      <option key={index} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                  {errors?.fromWhere && (
                    <p className="text-red-500 text-[14px]">
                      {errors.fromWhere.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Qayerga
                  </label>
                  <select
                    {...register("toWhere")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {TRAIN_STATION.map((station, index) => (
                      <option key={index} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                  {errors?.toWhere && (
                    <p className="text-red-500 text-[14px]">
                      {errors.toWhere.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tugash sanasi
                  </label>
                  <input
                    {...register("endTimeDay", { valueAsDate: true })}
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                  />
                  {errors?.endTimeDay && (
                    <p className="text-red-500 text-[14px]">
                      {errors.endTimeDay.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tugash vaqti
                  </label>
                  <input
                    {...register("endTimeDate")}
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                  />
                  {errors?.endTimeDate && (
                    <p className="text-red-500 text-[14px]">
                      {errors.endTimeDate.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="text-white inline-flex w-full items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <IoIosCreate className="me-2 w-6 h-6" />
                {editLoading ? "Kuting..." : "Tahrirlash"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* FINISH Order Modal  */}
    </Fragment>
  );
};

export default MySingleOrderPage;
