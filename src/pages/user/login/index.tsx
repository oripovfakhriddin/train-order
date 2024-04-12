import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";

import Logo from "../../../assets/wagon_logo.png";

const LoginPage = () => {
  const [openPassword, setOpenPassword] = useState(false);

  return (
    <div>
      <section id="login" className="flex items-center w-full">
        {/* Login image section */}
        <div className="w-1/2 py-[20%]  h-full hidden md:flex items-center justify-center relative">
          <img className="w-64" src={Logo} alt="Train" />
        </div>

        {/* Login form section */}
        <div className="md:w-1/2 py-[20%] w-full h-full flex items-center justify-center">
          <div className="w-[330px] ">
            <h1 className="text-center text-[32px]">Login</h1>
            <form autoComplete="off" className="flex flex-col ga">
              <div className="mb-4">
                <label
                  className="text-[12px] inline-block mb-[6px]"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  placeholder="Username entry"
                  id="username"
                  className="w-full border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px]  border-[#ccc] rounded border-[1px] outline-1 outline-[#b7cff9]"
                  type="text"
                />
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
                    className="w-full float-left border-solid px-[12px] leading-[1.42857143] text-[14px] py-[10px] table-cell border-[#ccc] rounded border-[1px] outline-1 outline-[#b7cff9]"
                    type={openPassword ? "text" : "password"}
                  />
                  <span className="absolute top-[50%] -translate-y-1/2  right-0">
                    <button
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
              </div>
              <button
                type="submit"
                className="px-4 py-2 transition-all duration-500 bg-[#1D2D5B] text-white rounded hover:bg-[#303c60]"
              >
                Login
              </button>
            </form>
          </div>
          <div className="absolute bottom-2.5 text-[12px] text-center">
            Copyright © 2024 of Oripov Fakhriddin
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
