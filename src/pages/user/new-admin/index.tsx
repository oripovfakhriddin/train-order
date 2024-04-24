import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";

import LogoLogin from "../../../assets/login-2.webp";
import loginSchema from "../../../schema/login";
import request from "../../../server/request";
import AdminFormValues from "../../../types/admin";

const AddNewAdmin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<AdminFormValues> = async (values) => {
    try {
      setLoading(true);
      const { data } = await request.post(
        "user/change-role-to-admin-or-add-new-admin",
        values
      );
      toast.success(data.message);
      navigate("/login");
      setLoading(false);
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
            <h1 className="text-center text-[32px]">Admin bo'lish</h1>
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
                  <p className="text-blue-500 text-[14px]">
                    {errors.email.message}
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
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AddNewAdmin;
