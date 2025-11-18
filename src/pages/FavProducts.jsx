import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast, ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import { AiOutlineShoppingCart, AiOutlineDelete } from 'react-icons/ai'
import Lottie from 'lottie-react'
import loadingAnimation from '../assets/loading.json'

const API_URL = import.meta.env.VITE_API_URL

function FavProducts() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const token = localStorage.getItem("token")
  const isLoggedIn = !!token

  // Fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        let favs = []
        if (isLoggedIn) {
          const res = await axios.get(`${API_URL}/api/user/favorites`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          favs = Array.isArray(res.data) ? res.data : []
        } else {
          const localFavs = JSON.parse(localStorage.getItem("favorites") || "[]")
          favs = Array.isArray(localFavs) ? localFavs : []
        }
        setFavorites(favs)

        const localCart = JSON.parse(localStorage.getItem("cart") || "[]")
        setCart(Array.isArray(localCart) ? localCart : [])
      } catch (err) {
        console.error(err)
        toast.error('❌ فشل تحميل المنتجات', {
          position: "top-right",
          autoClose: 5000,
          transition: Slide,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [isLoggedIn, token])

    

  // Handle storage changes (for localStorage sync)
  useEffect(() => {
    const handleStorageChange = () => {
      const localFavs = JSON.parse(localStorage.getItem("favorites") || "[]")
      setFavorites(Array.isArray(localFavs) ? localFavs : [])
    }

    window.addEventListener("storage", handleStorageChange)
      return () => window.removeEventListener("storage", handleStorageChange)
    }, [])

    const removeFavorite = async (id) => {
      try {
        if (isLoggedIn) {
          const res = await axios.post(`${API_URL}/api/user/favorites/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          })
          setFavorites(res.data.favorites)
          toast.info('تم إزالة المنتج من المفضلة', { autoClose: 2000 })
        } else {
          const updated = favorites.filter(p => p._id !== id)
          setFavorites(updated)
          localStorage.setItem("favorites", JSON.stringify(updated))
          toast.info('تم إزالة المنتج من المفضلة', { autoClose: 2000 })
        }
      } catch (err) {
        console.error(err)
        toast.error('فشل إزالة المنتج', { autoClose: 2000 })
      }
  }

  const addToCart = (product) => {
    const exists = cart.find(p => p._id === product._id)
    if (!exists) {
      const updatedCart = [...cart, product]
      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      toast.success('تمت إضافة المنتج إلى السلة', { position: 'top-right', autoClose: 2000 })
    } else {
      toast.info('المنتج موجود بالفعل في السلة', { position: 'top-right', autoClose: 2000 })
    }
  }

  if (loading) return (
    <div className="max-w-6xl min-h-screen mx-auto p-4 flex items-center justify-center">
      <Lottie animationData={loadingAnimation} loop autoplay style={{ height: 250, width: 250 }} />
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6 min-h-screen p-6" dir="rtl">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        {isLoggedIn ? 'منتجاتك المفضلة' : 'منتجات مفضلة'}
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-20">لا توجد منتجات مفضلة بعد.</div>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {favorites.map(product => {
            const inCart = cart.some(p => p._id === product._id)
            return (
              <motion.div
                key={product._id}
                className="bg-white shadow-md rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src={product.images?.[0] || product.image || 'https://via.placeholder.com/150x150?text=لا+يوجد+صورة'}
                  alt={product.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-lg"
                />
                <div className="flex-1 text-right mx-4">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 font-bold mt-1">{product.price} د.ع</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-all w-full sm:w-auto"
                  >
                    <AiOutlineShoppingCart />
                    {inCart ? 'في السلة' : 'أضف إلى السلة'}
                  </button>

                  <Link
                    to={`/product/${product._id}`}
                    className="inline-block border border-purple-200 bg-purple-100 text-purple-500 px-4 py-2 rounded-xl font-semibold hover:bg-purple-200 transition-all text-center w-full sm:w-auto"
                  >
                    عرض المنتج
                  </Link>

                  <button
                    onClick={() => removeFavorite(product._id)}
                    className="flex items-center justify-center gap-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all w-full sm:w-auto"
                  >
                    <AiOutlineDelete />
                    إزالة
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {!isLoggedIn && (
        <div className="text-center mt-6">
          <p className="text-gray-500">🦄 سجّل الدخول لإضافة منتجات إلى المفضلة</p>
          <Link
            to="/signup"
            className="inline-block bg-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition-all mt-2"
          >
            إنشاء حساب
          </Link>
        </div>
      )}

      <ToastContainer transition={Slide} />
    </div>
  )
}

export default FavProducts
