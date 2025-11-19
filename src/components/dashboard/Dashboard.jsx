import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductsDash from "./ProductsDash";
import OffersDash from "./OffersDash";
import SalesDash from "./SalesDash";
import FAQDash from "./FAQDash";
import CategoriesDash from "./CategoriesDash";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // data
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [sales, setSales] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);

  // ui
  const [activeSection, setActiveSection] = useState("products"); // products|offers|sales|faq|categories

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const authHeader = () => ({ headers: { Authorization: `Bearer ${token}` } });

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [p, of, s, f, c] = await Promise.all([
          axios.get(`${API_URL}/api/products`),
          axios.get(`${API_URL}/api/offers`),
          axios.get(`${API_URL}/api/sales`),
          axios.get(`${API_URL}/api/faq`),
          axios.get(`${API_URL}/api/categories`),
        ]);
        setProducts(p.data || []);
        setOffers(of.data || []);
        setSales(s.data || []);
        setFaqs(f.data || []);
        setCategories(c.data || []);
      } catch (err) {
        console.error("Dashboard initial load failed:", err);
        toast.error("فشل تحميل البيانات الأولية");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  // ---------- products ----------
  const createProduct = async (payload) => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/products`, payload, authHeader());
      toast.success("تمت إضافة المنتج");
      // refresh products
      const all = await axios.get(`${API_URL}/api/products`);
      setProducts(all.data || []);
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("فشل إضافة المنتج");
      throw err;
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/api/admin/products/${id}`, data, authHeader());
      toast.success("تم تحديث المنتج");
      // refresh list
      const all = await axios.get(`${API_URL}/api/products`);
      setProducts(all.data || []);
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("فشل تحديث المنتج");
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`, authHeader());
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("تم حذف المنتج");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف المنتج");
    }
  };

  // ---------- offers ----------
  const createOffer = async (payload) => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/offers`, payload, authHeader());
      toast.success("تمت إضافة العرض");
      const all = await axios.get(`${API_URL}/api/offers`);
      setOffers(all.data || []);
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("فشل إضافة العرض");
      throw err;
    }
  };

  const deleteOffer = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/offers/${id}`, authHeader());
      setOffers((prev) => prev.filter((o) => o._id !== id));
      toast.success("تم حذف العرض");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف العرض");
    }
  };

  // ---------- sales header ----------
  const createSalesHeader = async (payload) => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/sales`, { images: payload.images }, authHeader());
      toast.success("تم حفظ صور الهيدر");
      
      const all = await axios.get(`${API_URL}/api/sales`);
      setSales(all.data || []);
      
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("فشل حفظ صور الهيدر");
      throw err;
    }
  };

  const deleteSalesHeader = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/sales/${id}`, authHeader());
      setSales((prev) => prev.filter((s) => s._id !== id));
      toast.success("تم حذف الهيدر");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف الهيدر");
    }
  };

  // ---------- faq ----------
  const createFaq = async (payload) => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/faq`, payload, authHeader());
      toast.success("تمت إضافة السؤال");
      const all = await axios.get(`${API_URL}/api/faq`);
      setFaqs(all.data || []);
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("فشل إضافة السؤال");
      throw err;
    }
  };

  const deleteFaq = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/faq/${id}`, authHeader());
      setFaqs((prev) => prev.filter((f) => f._id !== id));
      toast.success("تم حذف السؤال");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف السؤال");
    }
  };

  // ---------- categories ----------
  const createCategory = async (payload) => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/categories/add`, payload, authHeader());
      toast.success("تم حفظ الفئة");
      const all = await axios.get(`${API_URL}/api/categories`);
      setCategories(all.data || []);
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("فشل حفظ الفئة");
      throw err;
    }
  };

  const updateCategory = async (id, payload) => {
    try {
      const res = await axios.put(`${API_URL}/api/admin/categories/update/${id}`, payload, authHeader());
      toast.success("تم تحديث الفئة");
      const all = await axios.get(`${API_URL}/api/categories`);
      setCategories(all.data || []);
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("فشل تحديث الفئة");
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/categories/delete/${id}`, authHeader());
      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast.success("تم حذف الفئة");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف الفئة");
    }
  };

  // ---------- misc ----------
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Lottie animationData={loadingAnimation} loop autoplay style={{ width: 250, height: 250 }} />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex">
      <div className="flex-1 p-8">
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-purple-700">لوحة التحكم</h1>
          <div className="flex gap-3">
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg">تسجيل الخروج</button>
          </div>
        </div>

        {/* section container */}
        <div>
          {activeSection === "products" && (
            <ProductsDash
              products={products}
              categories={categories}
              onCreate={createProduct}
              onUpdate={updateProduct}
              onDelete={deleteProduct}
            />
          )}

          {activeSection === "offers" && (
            <OffersDash offers={offers} onCreate={createOffer} onDelete={deleteOffer} />
          )}

          {activeSection === "sales" && (
            <SalesDash sales={sales} onCreate={createSalesHeader} onDelete={deleteSalesHeader} />
          )}

          {activeSection === "faq" && (
            <FAQDash faqs={faqs} onCreate={createFaq} onDelete={deleteFaq} />
          )}

          {activeSection === "categories" && (
            <CategoriesDash
              categories={categories}
              onCreate={createCategory}
              onUpdate={updateCategory}
              onDelete={deleteCategory}
            />
          )}
        </div>
      </div>

      {/* sidebar */}
      <div className="w-64 bg-purple-700 text-white p-6 flex flex-col gap-3 shadow-xl">
        <button onClick={() => setActiveSection("products")} className={`p-3 rounded-xl ${activeSection === "products" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>منتجات</button>
        <button onClick={() => setActiveSection("offers")} className={`p-3 rounded-xl ${activeSection === "offers" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>عروض</button>
        <button onClick={() => setActiveSection("sales")} className={`p-3 rounded-xl ${activeSection === "sales" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>هيدر الصور</button>
        <button onClick={() => setActiveSection("faq")} className={`p-3 rounded-xl ${activeSection === "faq" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>الأسئلة الشائعة</button>
        <button onClick={() => setActiveSection("categories")} className={`p-3 rounded-xl ${activeSection === "categories" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>التصنيفات</button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}
