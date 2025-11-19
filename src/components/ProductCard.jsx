import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  const inCart = JSON.parse(localStorage.getItem("cart") || "[]").some(
    (item) => item._id === product._id
  );

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="flex-shrink-0 w-56 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform relative"
    >
      {/* Sale Badge */}
      {product.sale > 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          خصم {product.sale}%
        </div>
      )}

      {/* Product Image */}
      <img
        src={product.images?.[0] || "https://via.placeholder.com/200"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-purple-700 font-bold text-lg">{product.price} دينار عراقي</p>

        <button
          className={`mt-4 w-full py-2 flex items-center justify-center gap-2 rounded-lg transition-transform ${
            inCart ? "bg-[var(--purple-dark)] text-white" : "bg-green-600 text-white hover:bg-green-700"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <AiOutlineShoppingCart />
          {inCart ? "إزالة من السلة" : "أضف إلى السلة"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
