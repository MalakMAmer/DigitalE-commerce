import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: formData.name || "",
      email: formData.email || "",
    },
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);


  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, data);
      toast.success(res.data.message || "تم التسجيل بنجاح 🎉", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      reset();
      setTimeout(() => navigate("/signin"), 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء التسجيل ❌", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };


  return (
    <div className="p-32 flex justify-center items-center bg-purple-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">صفحة التسجيل</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="الاسم"
            {...register("name", { required: "الاسم مطلوب" })}
            className="p-3 border border-gray-300 rounded-lg"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            {...register("email", {
              required: "البريد الإلكتروني مطلوب",
              pattern: { value: /^\S+@\S+$/i, message: "بريد إلكتروني غير صالح" },
            })}
            className="p-3 border border-gray-300 rounded-lg"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="كلمة المرور"
            {...register("password", {
              required: "كلمة المرور مطلوبة",
              minLength: { value: 6, message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" },
            })}
            className="p-3 border border-gray-300 rounded-lg"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          <button
            type="submit"
            className="p-3 mt-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-all"
          >
            تسجيل
          </button>
        </form>
      </div>


      {/* Toastify container */}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl
        pauseOnHover
        draggable
        theme="colored"
        toastClassName="rounded-xl text-sm sm:text-base"
        bodyClassName="flex items-center justify-center text-center"
      />
    </div>
  );
}

export default SignUpPage;
