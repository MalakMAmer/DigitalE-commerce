import React, { useEffect, useState } from "react";
import { FaSearch, FaBook, FaGamepad, FaLaptopCode, FaTags, FaClipboardList } from "react-icons/fa";
import axios from "axios";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [dynamicCategories, setDynamicCategories] = useState([]);

  // fallback categories (Arabic)
  const fallbackCategories = [
    { key: "all", label: "الكل", icon: <FaClipboardList size={26} /> },
    { key: "coupons", label: "كوبونات", icon: <FaTags size={26} /> },
    { key: "subscriptions", label: "الاشتراكات", icon: <FaClipboardList size={26} /> },
    { key: "software", label: "البرامج", icon: <FaLaptopCode size={26} /> },
    { key: "gaming", label: "الألعاب", icon: <FaGamepad size={26} /> },
    { key: "ebooks", label: "الكتب الرقمية", icon: <FaBook size={26} /> },
  ];

  const API_URL = "https://bmd-backend-production.up.railway.app/api/products";
  const CATEGORY_URL = "https://bmd-backend-production.up.railway.app/api/categories"; // must exist

  // Fetch products
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  // Fetch categories from API
  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => {
        if (res.data.length > 0) {
          const formatted = [
            { key: "all", label: "الكل", icon: <FaClipboardList size={26} /> },
            ...res.data.map((c) => ({
              key: c.key || c.name || c._id,
              label: c.name_ar || c.name || "بدون اسم",
              icon: <FaTags size={26} />,
            })),
          ];
          setDynamicCategories(formatted);
        } else {
          setDynamicCategories(fallbackCategories);
        }
      })
      .catch(() => {
        setDynamicCategories(fallbackCategories);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    // Search
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Price filtering
    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

    setFiltered(result);
  }, [search, category, minPrice, maxPrice, products]);

  return (
    <div className="min-h-screen bg-white px-6 py-8" dir="rtl">

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
            className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all text-sm font-semibold
              ${category === cat.key
                ? "bg-purple-700 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:scale-105"}`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Price Filter */}
      <div className="max-w-4xl mx-auto mt-6 flex items-center justify-center gap-3">
        <input
          type="number"
          placeholder="السعر الأدنى"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-lg p-2 w-32 outline-purple-700"
        />
        <span className="text-gray-600">—</span>
        <input
          type="number"
          placeholder="السعر الأقصى"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg p-2 w-32 outline-purple-700"
        />
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all p-4"
            >
              <img
                src={p.images?.[0] || "https://via.placeholder.com/200"}
                alt={p.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h2 className="mt-3 text-lg font-semibold text-gray-900">{p.name}</h2>
              <p className="text-purple-700 font-bold text-xl mt-1">${p.price}</p>

              {/* Full description */}
              <p className="text-gray-500 text-sm mt-2">
                {p.description || "لا يوجد وصف متاح"}
              </p>

              <button className="mt-4 w-full py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-all">
                عرض التفاصيل
              </button>
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
