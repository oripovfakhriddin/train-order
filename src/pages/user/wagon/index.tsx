import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getWagons } from "../../../redux/slices/wagon";
import orderSchema from "../../../schema/order";
import request from "../../../server/request";
import OrderFormValues from "../../../types/order";

const UserWagonPage = () => {
  const { wagons, loading, total } = useAppSelector((state) => state.wagon);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wagonId, setWagonId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: yupResolver(orderSchema),
  });

  const onSubmit: SubmitHandler<OrderFormValues> = async (values) => {
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
      wagonId: wagonId,
      fromWhere: values.fromWhere,
      toWhere: values.toWhere,
    };

    if (
      dataOrder.startTime !== dataOrder.endTime &&
      dataOrder.fromWhere !== dataOrder.toWhere
    ) {
      const { data } = await request.post("/order/save", dataOrder);
      toast.success(data.message);
    } else {
      toast.error("Siz kiritga qiymatlarda xatolik mavjud");
    }
  };

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setWagonId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const [callback, setCallback] = useState(false);

  useEffect(() => {
    dispatch(getWagons());
    // dispatch(getUsers());
  }, [dispatch]);

  // const refetch = () => {
  //   setCallback(!callback);
  // };

  return (
    <Fragment>
      {loading ? (
        <div
          id="crud-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        <section id="wagons">
          <div className="container">
            <div className="flex items-center justify-center">
              <div>
                <h1>Vagonlar soni: {total}</h1>
              </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Raqami
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <p>
                        Hajmi( <span>m</span>
                        <sup>3</sup> )
                      </p>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Turi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Narxi(soat/$)
                    </th>
                    <th scope="col" className="px-6 py-3 text-end">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wagons.map((wagon, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {wagon.number}
                      </th>
                      <td className="px-6 py-4">{wagon.capacity}</td>
                      <td className="px-6 py-4">{wagon.type}</td>
                      <td className="px-6 py-4">{wagon.price}</td>
                      <td className="px-6 py-4 text-end">
                        <button
                          type="submit"
                          onClick={() => {
                            showModal(wagon.id);
                          }}
                          className="text-white w-28 text-center justify-center inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Band qilish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* START Order Modal  */}
      <div
        id="order-modal"
        aria-hidden="true"
        className={`${
          isModalOpen ? "flex" : "hidden"
        } backdrop-blur overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 
        justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                type="button"
                onClick={closeModal}
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
                    <option value="Namangan">Namangan</option>
                    <option value="Toshkent">Toshkent</option>
                    <option value="Andijon">Andijon</option>
                    <option value="Farg'ona">Farg'ona</option>
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
                    <option value="Namangan">Namangan</option>
                    <option value="Toshkent">Toshkent</option>
                    <option value="Andijon">Andijon</option>
                    <option value="Farg'ona">Farg'ona</option>
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
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Band qilish
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FINISH Order Modal  */}
    </Fragment>
  );
};

export default UserWagonPage;
