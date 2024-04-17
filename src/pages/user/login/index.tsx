import { Fragment, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";

import LogoWagon from "../../../assets/wagon_logo.png";
import { TOKEN, USER } from "../../../constants";
import { AuthContext } from "../../../context/auth";
import loginSchema from "../../../schema/login";
import request from "../../../server/request";
import LoginFormValues from "../../../types/login";

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

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      setLoading(true);
      // const { data }: AxiosResponse<{ token: string }> = await axios.post(
      //   "https://reqres.in/api/login",
      //   values
      // );
      const { data } = await request.post("sign-in", values);
      Cookies.set(TOKEN, data.token);
      localStorage.setItem(USER, JSON.stringify(values));
      setIsAuthenticated(true);
      setUser(data);
      navigate("/");
    } catch (err) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section id="login" className="flex items-center h-[100vh] w-full">
        {/* Login image section */}
        <div className="w-1/2 h-full hidden md:flex items-center bg-[#1D2D5B] justify-center flex-col relative">
          <h1 className="text-white text-[32px]">Hisobga kirish</h1>
          <img className="w-64" src={LogoWagon} alt="Train" />
        </div>
        {/* Login form section */}
        <div className="md:w-1/2 w-full h-full flex items-center justify-center">
          <div className="w-[330px] ">
            <h1 className="text-center text-[32px]">Login</h1>
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
                className="text-[#1D2D5B] underline decoration-solid
                transition-all duration-500
                hover:text-red-600
                "
              >
                Ro'yhatdan o'tish
              </Link>
            </div>
          </div>
          <div className="absolute bottom-2.5 text-[12px] text-center">
            Copyright © 2024 of Oripov Fakhriddin
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginPage;
