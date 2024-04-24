import { Fragment, useContext, useEffect, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BiSolidUserDetail } from "react-icons/bi";
import { BiTrain } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import Control from "../../../assets/control.png";
import Logo from "../../../assets/logo.png";
import { TOKEN, USER, USER_ID } from "../../../constants";
import { AuthContext } from "../../../context/auth";
import useScreenSize from "../../../hooks/useScreen";

const AdminLayout = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const screen = useScreenSize();
  const [openModal, setOpenModal] = useState(false);

  const controlModal = () => {
    setOpenModal(!openModal);
  };

  const Menus = [
    {
      title: "Dashboard",
      src: <AiFillDashboard className="h-6 w-6" />,
      to: "dashboard",
    },
    {
      title: "Foydalanuvchilar",
      src: <BiSolidUserDetail className="h-6 w-6" />,
      to: "users",
    },
    {
      title: "Buyurtmalar",
      src: <FaTableList className="h-6 w-6" />,
      to: "orders",
    },
    {
      title: "Bekor qilingan buyurtmalar",
      src: <FaTableList className="h-6 w-6 text-red-500" />,
      to: "canceled-orders",
    },
    { title: "Vagonlar ", src: <BiTrain className="h-6 w-6" />, to: "wagons" },
    {
      title: "Profil",
      src: <FaRegUserCircle className="h-6 w-6" />,
      to: "accounts",
    },
  ];

  useEffect(() => {
    screen <= 672 ? setOpen(false) : setOpen(true);
  }, [screen]);

  const logOutFunction = () => {
    localStorage.removeItem(USER);
    Cookies.remove(TOKEN);
    Cookies.remove(USER_ID);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <Fragment>
      <div className="flex">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple p-5 fixed h-full pt-8 duration-300`}
        >
          <img
            src={Control}
            className={`absolute cursor-pointer -right-3 ${
              open ? "top-9" : "top-11"
            } w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src={Logo}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Train Order
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li key={index}>
                <NavLink
                  className={`flex  rounded-md p-2 cursor-pointer mb-3 hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
               ${
                 location.pathname.split("/")[2] === Menu.to &&
                 "bg-light-white text-green-500"
               } `}
                  to={Menu.to}
                >
                  {Menu.src}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </NavLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  controlModal();
                }}
                className={`flex  rounded-md p-2 cursor-pointer bg-red-600 
              text-gray-300 text-sm items-center gap-x-4 "mt-9"  w-full `}
              >
                <BiLogOut className="h-6 w-6" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {"Profildan chiqish"}
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div
          className={` ${
            open ? "ml-[288px]" : "ml-[80px]"
          } h-screen  flex-1 p-3`}
        >
          <Outlet />
        </div>
      </div>

      {/* START Confirm log out Modal  */}
      <div
        className={`${
          openModal ? "flex" : "hidden"
        } fixed backdrop-blur top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={controlModal}
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
                Profilingizdan chiqishni tasdiqlaysizmi?
              </h3>
              <button
                onClick={logOutFunction}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Tasdiqlash
              </button>
              <button
                onClick={controlModal}
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
    </Fragment>
  );
};

export default AdminLayout;
