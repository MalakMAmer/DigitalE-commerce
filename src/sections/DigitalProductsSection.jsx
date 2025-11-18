import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import bgHero from "../assets/bgHero.jpeg";
import AllProducts from "../pages/AllProducts";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  AiOutlineEye, 
  AiOutlineShoppingCart, 
  AiOutlineTag, 
  AiOutlineStar 
} from "react-icons/ai";



const API_URL = import.meta.env.VITE_API_URL;

function DigitalProductsSection() {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [current, setCurrent] = useState(0);
  const token = localStorage.getItem("token");
  const timerRef = useRef(null);

  // Fetch favorites only if logged in
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${API_URL}/api/user/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        let items = Array.isArray(res.data) ? res.data : [];

        // Sort by createdAt (newest first)
        items = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Store products and pick the newest 4
        setProducts(items.slice(0, 4));

      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);


  // Slider offers
  const offers = [
    { id: 1, title: "خصم 20% على كل المنتجات الرقمية", description: "اغتنم الفرصة واحصل على أفضل المنتجات بسعر مخفض.", image: bgHero },
    { id: 2, title: "اشتراك سنوي مجاني لأول 50 عميل", description: "كن من أوائل المشتركين واستمتع بالمزايا الحصرية.", image: bgHero },
    { id: 3, title: "هدايا مجانية عند شراء أي منتج", description: "احصل على منتجات رقمية إضافية مجانية عند كل عملية شراء.", image: bgHero },
  ];

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % offers.length);
    }, 4000);
  };

  useEffect(() => {
    AOS.init({ duration: 700 });
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const isFavorite = productId => favorites.some(fav => fav._id === productId);

  const toggleFavorite = async productId => {
    if (!token) {
      toast.warning("يجب تسجيل الدخول أولاً لإضافة المنتج للمفضلة");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/user/favorites/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(Array.isArray(res.data) ? res.data : []);
      toast.success("تمت إضافة/إزالة المنتج من المفضلة");
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ، حاول مرة أخرى");
    }
  };

  // Products filtering
  const filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);
  const displayedProducts = products;

  const nextSlide = () => { setCurrent(prev => (prev + 1) % offers.length); startTimer(); };
  const prevSlide = () => { setCurrent(prev => (prev - 1 + offers.length) % offers.length); startTimer(); };

  return (
    <section className="py-20 px-6 bg-white" dir="rtl">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">

        {/* === Offers Slider === */}
        <div className="mb-20" id="offers">
          <div className="text-center mb-10">
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--purple-light)]  mb-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              أحدث العروض
            </motion.h2>
            <p className="text-gray-600">عروض مميزة + منتجات مختارة</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Slider */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={offers[current].id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col bg-gradient-to-r from-white to-[var(--purple-light-trans2)] rounded-md shadow-lg border border-gray-100 overflow-hidden h-full"
                >
                  <img src={offers[current].image} alt={offers[current].title} className="w-full h-60 object-cover" />
                  <div className="p-6 text-right">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{offers[current].title}</h3>
                    <p className="text-gray-700">{offers[current].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-2 z-20 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-[var(--purple-light)] hover:text-white transition-all" style={{ direction: "ltr" }}>‹</button>
              <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-2 z-20 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-[var(--purple-light)] hover:text-white transition-all" style={{ direction: "ltr" }}>›</button>

              <div className="flex justify-center mt-4 gap-2">
                {offers.map((_, index) => (
                  <button key={index} onClick={() => { setCurrent(index); startTimer(); }} className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-[var(--purple-light)]" : "bg-gray-300"}`} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {displayedProducts.slice(0, 4).map(product => (
                <motion.div
                  key={product._id}
                  className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition-all overflow-hidden relative"
                  data-aos="fade-up"
                >

                  {/* NEW — Stamp Badge with Icon */}
                  <span
                    className="absolute top-2 left-2 bg-green-600 text-white font-extrabold 
                              text-xs md:text-sm px-3 py-1 rounded-sm shadow-md 
                              border-2 border-white rotate-[-2deg] select-none flex items-center gap-1"
                  >
                    <AiOutlineStar className="text-white text-sm" />
                    جديد
                  </span>

                  {/* Image */}
                  <img
                    src={product.images?.[0] || product.image || 'https://via.placeholder.com/400'}
                    className="w-full h-32 object-cover"
                    alt={product.title}
                  />

                  <div className="p-3 text-right">

                    {/* Title + Tag Icon */}
                    <div className="flex items-center gap-1 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex gap-1 items-center">
                        <AiOutlineTag className="text-purple-600 text-sm" />
                        {product.name}
                      </h3>
                    </div>

                    {/* PRICE */}
                    <p className="text-[var(--purple-light)] font-bold text-sm mb-2">
                      {product.price} د.ع
                    </p>


                    {/* Add to Cart button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full flex justify-center items-center bg-purple-600 text-white text-sm py-1.5 rounded-xl mb-2 hover:bg-purple-700 transition-all"
                    >
                       <AiOutlineShoppingCart title="إضافة للسلة" className="cursor-pointer text-white m-1" />
                      إضافة إلى السلة 
                    </button>

                    <Link
                      to={`/product/${product._id}`}
                      className="block text-center bg-[var(--purple-light)] text-white text-sm py-1.5 rounded-xl hover:bg-[var(--purple-light-trans)] transition-all"
                    >
                      عرض التفاصيل
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>



          </div>
        </div>

        <motion.h2 className="text-3xl font-extrabold text-center text-purple-700 mb-10" id="digitalProducts"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          منتجات رقمية بأسعار مميزة
        </motion.h2>

        <AllProducts />

      </div>
    </section>
  );
}

export default DigitalProductsSection;
