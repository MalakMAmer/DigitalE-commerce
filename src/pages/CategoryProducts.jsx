import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet";


{/* <Helmet>
  <title>BMD | فئة الترفيه - اشتراكات نتفلكس، شاهد، برايم فيديو</title>
  <meta 
    name="description" 
    content="اكتشف أفضل اشتراكات الترفيه: نتفلكس، شاهد، Prime Video، OSN والمزيد بأسعار منافسة." 
  />
  <meta name="keywords" content="نتفلكس, شاهد, prime video, osn, اشتراكات ترفيه" />
</Helmet> */}


const API_URL = import.meta.env.VITE_API_URL;

function CategoryProducts() {
  const { catKey } = useParams(); // category key
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchCategory = axios.get(`${API_URL}/api/categories?key=${catKey}`);
    const fetchProducts = axios.get(`${API_URL}/api/categories/products/by-key?categoryKey=${catKey}`);

    Promise.all([fetchCategory, fetchProducts])
    .then(([catRes, prodRes]) => {
      const cat = catRes.data[0];
      setCategoryName(cat?.name_ar || "الفئة");
      setProducts(prodRes.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
  }, [catKey]);

  const filtered = products.filter((p) => {
    const productName = (p?.title || "").toLowerCase();
    const searchText = (search || "").toLowerCase();

    return productName.includes(searchText);
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Lottie animationData={loadingAnimation} loop autoplay style={{ width: 250, height: 250 }} />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-700">{categoryName}</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          className="mt-4 p-3 w-full sm:w-1/2 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={() => {}} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">لا توجد منتجات تطابق البحث.</p>
      )}
    </div>
  );
}

export default CategoryProducts;
