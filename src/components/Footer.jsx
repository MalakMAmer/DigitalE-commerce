import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import logo from '../assets/Logo.png'

function Footer() {
  return (
    <>
      <footer className="bg-[#300c66] border-t border-purple-200/40 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-10 text-gray-100">

          {/* Logo & Description */}
          <div className="flex-1 flex flex-col items-center md:items-start gap-3 text-center md:text-right">
            <img src={logo} alt="BMD Logo" className="w-32 h-auto" />
            <h2 className="text-2xl font-bold text-purple-300">
              نوفر لك كل ما تحتاجه عبر الأنترنت
            </h2>
            <p className="text-sm text-gray-200">
              استمتع بتجربة ترفيهية متكاملة مع متجرنا، وتصفح من بين مجموعة متنوعة من الخدمات والمنتجات والاشتراكات والألعاب الرائعة عبر متجرنا
            </p>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <h3 className="font-semibold mb-2 text-xl">روابط</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="relative after:block after:w-0 after:h-[2px] after:bg-purple-300 after:transition-all after:duration-300 hover:after:w-full">
                الرئيسية
              </Link>
              <Link to="/products" className="relative after:block after:w-0 after:h-[2px] after:bg-purple-300 after:transition-all after:duration-300 hover:after:w-full">
                المنتجات
              </Link>
              <Link to="/services" className="relative after:block after:w-0 after:h-[2px] after:bg-purple-300 after:transition-all after:duration-300 hover:after:w-full">
                الخدمات
              </Link>
              <Link to="/about" className="relative after:block after:w-0 after:h-[2px] after:bg-purple-300 after:transition-all after:duration-300 hover:after:w-full">
                حول
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <h3 className="font-semibold mb-2 text-xl">تواصل معنا</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-purple-300 transition hover:scale-110"><FaFacebookF size={20} /></a>
              <a href="#" className="hover:text-purple-300 transition hover:scale-110"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-purple-300 transition hover:scale-110"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-purple-300 transition hover:scale-110"><FaLinkedinIn size={20} /></a>
            </div>

            {/* Clickable Email */}
            <a 
              href="mailto:support@bmdiq.com" 
              className="text-md text-blue-200 hover:text-purple-200 transition"
            >
              support@bmdiq.com
            </a>
          </div>

        </div>

        {/* Bottom Gradient Line */}
        <div className="mt-10 w-full">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-60"></div>
          
          <div className="text-center text-gray-300 text-sm mt-4">
            © {new Date().getFullYear()} جميع حقوق الطبع والنشر محفوظة لـ BMD STORE
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
