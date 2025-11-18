import './App.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useTranslation } from 'react-i18next'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import FavProducts from './pages/FavProducts'
import PaymentForm from './pages/PaymentForm'
import FormBill from './pages/FormBill'
import AllProducts from './pages/AllProducts'

function App() {
  const { i18n } = useTranslation()
  const [dir, setDir] = useState('rtl')
  const isLoggedIn = localStorage.getItem('auth') === 'true'

  useEffect(() => {
    AOS.init({ duration: 700, once: true })
  }, [])

  useEffect(() => {
    const isAr = i18n.language === 'ar'
    setDir(isAr ? 'rtl' : 'ltr')
    document.documentElement.lang = isAr ? 'ar' : 'en'
    document.documentElement.dir = isAr ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <div className={dir === 'rtl' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/cart" element={<FavProducts />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/bill" element={<FormBill />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
      </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
