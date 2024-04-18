import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import Calendar from "../../../assets/Calendar.png";
import Chart from "../../../assets/Chart.png";
import Chart_fill from "../../../assets/Chart_fill.png";
import Chat from "../../../assets/Chat.png";
import Control from "../../../assets/control.png";
import Folder from "../../../assets/Folder.png";
import Logo from "../../../assets/logo.png";
import Search from "../../../assets/Search.png";
import Setting from "../../../assets/Setting.png";
import User from "../../../assets/User.png";
import useScreenSize from "../../../hooks/useScreen";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const screen = useScreenSize();
  const Menus = [
    { title: "Dashboard", src: Chart_fill, to: "dashboard" },
    { title: "Inbox", src: Chat, to: "inbox" },
    { title: "Accounts", src: User, to: "accounts", gap: true },
    { title: "Schedule ", src: Calendar, to: "schedule" },
    { title: "Search", src: Search, to: "search" },
    { title: "Analytics", src: Chart, to: "analytics" },
    { title: "Files ", src: Folder, to: "files", gap: true },
    { title: "Setting", src: Setting, to: "setting" },
  ];

  useEffect(() => {
    screen <= 672 ? setOpen(false) : setOpen(true);
  }, [screen]);

  return (
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
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  location.pathname.split("/")[2] === Menu.to &&
                  "bg-light-white text-green-500"
                } `}
                to={Menu.to}
              >
                <img src={Menu.src} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={` ${open ? "ml-[288px]" : "ml-[80px]"} h-screen  flex-1 p-3`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
