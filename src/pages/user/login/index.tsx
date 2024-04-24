import { Fragment, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Cookies from "js-cookie";

import LogoLogin from "../../../assets/login-2.webp";
import { ENDPOINT, TOKEN, USER, USER_ID } from "../../../constants";
import { AuthContext } from "../../../context/auth";
import loginSchema from "../../../schema/login";
import request from "../../../server/request";
import LoginFormValues from "../../../types/login";
import User from "../../../types/user";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  interface LoginDataTypes {
    data: {
      accessToken: string;
      refreshToken: string;
      user: User;
    };
  }

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      setLoading(true);
      const {
        data: { data: loginData },
      } = await axios.post<LoginDataTypes>(`${ENDPOINT}auth/sign-in`, values);
      request.defaults.headers.Authorization = `Bearer ${loginData?.accessToken}`;
      Cookies.set(USER_ID, loginData.user.id);
      Cookies.set(TOKEN, loginData.accessToken);
      localStorage.setItem(USER, JSON.stringify(loginData.user));
      setIsAuthenticated(true);
      setUser(loginData.user);
      if (loginData.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err) {
        toast.error("Bunday foydalanuvchi mavjud emas!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section
        style={{ backgroundImage: `url(${LogoLogin})` }}
        id="login"
        className="flex bg-no-repeat bg-cover items-center justify-center h-[100vh] w-full"
      >
        {/* Login form section */}
        <div className="md:w-1/2 w-full backdrop-blur-[4px] sm:p-10 p-5 flex items-center rounded-2xl justify-center">
          <div className="w-[330px] md:w-96 ">
            <h1 className="text-center text-[32px]">Hisobga kirish</h1>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col ga"
            >
              <div className="mb-4">
                <label
                  className="text-[12px] inline-block mb-[6px]"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  placeholder="Emain entry"
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
              <button
                type="submit"
                className="px-4 py-2 transition-all duration-500 bg-[#1D2D5B] text-white rounded hover:bg-[#303c60]"
              >
                {loading ? "Kutilmoqda" : "Kirish"}
              </button>
            </form>
            <div className="flex mt-4 items-center justify-center gap-3">
              <p>Profilingiz yo'qmi?</p>
              <Link
                to="/register"
                className="text-[#1D2D5B] hover:text-blue-700 underline decoration-solid
                transition-all duration-500
                
                "
              >
                Ro'yhatdan o'tish
              </Link>
            </div>
            <div className="flex mt-4 items-center justify-center gap-3">
              <Link
                to="https://t.me/HK34_7"
                className="text-[#1D2D5B] hover:text-blue-700 underline decoration-solid
                transition-all duration-500
                
                "
              >
                Parolingizni unutdingizmi?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginPage;
