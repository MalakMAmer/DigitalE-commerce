import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user?.role || "user");

      toast.success("✅ تم تسجيل الدخول بنجاح!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });

      setTimeout(() => {
        if (res.data.user?.role === "admin") navigate("/dashboard");
        else navigate("/");
      }, 2200);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ فشل تسجيل الدخول", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4">
      <div className="bg-white p-8 sm:p-12 md:p-16 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4 text-center">تسجيل الدخول</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-200"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-200"
          />
          <button
            type="submit"
            className="p-3 mt-2 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold rounded-lg hover:opacity-90 transition-all"
          >
            دخول
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        rtl
        pauseOnHover
        draggable
        theme="colored"
      />
    </section>
  );
}

export default SignInPage;
