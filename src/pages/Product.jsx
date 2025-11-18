import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineShoppingCart,
  AiOutlineTag,
  AiFillHeart ,
} from "react-icons/ai";
import { FiShield } from "react-icons/fi";
import { BsBagCheck } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    // Fetch product data
    fetch(`${API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = {
          _id: data._id || id,
          name: data.name || "اسم المنتج",
          shortDescription: data.shortDescription || "لا يوجد وصف قصير",
          description: data.description || "لا وصف متوفر لهذا المنتج.",
          price: data.price || 0,
          oldPrice: data.oldPrice || null,
          sale: data.sale || 0,
          category: data.category || "عام",
          images: data.images && data.images.length ? data.images : ["https://via.placeholder.com/800x600?text=No+Image"],
        };
        setProduct(normalized);

        // Check localStorage for favorite and cart
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setIsFavorite(favorites.some((p) => p._id === normalized._id));
        setInCart(cart.some((p) => p._id === normalized._id));
      })
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const next = () => product && setCurrentIndex((p) => (p + 1) % product.images.length);
  const prev = () => product && setCurrentIndex((p) => (p - 1 + product.images.length) % product.images.length);

  const toggleFavoriteAndCart = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (isFavorite) {
      const newFavs = favorites.filter((p) => p._id !== product._id);
      const newCart = cart.filter((p) => p._id !== product._id);
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      localStorage.setItem("cart", JSON.stringify(newCart));
      setIsFavorite(false);
      setInCart(false);
      toast.success("تمت الإزالة من المفضلة والسلة!");
    } else {
      favorites.push(product);
      cart.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsFavorite(true);
      setInCart(true);
      toast.success("تمت الإضافة للمفضلة والسلة!");
    }
  };

  const handleBuyNow = () => {
    navigate("/payment", {
      state: {
        price: product.price,
        name: product.name,
        productId: product._id,
        image: product.images[0],
        sale: product.sale,
        description: product.description,
      },
    });
  };


  // const handleCart = () => {
  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   if (inCart) {
  //     const newCart = cart.filter((p) => p._id !== product._id);
  //     localStorage.setItem("cart", JSON.stringify(newCart));
  //     setInCart(false);
  //     toast.success("تمت الإزالة من السلة!");
  //   } else {
  //     cart.push(product);
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     setInCart(true);
  //     toast.success("تمت الإضافة إلى السلة!");
  //   }
  // };

  const thumbnails = useMemo(() => (product ? product.images : []), [product]);

  if (!product) return <div className="max-w-6xl mx-auto p-6 text-center text-xl">جاري التحميل...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <img src={product.images[currentIndex]} alt={product.name} className="w-full h-[480px] object-cover rounded-2xl" />
            
            {/* Navigation */}
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-purple-700/50 hover:bg-purple-700 text-white p-3 rounded-full transition">
              <AiOutlineLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-700/50 hover:bg-purple-700 text-white p-3 rounded-full transition">
              <AiOutlineRight size={20} />
            </button>

            {/* Actions */}
            <div className="absolute right-4 top-4 flex gap-2">
              <button onClick={toggleFavoriteAndCart} className={`bg-white/90 p-2 rounded shadow hover:scale-110 transform transition-all ${isFavorite ? "text-red-500 bg-red-500" : "text-gray-600"}`}>
                <AiFillHeart  size={18} />
              </button>
            </div>

            {/* Category tag */}
            <div className="absolute left-4 top-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-sm">
              <AiOutlineTag /> {product.category}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {thumbnails.map((t, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} className={`rounded overflow-hidden border-2 ${idx === currentIndex ? "ring-2 ring-purple-600 border-none" : "border-black/70"}`}>
                <img src={t} alt={`${product.name}-${idx}`} className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info / Payment Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-green-600">
            <FiShield size={18} /> معاملتك آمنة
          </div>

          <h1 className="text-2xl font-bold">{product.name}</h1>

          {/* Info section */}
          <div className="bg-gray-50 p-4 rounded-lg border space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <AiOutlineTag /> الفئة: {product.category}
            </div>
            <div className="text-gray-600">{product.shortDescription}</div>
          </div>

          {/* Price & buttons */}
          <div className="flex gap-3">
            {/* Add to Cart (green) */}
            <button
              onClick={toggleFavoriteAndCart}
              className={`flex-1 px-3 py-2 ${
                inCart ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
              } text-white rounded flex items-center justify-center gap-2 transition`}
            >
              <AiOutlineShoppingCart /> {inCart ? "إزالة من السلة" : "إضافة إلى السلة"}
            </button>

            {/* Buy Now (purple, never changes) */}
            <button
              onClick={handleBuyNow}
              className="flex-1 px-3 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded flex items-center justify-center gap-2 transition"
            >
              <BsBagCheck /> الدفع الآن
            </button>
          </div>


          <div className="flex flex-col gap-3 md:flex-row mt-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded">
              <FiShield /> <div className="text-xs text-gray-600">معاملتك آمنة</div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded">
              <AiOutlineInfoCircle /> <div className="text-xs text-gray-600">ضمان البائع</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
