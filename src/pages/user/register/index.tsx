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
import { ENDPOINT, TOKEN, USER } from "../../../constants";
import { AuthContext } from "../../../context/auth";
import registerSchema from "../../../schema/register";
import RegisterFormValues from "../../../types/register";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [openPassword, setOpenPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${ENDPOINT}auth/sign-up`, values);
      Cookies.set(TOKEN, data.token);
      localStorage.setItem(USER, JSON.stringify(values));
      toast.success(data.message);
      setIsAuthenticated(true);
      setUser(data);
      navigate("/login");
    } catch (err) {
      toast.error("Kiritilgan ma'lumotlaringizni tekshiring!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section
        style={{ backgroundImage: `url(${LogoLogin})` }}
        id="register"
        className="flex bg-no-repeat bg-cover justify-center items-center h-[100vh] w-full"
      >
        {/* Register form section */}
        <div className="md:w-1/2 w-full backdrop-blur-[4px] sm:p-10 p-5 flex items-center justify-center">
          <div className="w-[330px] ">
            <h1 className="text-center text-[32px]">Hisob yaratish</h1>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col ga"
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
                {loading ? "Kutilmoqda" : "Kirish"}
              </button>
            </form>
            <div className="flex mt-4 items-center justify-center gap-3">
              <p>Profilingiz bormi?</p>
              <Link
                to="/login"
                className="text-[#1D2D5B] underline decoration-solid
                transition-all duration-500
                hover:text-blue-700
                "
              >
                Tizimga kirish
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default RegisterPage;
