import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react' // Added ShoppingCart icon
import logo from '../assets/Logo.png'

function Navbar() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const changeLang = () => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')

  return (
    <>

      <nav className="w-full bg-white/85 backdrop-blur-xl border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-1 px-6">

          {/* Left: Login + "Have an account?" + Cart */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/favProduct"
              className="text-purple-700 hover:text-purple-500 transition-all"
            >
              <ShoppingCart size={24} />
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1 bg-black text-white hover:bg-purple-700 px-4 py-2 rounded-md font-semibold text-sm transition-all transform hover:scale-105"
            >
              <span className="text-sm">↩</span> {t('nav.signup') || ' سجل الآن!'}
            </Link>
            <Link
              to="/login"
              className=" p-2 text-sm"
            >
              <span className="text-gray-600 font-medium  hover:text-purple-700 cursor-pointer  transition-all">لديك حساب؟</span>
            </Link>
            
            
          </div>

          {/* Center: Menu Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
            <Link to="/" className="cursor-pointer hover:text-purple-400 transition-all">
              {t('nav.home') || 'الرئيسية'}
            </Link>
            <ScrollLink
              to="offers"
              smooth={true}
              duration={50}   
              offset={-80}
              className="cursor-pointer hover:text-purple-400 transition-all"
            >
              {t('nav.offers') || 'العروض'}
            </ScrollLink>
            <ScrollLink
              to="digitalProducts"
              smooth={true}
              duration={50}  
              offset={-80}
              className="cursor-pointer hover:text-purple-400 transition-all"
            >
              {t('nav.products') || 'المتجر'}
            </ScrollLink>
            <ScrollLink
              to="contactUs"
              smooth={true}
              duration={50}     
              offset={-80}
              className="cursor-pointer hover:text-purple-400 transition-all"
            >
              {t('nav.contact') || 'اتصل بنا'}
            </ScrollLink>
          </div>

          {/* Right: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BMD Logo" className="w-20 p-2 h-auto" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-purple-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-300 shadow-lg text-center"
            >
              <div className="flex flex-col gap-2 text-gray-800 font-medium p-4">
                <Link onClick={() => setIsOpen(false)} to="/" className="cursor-pointer hover:text-purple-400 transition-all">
                  {t('nav.home') || 'الرئيسية'}
                </Link>
                <ScrollLink
                  onClick={() => setIsOpen(false)}
                  to="digitalProducts"
                  smooth={true}
                  duration={50} 
                  offset={-80}
                  className="cursor-pointer hover:text-purple-400 transition-all"
                >
                  {t('nav.products') || 'المتجر'}
                </ScrollLink>
                <ScrollLink
                  onClick={() => setIsOpen(false)}
                  to="offers"
                  smooth={true}
                  duration={50}  
                  offset={-80}
                  className="cursor-pointer hover:text-purple-400 transition-all"
                >
                  {t('nav.offers') || 'العروض'}
                </ScrollLink>
                <ScrollLink
                  onClick={() => setIsOpen(false)}
                  to="contactUs"
                  smooth={true}
                  duration={50}  
                  offset={-80}
                  className="cursor-pointer hover:text-purple-400 transition-all"
                >
                  {t('nav.contact') || 'اتصل بنا'}
                </ScrollLink>

                {/* Mobile Login + Cart */}
                <div className="flex items-center justify-center gap-3 mt-2">
                  <Link
                    to="/login"
                    className=" p-2 text-sm"
                  >
                    <span className="text-gray-600 font-medium  hover:text-purple-700 cursor-pointer  transition-all">لديك حساب؟</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1 bg-black text-white hover:bg-purple-700 px-4 py-2 rounded-md font-semibold text-sm transition-all"
                  >
                    <span className="text-sm">↩</span> {t('nav.signup') || 'تسجيل الدخول'}
                  </Link>
                  <Link
                    to="/favProduct"
                    onClick={() => setIsOpen(false)}
                    className="text-purple-700 hover:text-purple-500 transition-all"
                  >
                    <ShoppingCart size={24} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="h-16 w-full"></div>

    </>
    
  )
}

export default Navbar
