import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Plus, Trash2, LogOut } from "lucide-react";
import { PackagePlus, TicketPercent, Megaphone } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState("addProduct");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    discount: "",
    images: [""],
  });

  const [offerForm, setOfferForm] = useState({
    title: "",
    description: "",
    discount: "",
    image: "",
  });

  const [adForm, setAdForm] = useState({
    title: "",
    link: "",
    image: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch(() => toast.error("فشل تحميل المنتجات"));
  }, []);

  // Product handlers
  const addImageInput = () => {
    if (form.images.length >= 10) {
      toast.error("لا يمكن إضافة أكثر من 10 صور"); // max 10
      return;
    }
    setForm({ ...form, images: [...form.images, ""] });
  };
  const updateImage = (index, value) => {
    const updatedImages = [...form.images];
    updatedImages[index] = value;
    setForm({ ...form, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/products`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تمت إضافة المنتج بنجاح✔");
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
      setForm({ name: "", price: "", description: "", category: "", discount: "", images: [""] });
    } catch {
      toast.error("فشل إضافة المنتج ❌");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("تم حذف المنتج ✔");
    } catch {
      toast.error("فشل حذف المنتج ❌");
    }
  };

  // Offer handler
  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/offers`, offerForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تمت إضافة العرض بنجاح 🎉");
      setOfferForm({ title: "", description: "", discount: "", image: "" });
    } catch {
      toast.error("حدث خطأ أثناء إضافة العرض ❌");
    }
  };

  // Ad handler
  const handleAdSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/ads`, adForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تمت إضافة الإعلان بنجاح 📢");
      setAdForm({ title: "", link: "", image: "" });
    } catch {
      toast.error("حدث خطأ أثناء إضافة الإعلان ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex">
      {/* Main content */}
      <div className="flex-1 p-8 flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-purple-700">لوحة التحكم</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <LogOut size={20} /> تسجيل الخروج
          </button>
        </div>

        {/* Sections */}
        {activeSection === "addProduct" && (
          <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6 text-center">
              إضافة منتج جديد
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 justify-between">
              {/* Product data */}
              <fieldset className="flex-1 border p-6 rounded-xl shadow bg-white">
                <legend className="px-3 text-purple-700 font-semibold text-lg">بيانات المنتج</legend>
                <div className="flex flex-col gap-4 mt-4">
                  <input type="text" placeholder="اسم المنتج" className="p-3 border rounded-lg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input type="number" placeholder="السعر" className="p-3 border rounded-lg" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  <input type="text" placeholder="الوصف" className="p-3 border rounded-lg" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  <input type="text" placeholder="الفئة" className="p-3 border rounded-lg" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  <input type="text" placeholder="الخصم" className="p-3 border rounded-lg" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
                </div>
              </fieldset>

              {/* Product images */}
              <fieldset className="flex-1 border p-6 rounded-xl shadow bg-white relative">
                <legend className="flex items-center gap-2 text-purple-700 font-semibold text-lg">صور المنتج</legend>
                <button type="button" onClick={addImageInput} className="absolute top-3 left-3 bg-purple-700 text-white p-1.5 rounded-lg hover:bg-purple-800">
                  <Plus size={20} />
                </button>
                <div className="flex flex-col gap-4 mt-4">
                  {form.images.map((img, index) => (
                    <input key={index} type="text" placeholder={`رابط الصورة ${index + 1}`} className="p-3 border rounded-lg" value={img} onChange={(e) => updateImage(index, e.target.value)} />
                    
                  ))}
                </div>
              </fieldset>
            </form>
            <button onClick={handleSubmit} className="mt-6 w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800">إضافة المنتج</button>

            {/* Product cards */}
            <div className="flex flex-wrap gap-8 mt-8">
              {products.map((p) => (
                <div key={p._id} className="w-full sm:w-[48%] lg:w-[30%] bg-white rounded-2xl shadow overflow-hidden">
                  <img src={p.images?.[0] || "https://via.placeholder.com/400"} alt={p.name} className="w-full h-56 object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
                    <p className="text-gray-600">{p.category}</p>
                    <p className="text-gray-600">{p.description}</p>
                    <p className="font-semibold text-purple-700 mt-2">{p.price} ج.م</p>
                    <button onClick={() => deleteProduct(p._id)} className="mt-4 w-full bg-red-500 text-white flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-red-600">
                      <Trash2 size={18} /> حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "addOffer" && (
          <div className="w-full bg-white p-10 rounded-2xl shadow-xl text-purple-700 font-semibold">
            <h2 className="text-3xl mb-6 flex items-center gap-2"><TicketPercent size={28} /> إضافة عرض جديد</h2>
            <form onSubmit={handleOfferSubmit} className="flex flex-col gap-4 max-w-lg">
              <input type="text" placeholder="عنوان العرض" className="p-3 border border-gray-300 rounded-lg" value={offerForm.title} onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })} />
              <input type="text" placeholder="وصف العرض" className="p-3 border border-gray-300 rounded-lg" value={offerForm.description} onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })} />
              <input type="number" placeholder="نسبة الخصم" className="p-3 border border-gray-300 rounded-lg" value={offerForm.discount} onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })} />
              <button type="submit" className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition-all">✔ إضافة العرض</button>
            </form>
          </div>
        )}

        {activeSection === "addAD" && (
          <div className="w-full bg-white p-10 rounded-2xl shadow-xl text-purple-700 font-semibold">
            <h2 className="text-3xl mb-6 flex items-center gap-2"><Megaphone size={28} /> إضافة إعلان</h2>
            <form onSubmit={handleAdSubmit} className="flex flex-col gap-4 max-w-lg">
              <input type="text" placeholder="عنوان الإعلان" className="p-3 border border-gray-300 rounded-lg" value={adForm.title} onChange={(e) => setAdForm({ ...adForm, title: e.target.value })} />
              <input type="text" placeholder="وصف الإعلان" className="p-3 border border-gray-300 rounded-lg" value={adForm.description} onChange={(e) => setAdForm({ ...adForm, description: e.target.value })} />
              <input type="text" placeholder="رابط صورة الإعلان" className="p-3 border border-gray-300 rounded-lg" value={adForm.image} onChange={(e) => setAdForm({ ...adForm, image: e.target.value })} />
              <button type="submit" className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition-all">📢 نشر الإعلان</button>
            </form>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-purple-700 text-white p-6 flex flex-col gap-4 shadow-xl">
        <button onClick={() => setActiveSection("addProduct")} className={`p-3 rounded-xl text-lg flex items-center gap-3 transition-all ${activeSection === "addProduct" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>
          <PackagePlus size={22} /> إضافة منتج
        </button>
        <button onClick={() => setActiveSection("addOffer")} className={`p-3 rounded-xl text-lg flex items-center gap-3 transition-all ${activeSection === "addOffer" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>
          <TicketPercent size={22} /> إضافة عرض
        </button>
        <button onClick={() => setActiveSection("addAD")} className={`p-3 rounded-xl text-lg flex items-center gap-3 transition-all ${activeSection === "addAD" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>
          <Megaphone size={22} /> إضافة إعلان
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}
