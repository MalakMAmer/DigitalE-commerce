import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaTags, FaTag } from "react-icons/fa";
import { toast } from "react-toastify";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  const inCart = JSON.parse(localStorage.getItem("cart") || "[]").some(
    (item) => item._id === product._id
  );

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="
        bg-white rounded-md shadow-md border cursor-pointer overflow-hidden relative group
        w-[230px] sm:w-[240px] lg:w-[260px] 
        flex-shrink-0
      "
    >
      {/* Sale Badge */}
      {product.sale > 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          خصم {product.sale}%
        </div>
      )}

      {/* Category Icon */}
      <div className="absolute top-2 left-2 bg-purple-700 text-white p-1 rounded-full">
        <FaTag size={16} />
      </div>

      {/* Product Image */}
      <img
        src={product.images?.[0] || "https://via.placeholder.com/200"}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        {/* Name with inline icon */}
        <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <FaTags className="text-purple-600" />
          <span>{product.title}</span>
        </h2>

        {/* Price */}
        <div className="flex items-center gap-2 text-purple-700 font-bold text-lg mb-2">
          {product.price} دينار عراقي
        </div>

        {/* Short Description */}
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.shortDescription || "لا يوجد وصف متاح"}
        </p>

        {/* Add to Cart */}
        <button
          className={`mt-4 w-full py-2 flex items-center justify-center gap-2 rounded-lg transition-transform
            ${
              inCart
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

            addToCart(product);
          }}
        >
          <AiOutlineShoppingCart />
          {inCart ? "إزالة من السلة" : "أضف إلى السلة"}
        </button>

        {/* View Details */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product._id}`);
          }}
          className="mt-2 w-full py-2 bg-[var(--purple-light)] text-white rounded-lg hover:bg-[var(--purple-dark)] transition-colors"
        >
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
