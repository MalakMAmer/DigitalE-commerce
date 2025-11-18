import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react'
import logo from '../assets/Logo.png'
import { FaReply } from "react-icons/fa";

function Navbar() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const changeLang = () => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')

  // Update cart count whenever localStorage changes
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartCount(cart.length)
    }

    updateCart() // initial load

    window.addEventListener('storage', updateCart)
    return () => window.removeEventListener('storage', updateCart)
  }, [])

  // Prevent scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return (
    <>
      <nav className="w-full bg-white/85 backdrop-blur-xl border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-1 px-6">

          {/* Left: Cart + Login */}
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/cart" className="relative text-[var(--purple-light)] hover:text-purple-500 transition-all">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/signup" className="inline-flex items-center gap-1 bg-black text-white hover:bg-purple-700 px-4 py-2 rounded-md font-semibold text-sm transition-all transform hover:scale-105">
              <span className="text-sm"> <FaReply /> </span> {t('nav.signup') || 'سجل الآن!'}
            </Link>

            <Link to="/login" className="p-2 text-sm">
              <span className="text-gray-600 font-medium hover:text-purple-700 cursor-pointer transition-all">
                لديك حساب؟
              </span>
            </Link>
          </div>

          {/* Center: Menu Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
            <Link to="/" className="cursor-pointer hover:text-purple-400 transition-all">
              {t('nav.home') || 'الرئيسية'}
            </Link>
            <ScrollLink to="offers" smooth={true} duration={50} offset={-80} className="cursor-pointer hover:text-purple-400 transition-all">
              {t('nav.offers') || 'العروض'}
            </ScrollLink>
            <ScrollLink to="digitalProducts" smooth={true} duration={50} offset={-80} className="cursor-pointer hover:text-purple-400 transition-all">
              {t('nav.products') || 'المتجر'}
            </ScrollLink>
            <ScrollLink to="contactUs" smooth={true} duration={50} offset={-80} className="cursor-pointer hover:text-purple-400 transition-all">
              {t('nav.contact') || 'اتصل بنا'}
            </ScrollLink>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BMD Logo" className="w-20 p-2 h-auto" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-purple-700" onClick={() => setIsOpen(true)} aria-label="menu">
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black w-screen h-screen z-40"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 h-screen w-72 bg-white z-50 shadow-xl p-6 flex flex-col"
              >
                <button onClick={() => setIsOpen(false)} className="self-end text-purple-700 mb-6">
                  <X size={28} />
                </button>

                <div className="flex flex-col gap-6 text-gray-800 font-medium mt-4">
                  <Link onClick={() => setIsOpen(false)} to="/" className="hover:text-purple-400 transition-all">
                    {t('nav.home') || 'الرئيسية'}
                  </Link>
                  <ScrollLink onClick={() => setIsOpen(false)} to="offers" smooth={true} duration={50} offset={-80} className="hover:text-purple-400 transition-all">
                    {t('nav.offers') || 'العروض'}
                  </ScrollLink>
                  <ScrollLink onClick={() => setIsOpen(false)} to="digitalProducts" smooth={true} duration={50} offset={-80} className="hover:text-purple-400 transition-all">
                    {t('nav.products') || 'المتجر'}
                  </ScrollLink>
                  <ScrollLink onClick={() => setIsOpen(false)} to="contactUs" smooth={true} duration={50} offset={-80} className="hover:text-purple-400 transition-all">
                    {t('nav.contact') || 'اتصل بنا'}
                  </ScrollLink>
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-gray-200 my-6">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-600 text-center font-medium hover:text-purple-700 transition-all text-sm">
                    لديك حساب؟
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-1 justify-center bg-black text-white hover:bg-purple-700 px-4 py-2 rounded-md font-semibold text-sm transition-all">
                    <span className="text-sm px-1"><FaReply /></span> {t('nav.signup') || 'تسجيل الدخول'}
                  </Link>
                  <Link to="/cart" onClick={() => setIsOpen(false)} className="flex justify-center items-center text-purple-700 hover:text-purple-500 py-2 rounded-md font-semibold bg-purple-100 transition-all relative">
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <div className="h-16 w-full"></div>
    </>
  )
}

export default Navbar
