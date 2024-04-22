import { Fragment, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";
import { FcBusinesswoman } from "react-icons/fc";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";

import CompanyIcon from "../../../components/icons-svg/company";
import { TOKEN, USER, USER_ID } from "../../../constants";
import { AuthContext } from "../../../context/auth";
import registerSchema from "../../../schema/register";
import request from "../../../server/request";
import RegisterFormValues from "../../../types/register";
import User from "../../../types/user";

const AdminAccountsPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema) });
  const navigate = useNavigate();
  const [callback, setCallback] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openLogOutModal, setOpenLogOutModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const refetch = () => {
    setCallback(!callback);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const controlLogOutModal = () => {
    setOpenLogOutModal(!openLogOutModal);
  };

  const controlDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const getUserData = async () => {
    setLoading(false);
    const { data } = await request.get("user/get-by-id", {
      params: { id: Cookies.get(USER_ID) },
    });
    setUserData(data.data);
    setLoading(false);
  };

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    setEditLoading(true);
    const { data } = await request.put(`user/update-profile`, values, {
      params: { id: Cookies.get(USER_ID) },
    });
    setEditLoading(false);
    toast.success(data.message);
    setIsEditModalOpen(false);
    refetch();
  };

  const logOutFunction = () => {
    localStorage.removeItem(USER);
    Cookies.remove(TOKEN);
    Cookies.remove(USER_ID);
    setIsAuthenticated(false);
    navigate("/");
  };

  const editUser = async () => {
    const { data } = await request.get("user/get-by-id", {
      params: { id: Cookies.get(USER_ID) },
    });

    const { data: userData } = data;

    setValue("number", userData?.number, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("email", userData?.email, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("gender", userData?.gender, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("fullName", userData?.fullName, {
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

  const deleteUserFunction = async () => {
    const { data } = await request.delete("user/delete", {
      params: { id: Cookies.get(USER_ID) },
    });

    toast.info(data.message);
  };

  useEffect(() => {
    getUserData();
  }, [callback]);

  console.log(userData);

  return (
    <Fragment>
      {loading ? (
        <div
          id="crud-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        <section id="account">
          <div className="container">
            <h1 className="text-xl sm:text-4xl text-center">Mening Profilim</h1>
            <div>
              <div className="md:grid grid-cols-4 grid-rows-2  bg-white gap-2 p-1 sm:p-4 rounded-xl">
                <div className="md:col-span-1  shadow-xl ">
                  <div className="flex w-full h-full relative">
                    {userData?.gender === "MALE" ? (
                      <FcBusinessman className="w-52 h-52 m-auto" />
                    ) : userData?.gender === "FEMALE" ? (
                      <FcBusinesswoman className="w-52 h-52 m-auto" />
                    ) : (
                      <CompanyIcon className="w-52 h-52 m-auto" />
                    )}
                  </div>
                </div>
                <div className="md:col-span-3  shadow-xl p-1 sm:p-4 py-4 space-y-2 ">
                  <div className="flex item items-center">
                    <span className="text-sm   font-bold uppercase border-2 rounded-l px-2 py-2 bg-gray-200 whitespace-no-wrap w-2/6">
                      F.I.O.:
                    </span>
                    <p className="px-4 border-2 py-[6px] border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                      {userData?.fullName}
                    </p>
                  </div>
                  <div className="flex item items-center">
                    <span className="text-sm  font-bold uppercase border-2 rounded-l px-2 py-2 bg-gray-300 whitespace-no-wrap w-2/6">
                      Raqami:
                    </span>
                    <p className="px-4 border-2 py-[6px] border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                      {userData?.number}
                    </p>
                  </div>
                  <div className="flex item items-center">
                    <span className="text-sm   font-bold uppercase border-2 rounded-l px-2 py-2 bg-gray-200 whitespace-no-wrap w-2/6">
                      Jinsi:
                    </span>
                    <p className="px-4 border-2 py-[6px] border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                      {userData?.gender}
                    </p>
                  </div>
                  <div className="flex item items-center">
                    <span className="text-sm   font-bold uppercase border-2 rounded-l px-2 py-2 bg-gray-300 whitespace-no-wrap w-2/6">
                      Email:
                    </span>
                    <p className="px-4 border-2 py-[6px] border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                      {userData?.email}
                    </p>
                  </div>
                  <div className="flex item items-center">
                    <span className="text-sm  font-bold uppercase border-2 rounded-l px-2 py-2 bg-gray-300 whitespace-no-wrap w-2/6">
                      Role:
                    </span>
                    <p className="px-4 border-2 py-[6px] border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                      {userData?.role}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-4 shadow-xl p-4 space-y-2  md:block">
                  <h3 className="font-bold uppercase"> Profile Description</h3>
                  <p className="">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris eget laoreet diam, id luctus lectus. Ut consectetur
                    nisl ipsum, et faucibus sem finibus vitae. Maecenas aliquam
                    dolor at dignissim commodo. Etiam a aliquam tellus, et
                    suscipit dolor. Proin auctor nisi velit, quis aliquet sapien
                    viverra a.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between flex-col sm:flex-row gap-4 p-1 sm:p-4">
                <button
                  type="button"
                  onClick={editUser}
                  className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-sky-900"
                >
                  <BiEditAlt className="h-6 w-6  mr-2" />
                  Tahrirlash
                </button>
                <button
                  type="button"
                  onClick={controlLogOutModal}
                  className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-orange-900"
                >
                  <BiLogOut className="h-6 w-6 mr-2" />
                  Chiqish
                </button>
                <button
                  onClick={controlDeleteModal}
                  className="focus:outline-none w-full inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <RiDeleteBin5Fill className="h-6 w-6  mr-2" />
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

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
                Profilimni tahrirlash
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
                {editLoading ? "Bajarilmoqda..." : "Tasdiqlash"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* FINISH edit user Modal  */}

      {/* START Confirm log out Modal  */}
      <div
        className={`${
          openLogOutModal ? "flex" : "hidden"
        } fixed backdrop-blur top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={controlLogOutModal}
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
                Hisobingizdan chiqishni tasdiqlaysizmi?
              </h3>
              <button
                onClick={logOutFunction}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Tasdiqlash
              </button>
              <button
                onClick={controlLogOutModal}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* FINISH Confirm log out Modal  */}

      {/* START Confirm Delete Modal  */}
      <div
        className={`${
          openDeleteModal ? "flex" : "hidden"
        } fixed backdrop-blur top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={controlDeleteModal}
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
                className="mx-auto mb-4 text-red-600 w-12 h-12 dark:text-gray-200"
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
                Hisobingizni o'chirishni tasdiqlaysizmi?
              </h3>
              <button
                onClick={deleteUserFunction}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Tasdiqlash
              </button>
              <button
                onClick={controlDeleteModal}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* FINISH Confirm Delete Modal  */}
    </Fragment>
  );
};

export default AdminAccountsPage;
