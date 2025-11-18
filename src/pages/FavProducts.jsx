import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast, ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function FavProducts() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false); // visitor sees products immediately
      return;
    }

    axios.get(`${API_URL}/api/user/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setFavorites(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('❌ فشل تحميل المنتجات المفضلة', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Slide,
        });
        setLoading(false);
      });
  }, [isLoggedIn, token]);

  const isFavorite = (productId) => {
    if (!isLoggedIn || !Array.isArray(favorites)) return false;
    return favorites.some(fav => fav._id === productId);
  }

  if (loading) return <div className="max-w-6xl mx-auto p-4 text-center">جاري التحميل...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        {isLoggedIn ? 'منتجاتك المفضلة' : 'جميع المنتجات'}
      </h2>

      {favorites.length === 0 && isLoggedIn && (
        <div className="max-w-6xl mx-auto p-4 text-center">لا توجد منتجات مفضلة بعد.</div>
      )}

      {/* Map products, for visitors just display all products without favorite check */}
      {favorites.map(product => (
        <motion.div
          key={product._id}
          className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/150x150?text=No+Image'}
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

      {!isLoggedIn && (
        <div className="text-center mt-4">
          <p className="text-gray-500">🦄 تسجيل الدخول لإضافة منتجات إلى المفضلة</p>
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
  );
}

export default FavProducts;
