import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FaBolt, FaGift, FaLightbulb } from 'react-icons/fa'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function SignUpSection() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    toast.success(`🎉 شكراً لانضمامك يا ${data.name}!`, {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
      style: { backgroundColor: "#7c3aed", color: "#fff", borderRadius: "12px" },
    })

    setTimeout(() => {
      navigate("/signup", { state: data })
      reset()
    }, 2200)
  }

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50" id='contactUs'>
      <div
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg p-10 lg:p-16 rounded-3xl shadow-2xl border border-purple-100 text-center relative z-10"
        data-aos="fade-up"
      >
        {/* Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-purple-700 mb-4"
        >
          اشترك في نشرتنا لتصلك أحدث العروض الرقمية والخصومات
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-700 mb-10 text-lg leading-relaxed"
        >
          انضم إلى مستخدمينا للحصول على الكوبونات الحصرية والصفقات الخاصة قبل الجميع.
        </motion.p>

        {/* Highlights */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-purple-700 bg-gray-100 px-4 py-2 rounded-full">
            <FaBolt className="text-lg" />
            <span>خصومات فورية</span>
          </div>
          <div className="flex items-center gap-2 text-purple-700 bg-gray-100 px-4 py-2 rounded-full">
            <FaLightbulb className="text-lg" />
            <span>عروض مخصصة لك</span>
          </div>
          <div className="flex items-center gap-2 text-purple-700 bg-gray-100 px-4 py-2 rounded-full">
            <FaGift className="text-lg" />
            <span>هدايا رقمية مجانية</span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="اسمك"
            {...register('name', { required: 'الاسم مطلوب' })}
            className="p-3 rounded-xl border border-gray-300 w-full sm:w-auto flex-1 focus:outline-none focus:ring-4 focus:ring-purple-200"
          />
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            {...register('email', {
              required: 'البريد الإلكتروني مطلوب',
              pattern: { value: /^\S+@\S+$/i, message: 'بريد إلكتروني غير صالح' }
            })}
            className="p-3 rounded-xl border border-gray-300 w-full sm:w-auto flex-1 focus:outline-none focus:ring-4 focus:ring-purple-200"
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold rounded-xl hover:opacity-90 transition-all w-full lg:w-auto shadow-md hover:shadow-lg"
          >
            اشترك الآن
          </button>
        </motion.form>

        {/* Error messages */}
        <div className="mt-3 text-red-500 text-sm">
          {errors.name && <p>{errors.name.message}</p>}
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Note */}
        <motion.p
          className="mt-8 text-gray-500 text-sm"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          نحن نحترم خصوصيتك ولن نشارك بريدك الإلكتروني مع أي جهة خارجية.
        </motion.p>
      </div>

      {/* Floating gradient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-200/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-purple-300/20 blur-3xl rounded-full"></div>

      {/* Toast container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        rtl
        pauseOnHover
        draggable
        theme="colored"
        toastClassName="rounded-xl text-sm sm:text-base"
        bodyClassName="flex items-center justify-center text-center"
      />
    </section>
  )
}

export default SignUpSection
