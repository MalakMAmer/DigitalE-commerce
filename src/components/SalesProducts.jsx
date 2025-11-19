import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const API_URL = import.meta.env.VITE_API_URL;

function SalesProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data.filter((p) => p.sale > 0)))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="w-full flex justify-center py-10">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
          style={{ width: 150, height: 150 }}
        />
      </div>
    );

  return (
    <section className="bg-gray-50 py-6 my-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-right text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-700 mb-6">
          المنتجات المخفضة
        </h2>

        {/* Products or Empty Space */}
        <div className="relative min-h-[280px]">
          {products.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500 text-lg">
                لا توجد منتجات على التخفيضات حالياً.
              </p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-200 py-2">
              {products.map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="flex-shrink-0 w-56 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform relative"
                >
                  {/* Sale Badge */}
                  {p.sale > 0 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      خصم {p.sale}%
                    </div>
                  )}
                  {/* Product Image */}
                  <img
                    src={p.images?.[0] || "https://via.placeholder.com/200"}
                    alt={p.name}
                    className="w-full h-48 object-cover"
                  />
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-md font-semibold text-gray-900 mb-1">
                      {p.name}
                    </h3>
                    <p className="text-purple-700 font-bold text-lg">
                      {p.price} دينار عراقي
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SalesProducts;
