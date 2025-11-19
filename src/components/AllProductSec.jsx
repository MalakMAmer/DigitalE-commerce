import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryProductsBar from "./CategoryProductsBar";
import SalesProducts from "./SalesProducts";

const API_URL = import.meta.env.VITE_API_URL;

function AllProductSec() {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    // Fetch only main categories
    axios
      .get(`${API_URL}/api/categories?mainCategory=true`)
      .then((res) => {
        // Filter unique main categories by mainCategory key
        const uniqueMainCats = [];
        const seen = new Set();
        res.data.forEach((cat) => {
          if (!seen.has(cat.mainCategory)) {
            uniqueMainCats.push(cat);
            seen.add(cat.mainCategory);
          }
        });
        setMainCategories(uniqueMainCats);
      })
      .catch((err) => console.error("Error fetching main categories:", err));
  }, []);

  return (
    <>
      <SalesProducts />
      {mainCategories.length > 0 ? (
        mainCategories.map((cat) => (
          <CategoryProductsBar
            key={cat._id}               // unique key
            mainCategory={cat.mainCategory}
            categoryName={cat.name_ar}  // Arabic display name
          />
        ))
      ) : (
        <p className="text-center py-10 text-gray-500">
          لا توجد فئات رئيسية حالياً
        </p>
      )}
    </>
  );
}

export default AllProductSec;
