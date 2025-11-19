import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineShoppingCart, AiOutlineTag, AiOutlineStar } from "react-icons/ai";
import OffersSlider from "../components/OffersSlider";
import AllProducts from "../pages/AllProducts";
import Categories from "../components/Categories";
import AllProductSec from "../components/AllProductSec";

const API_URL = import.meta.env.VITE_API_URL;

function DigitalProductsSection() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // ------------------------------------------------
  // Add to Cart Handler
  // ------------------------------------------------
  const addToCart = async (product) => {
    if (!isLoggedIn) {
      toast.error("يجب تسجيل الدخول أولاً لإضافة المنتج إلى السلة");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/user/favorites/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedFavs = res.data.favorites;
      setFavorites(updatedFavs);

      const isNowFav = updatedFavs.includes(product._id);
      toast.success(isNowFav ? "تمت إضافة المنتج إلى السلة" : "تمت إزالة المنتج من السلة");
    } catch (err) {
      console.error(err);
      toast.error("فشل تحديث السلة");
    }
  };

  // ------------------------------------------------
  // Fetch Products Only
  // ------------------------------------------------
  const fetchProducts = async () => {
    try {
      const productsRes = await axios.get(`${API_URL}/api/products`);
      let allProducts = Array.isArray(productsRes.data) ? productsRes.data : [];

      allProducts = allProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setProducts(allProducts.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------------------------------
  // Fetch Favorites Only When Logged In
  // ------------------------------------------------
  const fetchFavorites = async () => {
    if (!isLoggedIn) {
      toast.error("يجب تسجيل الدخول أولاً لإضافة المنتج إلى السلة");
      return;
    }
    try {
      const favRes = await axios.get(`${API_URL}/api/user/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const existingFavs = Array.isArray(favRes.data)
        ? favRes.data.map((p) => p._id)
        : [];

      setFavorites(existingFavs);
    } catch (error) {
      console.error("Favorites fetch skipped because user isn't logged in.");
    }
  };

  useEffect(() => {
    fetchProducts();

    if (isLoggedIn) {
      fetchFavorites();
    }
  }, [isLoggedIn, token]);

  
  return (
    <section className="py-20 px-6 bg-white" dir="rtl">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">

        {/* Offers Section */}
        <div className="mb-20" id="offers">
          <div className="text-center mb-10" id="offers">
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-[var(--purple-light)] mb-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              أحدث العروض
            </motion.h2>
            <p className="text-gray-600">عروض مميزة + منتجات مختارة</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OffersSlider />

            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => {
                const isInFavorites = favorites.includes(product._id);

                return (
                  <div
                    key={product._id}
                    className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition-all overflow-hidden relative"
                  >
                    <span className="absolute top-2 left-2 bg-green-600 text-white font-extrabold text-xs md:text-sm px-3 py-1 rounded-sm shadow-md border-2 border-white rotate-[-2deg] flex items-center gap-1">
                      <AiOutlineStar className="text-white text-sm" />
                      جديد
                    </span>

                    <img
                      src={
                        product.images?.[0] ||
                        product.image ||
                        "https://via.placeholder.com/400"
                      }
                      className="w-full h-32 object-cover"
                      alt={product.name}
                    />

                    <div className="p-3 text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex gap-1 items-center">
                          <AiOutlineTag className="text-purple-600 text-sm" />
                          {product.name}
                        </h3>
                      </div>

                      <p className="text-[var(--purple-light)] font-bold text-sm mb-2">
                        {product.price} د.ع
                      </p>

                      <button
                        onClick={() => addToCart(product)}
                        className={`w-full flex justify-center items-center text-sm py-1.5 rounded-xl mb-2 transition-all 
                          ${
                            isInFavorites
                              ? "bg-purple-600 text-white hover:bg-purple-700"
                              : "bg-green-600 text-white"
                          }`}
                      >
                        <AiOutlineShoppingCart className="text-white m-1" />
                        {isInFavorites ? "تمت الإضافة" : "إضافة إلى السلة"}
                      </button>

                      <Link
                        to={`/product/${product._id}`}
                        className="block text-center bg-[var(--purple-light)] text-white text-sm py-1.5 rounded-xl hover:bg-[var(--purple-light-trans)] transition-all"
                      >
                        عرض التفاصيل
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section Title */}
        <motion.h2
          className="text-3xl font-extrabold text-center text-purple-700 mb-10"
          id="digitalProducts"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          منتجات رقمية بأسعار مميزة
        </motion.h2>

        {/* All Products */}
        <Categories />
        {/* <AllProducts /> */}
      </div>
    </section>
  );
}

export default DigitalProductsSection;
