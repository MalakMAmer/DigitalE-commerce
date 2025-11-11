import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../assets/Logo.png'

function Navbar() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const changeLang = () => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')

  return (
    <nav className="w-full bg-white/85 backdrop-blur-xl border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-1 px-6">

        {/* Left: Login Button */}
        <Link
          to="/login"
          className="hidden sm:inline-flex items-center gap-1 bg-black text-white hover:bg-purple-700 px-4 py-2 rounded-md font-semibold text-sm transition-all"
        >
          <span className="text-sm">↩</span> {t('nav.login') || 'تسجيل الدخول'}
        </Link>

        {/* Center: Menu Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
          <Link to="/">{t('nav.home') || 'الرئيسية'}</Link>
          <Link to="/products">{t('nav.products') || 'المتجر'}</Link>
          <Link to="/offers">{t('nav.offers') || 'العروض'}</Link>
          <Link to="/contact">{t('nav.contact') || 'اتصل بنا'}</Link>
        </div>

        {/* Right: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BMD Logo" className="w-20 h-auto" />
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
            <div className="flex flex-col gap-4 py-4 text-gray-800 font-medium">
              <Link onClick={() => setIsOpen(false)} to="/">{t('nav.home') || 'الرئيسية'}</Link>
              <Link onClick={() => setIsOpen(false)} to="/products">{t('nav.products') || 'المتجر'}</Link>
              <Link onClick={() => setIsOpen(false)} to="/offers">{t('nav.offers') || 'العروض'}</Link>
              <Link onClick={() => setIsOpen(false)} to="/contact">{t('nav.contact') || 'اتصل بنا'}</Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center bg-black text-white hover:bg-purple-700 px-4 py-2 rounded-md font-semibold text-sm transition-all"
              >
                <span className="text-sm">↩</span> {t('nav.login') || 'تسجيل الدخول'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
