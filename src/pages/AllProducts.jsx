import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaBook,
  FaGamepad,
  FaLaptopCode,
  FaTags,
  FaClipboardList,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function AllProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

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
      .catch((err) => console.log("Error fetching products:", err));
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
                  ? "bg-[var(--purple-light)] text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:scale-105"
              }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Price Filter – mobile responsive */}
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
              className="bg-white rounded-md shadow-md border hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer overflow-hidden"
            >
              {/* FULL-WIDTH IMAGE – NO PADDING */}
              <img
                src={p.images?.[0] || "https://via.placeholder.com/200"}
                alt={p.name}
                className="w-full h-48 object-cover"
              />

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{p.name}</h2>

                {/* Price */}
                <div className="mt-2">
                  {p.oldPrice && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="line-through">{p.oldPrice} دينار عراقي</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        -{p.savings || "—"}
                      </span>
                    </div>
                  )}

                  <p className="text-purple-700 font-bold text-2xl mt-1">
                    {p.price} دينار عراقي
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {p.description || "لا يوجد وصف متاح"}
                </p>

                {/* Add to Cart */}
                <button
                  className="mt-4 w-full py-2 bg-[var(--purple-dark)] text-white rounded-lg transition-transform duration-200 hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  أضف إلى السلة
                </button>

                {/* Details */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${p._id}`);
                  }}
                  className="mt-2 w-full py-2 bg-[var(--purple-light)] text-white rounded-lg transition-all hover:bg-[var(--purple-dark)] hover:scale-105"
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
    </div>
  );
}

export default AllProducts;
