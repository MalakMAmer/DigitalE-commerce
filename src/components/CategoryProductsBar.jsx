import React, { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import ProductCard from "./ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

function CategoryProductsBar({ categoryKey }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainCategoryName, setMainCategoryName] = useState("");

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const isInCart = cart.some((p) => p._id === product._id);

    if (isInCart) {
      const newCart = cart.filter((p) => p._id !== product._id);
      const newFavs = favorites.filter((p) => p._id !== product._id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      localStorage.setItem("favorites", JSON.stringify(newFavs));
    } else {
      cart.push(product);
      favorites.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setProducts([...products]); // trigger re-render
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/products?mainCategory=${categoryKey}`)
      .then((res) => {
        setProducts(res.data);

        // Auto-detect main category name from first product
        if (res.data.length > 0) {
          const mainName =
            res.data[0]?.category?.mainCategory?.name ||
            res.data[0]?.category?.name ||
            "منتجات";
          setMainCategoryName(mainName);
        } else {
          setMainCategoryName("منتجات");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryKey]);

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
        <h2 className="text-right text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-700 mb-6">
          {mainCategoryName}
        </h2>

        <div className="relative min-h-[280px]">
          {products.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500 text-lg">
                لا توجد منتجات في هذه الفئة حالياً.
              </p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-200 py-2">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} addToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CategoryProductsBar;
