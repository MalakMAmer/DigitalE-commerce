import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaSearch,
  FaBook,
  FaGamepad,
  FaLaptopCode,
  FaTags,
  FaClipboardList,
  FaTag,
} from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from 'lottie-react'
import loadingAnimation from '../assets/loading.json'

const API_URL = import.meta.env.VITE_API_URL;

function AllProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [dynamicCategories, setDynamicCategories] = useState([]);

  const fallbackCategories = [
    { key: "all", label: "الكل", icon: <FaClipboardList size={26} /> },
    { key: "coupons", label: "كوبونات", icon: <FaTags size={26} /> },
    { key: "subscriptions", label: "الاشتراكات", icon: <FaClipboardList size={26} /> },
    { key: "software", label: "البرامج", icon: <FaLaptopCode size={26} /> },
    { key: "gaming", label: "الألعاب", icon: <FaGamepad size={26} /> },
    { key: "ebooks", label: "الكتب الرقمية", icon: <FaBook size={26} /> },
  ];

  const PRODUCTS_URL = `${API_URL}/api/products`;
  const CATEGORY_URL = `${API_URL}/api/categories`;

  // Fetch Products
  useEffect(() => {
    axios
      .get(PRODUCTS_URL)
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.log("Error fetching products:", err))
      .finally(() => setLoading(false)); // ✅ set loading false
  }, []);

  // Fetch Categories
  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => {
        if (res.data.length > 0) {
          const formatted = [
            { key: "all", label: "الكل", icon: <FaClipboardList size={26} /> },
            ...res.data.map((c) => ({
              key: c.key || c._id,
              label: c.name_ar || c.name || "بدون اسم",
              icon: <FaTags size={26} />,
            })),
          ];
          setDynamicCategories(formatted);
        } else {
          setDynamicCategories(fallbackCategories);
        }
      })
      .catch(() => setDynamicCategories(fallbackCategories));
  }, []);

  // Filters
  useEffect(() => {
    let result = [...products];

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (minPrice) result = result.filter((p) => Number(p.price) >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => Number(p.price) <= Number(maxPrice));

    setFiltered(result);
  }, [search, category, minPrice, maxPrice, products]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const isInCart = cart.some((p) => p._id === product._id);

    if (isInCart) {
      const newCart = cart.filter((p) => p._id !== product._id);
      const newFavs = favorites.filter((p) => p._id !== product._id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      localStorage.setItem("favorites", JSON.stringify(newFavs));

      // Use a unique toastId for removal and a custom color
      toast("تمت الإزالة من السلة!", {
        toastId: `remove-${product._id}`,
        style: { background: "#f56565", color: "#fff" }, // red
      });
    } else {
      cart.push(product);
      favorites.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("favorites", JSON.stringify(favorites));

      // Unique toastId for adding
      toast("تمت الإضافة إلى السلة!", {
        toastId: `add-${product._id}`,
        style: { background: "#48bb78", color: "#fff" }, // green
      });
    }

    setProducts([...products]); // trigger re-render
  };

  if (loading) return (
    <div className="max-w-6xl min-h-screen mx-auto p-4 text-center flex items-center justify-center">
      <Lottie
        animationData={loadingAnimation}
        loop
        autoplay
        style={{ height: 250, width: 250 }}
      />
    </div>
  )



  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-8" dir="rtl">
      
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto flex items-center gap-3 bg-gray-100 rounded-xl p-3 shadow-sm">
        <FaSearch className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="ابحث عن المنتجات..."
          className="w-full bg-transparent outline-none text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="max-w-5xl mx-auto flex gap-4 justify-center mt-8 flex-wrap">
        {dynamicCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl text-sm font-semibold transition-all
              ${
                category === cat.key
                  ? "bg-[var(--purple-light)] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:scale-105"
              }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Price Filter */}
      <div className="max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          type="number"
          placeholder="السعر الأدنى"
          value={minPrice}
          min={1}
          onChange={(e) => setMinPrice(Math.max(1, Number(e.target.value)))}
          className="border rounded-lg p-2 w-full sm:w-32 outline-[var(--purple-light)]"
        />
        <span className="text-gray-600 hidden sm:block">—</span>
        <input
          type="number"
          placeholder="السعر الأقصى"
          value={maxPrice}
          min={1}
          onChange={(e) => setMaxPrice(Math.max(1, Number(e.target.value)))}
          className="border rounded-lg p-2 w-full sm:w-32 outline-[var(--purple-light)]"
        />
        <button
          onClick={() => {
            setMinPrice("");
            setMaxPrice("");
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-all w-full sm:w-auto"
        >
          إعادة التعيين
        </button>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="bg-white rounded-md shadow-md border cursor-pointer overflow-hidden relative group"
            >
              {/* Sale Badge */}
              {p.sale > 0 && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  خصم {p.sale}%
                </div>
              )}

              {/* Category Icon */}
              <div className="absolute top-2 left-2 bg-purple-700 text-white p-1 rounded-full">
                <FaTag size={16} />
              </div>

              {/* Full-width Image */}
              <img
                src={p.images?.[0] || "https://via.placeholder.com/200"}
                alt={p.name}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-1">
                  <FaTags className="text-purple-600" />
                  {p.name}
                </h2>

                {/* Price */}
                <div className="flex items-center gap-2 text-purple-700 font-bold text-lg mb-2">
                  {p.price} دينار عراقي
                </div>

                {/* Short Description */}
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {p.shortDescription || "لا يوجد وصف متاح"}
                </p>

                {/* Buttons */}
                <button
                  className={`mt-4 w-full py-2 flex items-center justify-center gap-2 rounded-lg transition-transform
                    ${
                      JSON.parse(localStorage.getItem("cart") || "[]").some((item) => item._id === p._id)
                        ? "bg-[var(--purple-dark)] text-white"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const token = localStorage.getItem("token");
                    if (!token) {
                      toast.warning("يجب تسجيل الدخول لإضافة المنتج إلى السلة");
                      return;
                    }
                    addToCart(p);
                  }}
                >
                  <AiOutlineShoppingCart />
                  {JSON.parse(localStorage.getItem("cart") || "[]").some((item) => item._id === p._id)
                    ? "إزالة من السلة"
                    : "أضف إلى السلة"}
                </button>


                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${p._id}`);
                  }}
                  className="mt-2 w-full py-2 bg-[var(--purple-light)] text-white rounded-lg hover:bg-[var(--purple-dark)] transition-colors"
                >
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg mt-10">
            لا توجد منتجات مطابقة لبحثك.
          </p>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={true}          
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </div>
  );
}

export default AllProducts;
