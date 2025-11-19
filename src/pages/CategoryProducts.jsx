import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const API_URL = import.meta.env.VITE_API_URL;

function CategoryProducts() {
  const { mainCategory } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchMainCategory = axios.get(`${API_URL}/api/categories?mainCategory=${mainCategory}`);
    const fetchProducts = axios.get(`${API_URL}/api/categories/products?mainCategory=${mainCategory}`);

    Promise.all([fetchMainCategory, fetchProducts])
      .then(([catRes, prodRes]) => {
        const mainCat = catRes.data[0];
        setCategoryName(mainCat?.name_ar || mainCategory || "الفئة");
        setProducts(prodRes.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [mainCategory]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Lottie animationData={loadingAnimation} loop autoplay style={{ width: 250, height: 250 }} />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-700">
          {categoryName}
        </h1>
        <p className="text-gray-500 mt-2">
          استعرض جميع المنتجات في فئة {categoryName}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform relative"
            >
              {p.sale > 0 && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  خصم {p.sale}%
                </div>
              )}
              <img
                src={p.images?.[0] || "https://via.placeholder.com/250"}
                alt={p.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{p.name}</h2>
                <p className="text-purple-700 font-bold text-lg mb-1">{p.price} دينار عراقي</p>
                <p className="text-gray-500 text-sm line-clamp-2">{p.shortDescription || "لا يوجد وصف متاح"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">لا توجد منتجات في هذه الفئة.</p>
      )}
    </div>
  );
}

export default CategoryProducts;
