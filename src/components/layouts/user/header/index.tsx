import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { Menu, X } from "lucide-react";

import VagonLogo from "../../../../assets/wagon_logo.png";

const Header = () => {
  const location = useLocation();

  const Links = [
    { name: "Bosh sahifa", link: "/" },
    { name: "Poyezd", link: "/train" },
    { name: "Hisob", link: "/account" },
    { name: "Login", link: "/login" },
  ];

  const [open, setOpen] = useState<boolean>(false);
  return (
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
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <X /> : <Menu />}
        </div>

        <ul
          className={`md:flex md:items-center bg-dark-purple md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-0 " : "top-[-490px]"
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
        </ul>
      </div>
    </div>
  );
};

export default Header;
