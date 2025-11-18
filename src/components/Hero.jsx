import React from 'react'
import { motion } from 'framer-motion'
import { FaReply } from 'react-icons/fa'

function Hero() {
  return (
    <section
      dir="rtl"
      className="relative flex flex-col justify-center items-center text-center px-6 py-32 min-h-screen overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] via-[var(--purple-light-trans2)]  from-[var(--purple-light-trans)]  to-white"
      id='home'
    >
      {/* Glowing background spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500 via-violet-400 to-transparent opacity-70 blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center max-w-4xl gap-5">
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-extrabold text-black leading-snug"
        >
          اكتشف أفضل العروض <br /> والمنتجات الرقمية في <span className="text-white">BMD Store</span>
        </motion.h1>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-800 max-w-2xl"
        >
          وفر أكثر مع كوبوناتنا الحصرية وخصوماتنا المميزة على البرمجيات، البطاقات، الكورسات، والأدوات الرقمية — كل ما تحتاجه في مكان واحد.
        </motion.p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#offers"
          className="mt-4 inline-flex items-center gap-2 px-8 py-3 text-lg font-medium bg-black text-white rounded-xl shadow-md transition-all hover:bg-gray-900"
        >
          <span>تسوق الآن</span>
          <span className="text-sm px-1"> <FaReply /> </span>
        </motion.a>
      </div>

      {/* Stats */}
      <div className="relative z-10 mt-16 flex flex-wrap justify-center gap-12 text-center">
        <div>
          <p className="text-3xl font-bold text-white">+300</p>
          <p className="text-gray-700">عرض رقمي</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">+80K</p>
          <p className="text-gray-700">مستخدم نشط</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">+150</p>
          <p className="text-gray-700">كوبون خصم</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-3xl text-gray-700"
      >

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-800">
        <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-gray-800 rounded-full animate-bounce"></div>
        </div>
      </div>
      </motion.div>
    </section>
  )
}

export default Hero
