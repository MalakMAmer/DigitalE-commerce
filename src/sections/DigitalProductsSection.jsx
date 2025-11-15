import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import bgHero from "../assets/bgHero.jpeg";

function DigitalProductsSection() {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const offers = [
    { id: 1, title: "خصم 20% على كل المنتجات الرقمية", description: "اغتنم الفرصة واحصل على أفضل المنتجات بسعر مخفض.", image: bgHero },
    { id: 2, title: "اشتراك سنوي مجاني لأول 50 عميل", description: "كن من أوائل المشتركين واستمتع بالمزايا الحصرية.", image: bgHero },
    { id: 3, title: "هدايا مجانية عند شراء أي منتج", description: "احصل على منتجات رقمية إضافية مجانية عند كل عملية شراء.", image: bgHero },
  ];

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 4000);
  };

  useEffect(() => {
    AOS.init({ duration: 700 });
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_URL}/api/user/favorites`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.json())
        .then((data) => setFavorites(data))
        .catch((err) => console.error(err));
    }
  }, []);

  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("يجب تسجيل الدخول أولاً");

    try {
      const res = await fetch(`${API_URL}/api/user/favorites/${productId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setFavorites(data.favorites);
    } catch (err) {
      console.error(err);
    }
  };

  const isFavorite = (productId) => favorites.includes(productId);

  const categories = [
    { key: "all", label: "الكل" },
    { key: "coupons", label: "كوبونات" },
    { key: "subscriptions", label: "الاشتراكات" },
    { key: "software", label: "البرامج" },
    { key: "gaming", label: "الألعاب" },
    { key: "ebooks", label: "الكتب الرقمية" },
  ];

  const filteredProducts = filter === "all" ? products : products.filter((p) => p.category === filter);
  const displayedProducts = filteredProducts.slice(0, 10);

  const nextSlide = () => { setCurrent((prev) => (prev + 1) % offers.length); startTimer(); };
  const prevSlide = () => { setCurrent((prev) => (prev - 1 + offers.length) % offers.length); startTimer(); };

  return (
    <section className="py-20 px-6 bg-white" dir="rtl">
      <div className="max-w-6xl mx-auto">

        {/* === Newest Offers Slider === */}
        <div className="mb-20" id="offers">
          <div className="text-center mb-10">
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-purple-700 mb-3" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              أحدث العروض
            </motion.h2>
            <p className="text-gray-600">عروض مميزة + منتجات مختارة</p>
          </div>

          {/* Slider LEFT + 4 products RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT ➜ Slider */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={offers[current].id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col bg-gradient-to-r from-purple-50 to-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-full"
                >
                  <img src={offers[current].image} alt={offers[current].title} className="w-full h-60 object-cover" />
                  <div className="p-6 text-right">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{offers[current].title}</h3>
                    <p className="text-gray-700">{offers[current].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-2 z-20 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-purple-700 hover:text-white transition-all" style={{ direction: "ltr" }}>‹</button>
              <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-2 z-20 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-purple-700 hover:text-white transition-all" style={{ direction: "ltr" }}>›</button>

              <div className="flex justify-center mt-4 gap-2">
                {offers.map((_, index) => (
                  <button key={index} onClick={() => { setCurrent(index); startTimer(); }} className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-purple-700" : "bg-gray-300"}`} />
                ))}
              </div>
            </div>

            {/* RIGHT ➜ 4 Featured Products */}
            <div className="grid grid-cols-2 gap-4">
              {displayedProducts.slice(0, 4).map((product) => (
                <motion.div key={product._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden relative" data-aos="fade-up">
                  <img src={product.images?.[0] || product.image || "https://via.placeholder.com/400"} className="w-full h-32 object-cover" alt={product.title} />
                  <button onClick={() => toggleFavorite(product._id)} className="absolute top-3 right-3 text-xl">
                    {isFavorite(product._id) ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart className="text-gray-400 hover:text-red-500 transition-colors" />}
                  </button>
                  <div className="p-3 text-right">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{product.title}</h3>
                    <p className="text-purple-700 font-bold text-sm mb-2">{product.price} د.ع</p>
                    <Link to={`/product/${product._id}`} className="block text-center bg-purple-700 text-white text-sm py-1.5 rounded-xl hover:bg-purple-800 transition-all">عرض التفاصيل</Link>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* === Product Section === */}
        <motion.h2 className="text-3xl font-extrabold text-center text-purple-700 mb-10" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          منتجات رقمية بأسعار مميزة
        </motion.h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setFilter(cat.key)} className={`px-4 py-2 rounded-full border transition-all duration-300 ${filter === cat.key ? "bg-purple-700 text-white border-purple-700" : "bg-gray-100 text-gray-700 hover:bg-purple-100"}`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {displayedProducts.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد منتجات حالياً.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <motion.div key={product._id} data-aos="fade-up" className="relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all">
                <img src={product.images?.[0] || product.image || "https://via.placeholder.com/400"} alt={product.title} className="w-full h-40 object-cover" />
                <button onClick={() => toggleFavorite(product._id)} className="absolute top-3 right-3 text-2xl">
                  {isFavorite(product._id) ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart className="text-gray-400 hover:text-red-500 transition-colors" />}
                </button>
                <div className="p-4 text-right">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-purple-700 font-semibold mb-3">{product.price} د.ع</p>
                  <Link to={`/product/${product._id}`} className="block w-full text-center bg-purple-700 text-white py-2 rounded-xl font-medium hover:bg-purple-800 transition-all">عرض التفاصيل</Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All */}
        <div className="text-center pt-10 lg:pt-16">
          <Link to="/products" className="inline-block bg-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transform hover:scale-105 transition-all">تصفح باقي المنتجات</Link>
        </div>

      </div>
    </section>
  );
}

export default DigitalProductsSection;
