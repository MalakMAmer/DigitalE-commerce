import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast, ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const API_URL = import.meta.env.VITE_API_URL;


function FavProducts() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')
  const isLoggedIn = !!token

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('🦄 يجب عليك تسجيل الدخول لرؤية المنتجات المفضلة!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      })
      setLoading(false)
      return
    }

    fetch(`${API_URL}/api/user/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setFavorites(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        toast.error('❌ فشل تحميل المنتجات المفضلة', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        })
        setLoading(false)
      })
  }, [isLoggedIn, token])

  if (loading) return <div className="max-w-6xl mx-auto p-4 text-center">جاري التحميل...</div>

  if (!isLoggedIn) return (
    <div className="max-w-6xl mx-auto p-4 text-center">
      <p className="mb-4">ليس لديك حساب؟</p>
      <Link
        to="/signup"
        className="inline-block bg-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition-all"
      >
        إنشاء حساب
      </Link>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  )

  if (favorites.length === 0) return <div className="max-w-6xl mx-auto p-4 text-center">لا توجد منتجات مفضلة بعد.</div>

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">منتجاتك المفضلة</h2>
      {favorites.map(product => (
        <motion.div
          key={product._id}
          className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={product.image || 'https://via.placeholder.com/150x150?text=No+Image'}
            alt={product.name}
            className="w-24 h-24 object-contain rounded-lg"
          />
          <div className="flex-1 mx-4">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 ltr">{product.price} IQD</p>
          </div>
          <Link
            to={`/products/${product._id}`}
            className="inline-block border border-purple-200 bg-purple-100 text-purple-500 px-4 py-2 rounded-full font-semibold hover:bg-purple-200 transition-all"
          >
            عرض المنتج
          </Link>
        </motion.div>
      ))}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  )
}

export default FavProducts
