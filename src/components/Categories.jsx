import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => {
        if (res.data.length > 0) {
          setCategories([
            { key: "all", label: "الكل", image: "" }, // default "all" category
            ...res.data.map((c) => ({
              key: c.key || c._id,
              label: c.name_ar || c.name || "بدون اسم",
              image: c.image || "",
            })),
          ]);
        } else {
          setCategories([{ key: "all", label: "الكل", image: "" }]);
        }
      })
      .catch(() => {
        setCategories([{ key: "all", label: "الكل", image: "" }]);
      });
  }, []);

  const handleCategoryClick = (catKey) => {
    navigate(`/category/${catKey}`);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => navigate(`/category/${cat.key}`)}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl text-lg font-semibold transition-all
              bg-white text-gray-800 hover:scale-105 shadow-md"
            style={{ minWidth: "140px", minHeight: "140px" }}
          >
            {cat.image ? (
              <img
                src={cat.image}
                alt={cat.label}
                className="w-20 h-20 object-cover rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full" />
            )}
            <span className="text-center">{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
