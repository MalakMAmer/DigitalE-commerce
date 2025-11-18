import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineShoppingCart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { FiShield } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";



function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8); 

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = {
          id: data.id || id,
          name: data.name || "اسم المنتج",
          description: data.description || "لا وصف متوفر لهذا المنتج.",
          price: data.price || "0",
          oldPrice: data.oldPrice || null,
          savings: data.savings || null,
          images:
            data.images && data.images.length
              ? data.images
              : [data.image || "https://via.placeholder.com/800x600?text=No+Image"],
          region: data.region || "CAN BE ACTIVATED IN: TURKEY",
          activation: data.activation || "طريقة تفعيل المنتج موضحة هنا.",
        };
        setProduct(normalized);
      })
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const next = () => {
    if (!product) return;
    setCurrentIndex((p) => (p + 1) % product.images.length);
  };

  const prev = () => {
    if (!product) return;
    setCurrentIndex((p) => (p - 1 + product.images.length) % product.images.length);
  };

  const handleAction = (action) => {
    toast.success(`${action} تم بنجاح!`);
    navigate("/payment", {
      state: {
        price: p.price,
        name: p.name,
        productId: p._id,
        image: p.images?.[0],
        sale: p.sale,
        description: p.description
      },
    })
  };

  const thumbnails = useMemo(() => (product ? product.images : []), [product]);

  if (!product)
    return <div className="max-w-6xl mx-auto p-6 text-center text-xl">جاري التحميل...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <img
              src={product.images[currentIndex]}
              alt={product.name}
              className="w-full h-[480px] object-contain rounded-2xl"
            />
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
            >
              <AiOutlineLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
            >
              <AiOutlineRight size={20} />
            </button>
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                onClick={() => handleAction("تمت الإضافة للمفضلة")}
                className="bg-white/90 p-2 rounded shadow hover:scale-110 transform hover:text-red-400 transition-all hover:bg-red-100/90"
              >
                <AiOutlineHeart size={18} />
              </button>
              <button
                onClick={() => handleAction("تمت المشاركة")}
                className="bg-white/90 p-2 rounded shadow hover:scale-110 transform hover:text-green-400 transition-all hover:bg-green-100/90"
              >
                <AiOutlineShareAlt size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {thumbnails.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded overflow-hidden border-2 ${
                  idx === currentIndex ? "ring-2 ring-purple-600 border-none" : "border-black/70"
                }`}
              >
                <img src={t} alt={`${product.name}-${idx}`} className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
          <div className="flex flex-col justify-center items-center">
            <div className="text-sm text-green-600 flex items-center gap-2 py-3">
              <FiShield size={18} /> معاملتك آمنة
            </div>
            <div className="h-[1.5px] w-full bg-green-300/30"></div>
          </div>

          <h1 className="text-2xl font-bold text-center p-4">{product.name}</h1>

          <div className="w-full bg-gray-50 p-4 rounded-lg border space-y-3">
            {product.oldPrice && (
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="line-through">{product.oldPrice} IQD</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  -{product.savings || "—"}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between p-2">
              <div>
                <div className="text-3xl font-extrabold">{product.price} IQD</div>
                <div className="text-xs text-gray-500">غير شامل الضرائب </div>
              </div>
              <button
                onClick={() => handleAction("تمت الإضافة إلى السلة")}
                className="ml-4 px-3 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 flex items-center gap-2"
              >
                <AiOutlineShoppingCart /> اضافة الي السلة
              </button>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex flex-col gap-3 md:flex-row justify-between mt-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded">
              <FiShield /> <div className="text-xs text-gray-600">معاملتك آمنة</div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded">
              <AiOutlineInfoCircle /> <div className="text-xs text-gray-600">ضمان البائع</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activation section */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">طريقة التفعيل</h2>
        <p className="text-gray-700 leading-relaxed">{product.activation}</p>
      </div>
    </div>
  );
}

export default Product;
