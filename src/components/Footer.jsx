import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-purple-50 border-t border-purple-200 py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
        {/* Logo & Brand */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <h2 className="text-2xl font-bold text-purple-700">منتجات رقمية</h2>
          <p className="text-sm text-gray-600 text-center md:text-left">
            أفضل المنتجات الرقمية المصممة خصيصاً لاحتياجاتك.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col justify-center items-center gap-2">
          <h3 className="font-semibold mb-2 text-xl">روابط</h3>
          <div className="flex lg:flex-row justify-center items-center gap-3">
            <Link
              to="/"
              className="relative after:block after:w-0 after:h-[2px] after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              الرئيسية
            </Link>
            <Link
              to="/products"
              className="relative after:block after:w-0 after:h-[2px] after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              المنتجات
            </Link>
            <Link
              to="/services"
              className="relative after:block after:w-0 after:h-[2px] after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              الخدمات
            </Link>
            <Link
              to="/about"
              className="relative after:block after:w-0 after:h-[2px] after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              حول
            </Link>
          </div>
        </div>

        {/* Socials & Contact */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="font-semibold mb-2">تواصل معنا</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-purple-700 transition hover:transform hover:scale-105"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-purple-700 transition hover:transform hover:scale-105"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-purple-700 transition hover:transform hover:scale-105"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-purple-700 transition hover:transform hover:scale-105"><FaLinkedinIn size={20} /></a>
          </div>
          <p className="text-sm text-gray-500 mt-2">info@digitalproducts.com</p>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} منتجات رقمية. جميع الحقوق محفوظة.
      </div>
    </footer>
  )
}

export default Footer
