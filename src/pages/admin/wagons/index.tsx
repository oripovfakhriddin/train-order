import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { BsPersonPlus } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";

import { WAGON_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getWagons } from "../../../redux/slices/wagon";
import wagonSchema from "../../../schema/wagon";
import request from "../../../server/request";
import WagonFormValues from "../../../types/wagon";
import Wagon from "../../../types/wagons";

const AdminWagonsPage = () => {
  const { wagons, loading, total } = useAppSelector((state) => state.wagon);
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [wagonId, setWagonId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [callback, setCallback] = useState(false);

  const refetch = () => {
    setCallback(!callback);
  };

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<WagonFormValues>({ resolver: yupResolver(wagonSchema) });

  useEffect(() => {
    dispatch(getWagons());
  }, [dispatch, callback]);

  const showEditModal = () => {
    resetField("number");
    resetField("capacity");
    resetField("type");
    resetField("description");
    setIsEditModalOpen(true);
    setSelected(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const showDeleteModal = (id: string) => {
    setIsDeleteModalOpen(true);
    setWagonId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteWagon = async () => {
    try {
      const { data } = await request.delete("wagon/delete", {
        params: {
          id: wagonId,
        },
      });
      toast.success(data.message);
      closeDeleteModal();
      refetch();
    } finally {
      closeDeleteModal();
      refetch();
    }
  };

  const editWagon = async (data: Wagon) => {
    setSelected(data.id);

    setValue("number", data.number, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("capacity", data.capacity, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("description", data.description, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("type", data.type, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setIsEditModalOpen(true);
  };

  const onSubmit: SubmitHandler<WagonFormValues> = async (values) => {
    if (selected === null) {
      const { data } = await request.post(`wagon/save`, values);
      toast.success(data.message);
    } else {
      const { data } = await request.put(`wagon/update-wagon`, values, {
        params: { id: selected },
      });
      toast.success(data.message);
    }
    setIsEditModalOpen(false);
    refetch();
  };

  return (
    <Fragment>
      {loading ? (
        <div
          id="loading-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        <section id="wagons">
          <div className="flex items-center justify-between my-4">
            <div>
              <h1 className="text-xl ml-2">Vagonlar</h1>
            </div>
            <div>
              <h4 className="text-sm px-5 py-3 bg-sky-300 rounded-lg">
                Jami: {total}
              </h4>
            </div>
            <div>
              <button
                type="submit"
                onClick={() => {
                  showEditModal();
                }}
                className="text-white w-full text-center justify-center inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <BsPersonPlus className="h-6 w-6 mr-3" />
                Qo'shish
              </button>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-[16px]  text-gray-700  bg-amber-400 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-1 md:px-4 md:py-3 text-center min-w-14"
                  >
                    #
                  </th>
                  <th scope="col" className="px-2 py-1 md:px-4 md:py-3">
                    Raqami
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 md:px-4 md:py-3 text-center min-w-36"
                  >
                    <p>
                      Hajmi( <span>m</span>
                      <sup>3</sup> )
                    </p>
                  </th>
                  <th scope="col" className="px-2 py-1 md:px-4 md:py-3">
                    Turi
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 md:px-4 md:py-3 text-center"
                  >
                    Narxi(soat/$)
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 md:px-4 md:py-3 text-center"
                  >
                    Tavsifi
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 md:px-4 md:py-3 text-end"
                  >
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody>
                {wagons.map((wagon, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 hover:bg-gray-300 transition-all even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th className="px-2 py-1 md:px-4 md:py-3 text-center">
                      {index + 1}.
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {wagon.number}
                    </th>
                    <td className="px-2 py-1 md:px-4 md:py-3 text-center">
                      {wagon.capacity}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-3">{wagon.type}</td>
                    <td className="px-2 py-1 md:px-4 md:py-3 text-center">
                      {wagon.price}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-3 text-center">
                      <p content={wagon.description}>
                        {wagon.description.slice(0, 20)}...
                      </p>
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-3 text-end flex items-center gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          editWagon(wagon);
                        }}
                        className="focus:outline-none inline-flex items-center justify-between text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900"
                      >
                        <BiEditAlt className="h-5 w-5  mr-2" />
                        Tahrirlash
                      </button>

                      <button
                        onClick={() => {
                          showDeleteModal(wagon.id);
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
        </section>
      )}

      {/* START delete wagon Modal  */}
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
                Ushbu vagonni o'chirishni tasdiqlaysizmi?
              </h3>
              <button
                type="button"
                onClick={deleteWagon}
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
      {/* FINISH delete wagon Modal  */}

      {/* START edit wagon Modal*/}
      <div
        id="crud-modal"
        aria-hidden="true"
        className={`${
          isEditModalOpen ? "flex" : "hidden"
        } overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selected === null ? "Vagon qo'shish" : "Vagonni tahrirlash"}
              </h3>
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            {/* <!-- Modal body --> */}

            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-4"
            >
              <div className="mb-4">
                <label
                  className="text-[12px] inline-block mb-[6px]"
                  htmlFor="number"
                >
                  Vagon raqami:
                </label>
                <input
                  placeholder="Vagon raqamini kiriting..."
                  id="number"
                  {...register("number")}
                  className="w-full border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px]  border-[#ccc] 
                  rounded border-[1px] outline-1 outline-[#b7cff9]"
                  type="text"
                />
                {errors?.number && (
                  <p className="text-red-500 text-[14px]">
                    {errors.number.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="text-[12px] inline-block mb-[6px]"
                  htmlFor="capacity"
                >
                  Vagon hajmi:
                </label>
                <input
                  placeholder="Hajmini kiriting..."
                  {...register("capacity")}
                  className="w-full border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px]  border-[#ccc] 
                  rounded border-[1px] outline-1 outline-[#b7cff9]"
                  type="text"
                />
                {errors?.capacity && (
                  <p className="text-red-500 text-[14px]">
                    {errors.capacity.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="text-[12px] inline-block mb-[6px]"
                  htmlFor="username"
                >
                  Vagon turi:
                </label>
                <select
                  {...register("type")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                   dark:focus:border-blue-500"
                >
                  {WAGON_TYPE.map((wagon, index) => (
                    <option key={index} value={wagon}>{wagon}</option>
                  ))}
                </select>
                {errors?.type && (
                  <p className="text-red-500 text-[14px]">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="text-[12px] inline-block mb-[6px]"
                  htmlFor="description"
                >
                  Vagon haqida:
                </label>
                <textarea
                  placeholder="Vagon haqida ma'lumot kiriting..."
                  {...register("description")}
                  className="w-full border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px]  border-[#ccc] 
                  rounded border-[1px] outline-1 outline-[#b7cff9]"
                />
                {errors?.description && (
                  <p className="text-red-500 text-[14px]">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="text-white inline-flex items-center justify-center w-full  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
                {loading
                  ? "Kutilmoqda"
                  : selected === null
                  ? "Qo'shish"
                  : "Tahrirlash"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* FINISH edit wagon Modal  */}
    </Fragment>
  );
};

export default AdminWagonsPage;
