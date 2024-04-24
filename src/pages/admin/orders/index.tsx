import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
// import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";

import { TRAIN_STATION } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllUsersOrders } from "../../../redux/slices/orders";
import orderSchema from "../../../schema/order";
import request from "../../../server/request";
import OrderFormValues from "../../../types/order";

const AdminOrdersPage = () => {
  const { loading, usersOrders, total } = useAppSelector(
    (state) => state.allUsersOrders
  );
  const dispatch = useAppDispatch();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<null | string>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [callback, setCallback] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const refetch = () => {
    setCallback(!callback);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({ resolver: yupResolver(orderSchema) });

  useEffect(() => {
    dispatch(getAllUsersOrders());
  }, [dispatch, callback]);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const showDeleteModal = (id: string) => {
    setIsDeleteModalOpen(true);
    setOrderId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const showCancelModal = (id: string) => {
    setIsCancelModalOpen(true);
    setOrderId(id);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const cancelOrder = async () => {
    try {
      setCancelLoading(true);
      const { data } = await request.put(
        "order/cancel",
        { orderId },
        { params: { id: orderId } }
      );
      setIsCancelModalOpen(false);
      setCancelLoading(false);
      if (data.status === "SUCCESS") {
        toast.success(data.message);
        refetch();
      }
    } finally {
      setCancelLoading(false);
      refetch();
    }
  };

  const deleteOrder = async () => {
    const { data } = await request.delete(`order/delete`, {
      params: { id: orderId },
    });
    if (data.status === "SUCCESS") {
      toast.success(data.data);
      closeDeleteModal();
      refetch();
    }
  };

  const editOrder = async (id: string) => {
    setSelected(id);
    setOrderId(id);
    const { data: orderData } = await request.get("order/get-order-by-id", {
      params: { id },
    });

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
    setIsEditModalOpen(true);
  };

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
        if (selected === null) {
          const { data } = await request.post("/order/save", dataOrder);
          setEditLoading(false);
          toast.success(data.message);
          closeEditModal();
          refetch();
        } else {
          const { data } = await request.put(
            "/order/change-order-time",
            dataOrder,
            {
              params: { id: orderId },
            }
          );
          setEditLoading(false);
          toast.success(data.message);
          closeEditModal();
        }
      } else {
        toast.error("Siz kiritga qiymatlarda xatolik mavjud");
      }
      refetch();
    } finally {
      setEditLoading(false);
      refetch();
    }
  };

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
          <div className="flex items-center justify-between my-4">
            <div>
              <h1 className="text-xl ml-2">Buyurtmalar</h1>
            </div>
            <div>
              <h4 className="text-sm px-5 py-3 bg-sky-300 rounded-lg">
                Jami: {total}
              </h4>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-[16px] text-gray-700  bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3 text-center">
                    #
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Egasi
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Boshlanish vaqti
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Tugash vaqti
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Qayerdan
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Qayerga
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Narxi($)
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-center
                  "
                  >
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-300 transition-all border-b dark:border-gray-700"
                  >
                    <th className="px-2 py-2 text-center">{index + 1}.</th>
                    <td className="px-2 py-2">{order.owner.fullName}</td>
                    <td className="px-2 py-2 text-center">
                      <p>{order.startTime.split(" ")[0]}</p>
                      <p>{order.startTime.split(" ")[1]}</p>
                    </td>
                    <td className="px-2 py-2 text-center">
                      {" "}
                      <p>{order.endTime.split(" ")[0]}</p>
                      <p>{order.endTime.split(" ")[1]}</p>
                    </td>
                    <td className="px-2 py-2">{order.fromWhere}</td>
                    <td className="px-2 py-2">{order.toWhere}</td>

                    <th
                      scope="row"
                      className="px-2 py-2 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.price}
                    </th>
                    <td className="px-6 py-2 text-end flex items-center justify-end">
                      {order?.cancel ? (
                        <button
                          type="button"
                          onClick={() => {
                            toast.info(
                              "Ushbu buyurtma allaqachon bekor qilingan!"
                            );
                          }}
                          className="focus:outline-none w-[132px] inline-flex items-center justify-center text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-900"
                        >
                          Bekor qilingan
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            showCancelModal(order?.id);
                          }}
                          className="focus:outline-none inline-flex w-[130px] items-center justify-center text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900"
                        >
                          Bekor qilish
                        </button>
                      )}

                      {order?.cancel ? (
                        <button
                          type="button"
                          onClick={() => {
                            toast.info(
                              "Ushbu buyurtma allaqachon bekor qilingan!"
                            );
                          }}
                          className="focus:outline-none inline-flex items-center justify-between text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-900"
                        >
                          <BiEditAlt className="h-5 w-5  mr-2" />
                          Tahrirlash
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            editOrder(order.id);
                          }}
                          className="focus:outline-none inline-flex items-center justify-between text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-blue-900"
                        >
                          <BiEditAlt className="h-5 w-5  mr-2" />
                          Tahrirlash
                        </button>
                      )}

                      <button
                        onClick={() => {
                          showDeleteModal(order.id);
                        }}
                        className="focus:outline-none inline-flex items-center justify-between text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        <RiDeleteBin5Fill className="h-5 w-5  mr-2" />
                        O'chirish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
                    onClick={cancelOrder}
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

          {/* START delete order Modal  */}
          <div
            className={`${
              isDeleteModalOpen ? "flex" : "hidden"
            } fixed backdrop-blur top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full`}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeDeleteModal}
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
                    className="mx-auto mb-4 text-orange-400 w-12 h-12 dark:text-gray-200"
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
                    Ushbu foydalanuvchini o'chirishni tasdiqlaysizmi?
                  </h3>
                  <button
                    type="button"
                    onClick={deleteOrder}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Tasdiqlash
                  </button>
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Bekor qilish
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* FINISH delete order Modal  */}

          {/* START Order Modal  */}
          <div
            id="order-modal"
            aria-hidden="true"
            className={`${
              isEditModalOpen ? "flex" : "hidden"
            } backdrop-blur overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 
        justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
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
                        htmlFor="toWhere"
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
                    {/* <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Vagonni tanlang:
                      </label>
                      <select
                        {...register("wagonId")}
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
                    </div> */}
                  </div>

                  <button
                    type="submit"
                    className="text-white inline-flex w-full items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <IoIosCreate className="me-2 w-6 h-6" />
                    {editLoading
                      ? "Kuting..."
                      : selected === null
                      ? "Buyurtma qo'shish"
                      : "Tahrirlash"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* FINISH Order Modal  */}
        </section>
      )}
    </Fragment>
  );
};

export default AdminOrdersPage;
