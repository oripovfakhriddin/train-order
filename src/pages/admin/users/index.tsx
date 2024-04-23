import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { BsPersonPlus } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { ENDPOINT } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUsers } from "../../../redux/slices/user";
import registerSchema from "../../../schema/register";
import request from "../../../server/request";
import RegisterFormValues from "../../../types/register";

const AdminUsersPage = () => {
  const { users, loading, total } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string | null>(null);
  const [openPassword, setOpenPassword] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
  } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema) });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, callback]);

  const showEditModal = () => {
    resetField("email");
    resetField("fullName");
    resetField("gender");
    resetField("number");
    resetField("password");
    setIsEditModalOpen(true);
    setSelected(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const showDeleteModal = (id: string) => {
    setIsDeleteModalOpen(true);
    setUserId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteUser = async () => {
    const { data } = await request.delete(`user/delete`, {
      params: { id: userId },
    });
    if (data.status === "SUCCESS") {
      toast.success(data.data);
      closeDeleteModal();
      refetch();
    }
  };

  const editUser = async (id: string) => {
    setSelected(id);

    const { data } = await request.get("user/get-by-id", {
      params: { id },
    });

    setValue("number", data.data.number, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("email", data.data.email, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("gender", data.data.gender, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("fullName", data.data.fullName, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("password", "12345", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setIsEditModalOpen(true);
  };

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    if (selected === null) {
      await axios.post(`${ENDPOINT}auth/sign-up`, values);
      toast.success("Foydalanuvchi muvaffaqiyatli qo'shildi!");
    } else {
      const { data } = await request.put(`user/update-profile`, values, {
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
          id="crud-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        <section id="users">
          <div className="flex items-center justify-between">
            <div>
              <h1>Total: {total}</h1>
            </div>
            <div className="mb-4">
              <label
                className="text-[12px] inline-block mb-[6px]"
                htmlFor="emailSearch"
              >
                Email
              </label>
              <input
                placeholder="Email entry"
                id="emailSearch"
                className="w-full border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px]  border-[#ccc] 
                  rounded border-[1px] outline-1 outline-[#b7cff9]"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                className="text-[12px] inline-block mb-[6px]"
                htmlFor="numberSearch"
              >
                Number
              </label>
              <input
                placeholder="+998900000000"
                id="numberSearch"
                className="w-full border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px]  border-[#ccc] 
                  rounded border-[1px] outline-1 outline-[#b7cff9]"
                type="text"
              />
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
              <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    F.I.O
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Telefon
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jinsi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-end">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th className="px-6 py-4">{index + 1}.</th>
                    <td className="px-6 py-4">{user.fullName}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.number}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.gender}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-2 text-end flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          editUser(user.id);
                        }}
                        className="focus:outline-none inline-flex items-center justify-between text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900"
                      >
                        <BiEditAlt className="h-5 w-5  mr-2" />
                        Tahrirlash
                      </button>

                      <button
                        onClick={() => {
                          showDeleteModal(user.id);
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

      {/* START delete user Modal  */}
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
                onClick={deleteUser}
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
      {/* FINISH delete user Modal  */}

      {/* START edit user Modal*/}
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
                {selected === null
                  ? "Foydalanuvchi qo'shish"
                  : "Foydalanuvchini tahrirlash"}
              </h3>
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
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
                  htmlFor="fullName"
                >
                  Full name
                </label>
                <input
                  placeholder="Full name entry"
                  id="fullName"
                  {...register("fullName")}
                  className="w-full border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px]  border-[#ccc] 
                  rounded border-[1px] outline-1 outline-[#b7cff9]"
                  type="text"
                />
                {errors?.fullName && (
                  <p className="text-red-500 text-[14px]">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="text-[12px] inline-block mb-[6px]"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  placeholder="Email entry"
                  id="email"
                  {...register("email")}
                  className="w-full border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px]  border-[#ccc] 
                  rounded border-[1px] outline-1 outline-[#b7cff9]"
                  type="text"
                />
                {errors?.email && (
                  <p className="text-red-500 text-[14px]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="text-[12px] inline-block mb-[6px]"
                  htmlFor="number"
                >
                  Phone number
                </label>
                <input
                  defaultValue="+9989"
                  placeholder="Phone number entry"
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
                  htmlFor="password"
                >
                  Password
                </label>

                <div className="input-group relative h-[41.6px]">
                  <input
                    placeholder="Password entry"
                    id="password"
                    {...register("password")}
                    className="w-full float-left border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px] 
                    table-cell border-[#ccc] rounded border-[1px] outline-1 outline-[#b7cff9]"
                    type={openPassword ? "text" : "password"}
                  />
                  <span className="absolute top-[50%] -translate-y-1/2  right-0">
                    <button
                      type="button"
                      className="py-[10px] px-[12px]"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenPassword(!openPassword);
                      }}
                    >
                      {openPassword ? (
                        <FaRegEye className="hover:text-[#393939] text-[#6b6a6a]" />
                      ) : (
                        <FaRegEyeSlash className="hover:text-[#393939] text-[#6b6a6a]" />
                      )}
                    </button>
                  </span>
                </div>
                {errors?.password && (
                  <p className="text-red-500 text-[14px]">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="text-[12px] inline-block mb-[6px]"
                  htmlFor="username"
                >
                  Gender:
                </label>
                <select
                  {...register("gender")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                   dark:focus:border-blue-500"
                >
                  <option value="OTHER">Other</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 transition-all duration-500 bg-[#1D2D5B] text-white rounded hover:bg-[#303c60]"
              >
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
      {/* FINISH edit user Modal  */}
    </Fragment>
  );
};

export default AdminUsersPage;
