import { Fragment, useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { Menu, X } from "lucide-react";

import VagonLogo from "../../../../assets/wagon_logo.png";
import { TOKEN, USER, USER_ID } from "../../../../constants";
import { AuthContext } from "../../../../context/auth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const controlModal = () => {
    setOpenModal(!openModal);
  };

  const logOutFunction = () => {
    Cookies.remove(TOKEN);
    Cookies.remove(USER_ID);
    localStorage.removeItem(USER);
    setIsAuthenticated(false);
    navigate("/");
    setOpenModal(false);
  };

  const Links = isAuthenticated
    ? [
        { name: "Bosh sahifa", link: "/" },
        { name: "Vagon", link: "/wagon" },
        { name: "Buyurtmalar", link: "/order" },
        { name: "Hisob", link: "/account" },
      ]
    : [
        { name: "Bosh sahifa", link: "/" },
        { name: "Vagon", link: "/wagon" },
        { name: "Kirish", link: "/login" },
        { name: "Ro'yhatdan o'tish", link: "/register" },
      ];

  return (
    <Fragment>
      <div className="shadow-md w-full">
        <div className="md:flex items-center justify-between relative container mx-auto  py-4 ">
          <div
            className="font-bold text-2xl cursor-pointer flex items-center  font-[Poppins] 
      text-gray-300"
          >
            <span className="text-3xl text-indigo-600 mr-1 pt-2"></span>
            <Link to="/" className="flex gap-2 items-center">
              <img className="w-10" src={VagonLogo} alt="Train image" />
              <span className="text-gray-300">Vagron buyurtmasi</span>
            </Link>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-[10px] top-6 cursor-pointer md:hidden"
          >
            {open ? <X /> : <Menu />}
          </div>

          <ul
            className={`md:flex md:items-center bg-dark-purple md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-[72px] " : "top-[-490px]"
            }`}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-6 text-xl md:my-0 my-7">
                <NavLink
                  to={link.link}
                  onClick={() => setOpen(false)}
                  className={` hover:text-gray-100 ${
                    location.pathname === link.link
                      ? "text-gray-100"
                      : "text-gray-400"
                  }  duration-500`}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {isAuthenticated ? (
              <li className="md:ml-6 text-xl md:my-0 my-7">
                <button onClick={controlModal}>
                  <span className="hover:text-red-500 text-red-700">
                    Chiqish
                  </span>
                </button>
              </li>
            ) : (
              ""
            )}
          </ul>
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

export default Header;
