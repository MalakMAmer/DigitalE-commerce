// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Trash2, LogOut, Edit2, Save } from "lucide-react";
import { Images } from "lucide-react";
import { PackagePlus, TicketPercent, Megaphone } from "lucide-react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState("addProduct");
  const [offers, setOffers] = useState([]);
  const [sales, setSales] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);

  // Forms & states (existing)
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" });
  const [form, setForm] = useState({
    title: "",
    price: "",
    oldPrice: "",
    shortDescription: "",
    longDescription: "",
    category: "",
    subcategory: "",
    sale: "",
    images: [""],
    stockStatus: "متوفر",
  });

  const [salesForm, setSalesForm] = useState({ image: ["", ""] });
  const [offerForm, setOfferForm] = useState({ image: [""] });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // fetch initial data
    const load = async () => {
      try {
        const [prodRes, offersRes, salesRes, faqRes, catRes] = await Promise.all([
          axios.get(`${API_URL}/api/products`),
          axios.get(`${API_URL}/api/offers`),
          axios.get(`${API_URL}/api/sales`),
          axios.get(`${API_URL}/api/faq`),
          axios.get(`${API_URL}/api/categories`),
        ]);
        setProducts(prodRes.data || []);
        setOffers(offersRes.data || []);
        setSales(salesRes.data || []);
        setFaqs(faqRes.data || []);
        setCategories(catRes.data || []);
      } catch (err) {
        console.error("Initial load error:", err);
        toast.error("فشل تحميل البيانات الأولية");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ---------- Product handlers ----------
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("تم حذف المنتج ✔");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف المنتج ❌");
    }
  };

  const addImageInput = () => {
    if (form.images.length >= 10) {
      toast.error("لا يمكن إضافة أكثر من 10 صور");
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
    // Validate required
    if (!form.title || !form.price || !form.category) {
      toast.error("الرجاء ملء الحقول الضرورية: الاسم، السعر، الفئة");
      return;
    }
    try {
      await axios.post(`${API_URL}/api/admin/products`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("تمت إضافة المنتج بنجاح ✔");

      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);

      setForm({
        title: "",
        price: "",
        oldPrice: "",
        shortDescription: "",
        longDescription: "",
        category: "",
        subcategory: "",
        sale: "",
        images: [""],
        stockStatus: "متوفر",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("فشل إضافة المنتج ❌");
    }
  };

  // ---------- Offer handlers ----------
  const updateOfferImage = (index, value) => {
    const arr = [...offerForm.image];
    arr[index] = value;
    setOfferForm({ image: arr });
  };
  const addOfferImageInput = () => {
    setOfferForm({ image: [...offerForm.image, ""] });
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    // require fields
    if (!offerForm.image || !offerForm.image.length) {
      toast.error("يجب إضافة رابط/روابط الصور");
      return;
    }
    // For the offers model you added earlier, it requires image, shortDescription, longDescription
    // If not provided in UI, we fallback to simple placeholders
    const payload = {
      image: Array.isArray(offerForm.image) ? offerForm.image : [offerForm.image],
      shortDescription: offerForm.shortDescription || "عرض جديد",
      longDescription: offerForm.longDescription || "تفاصيل العرض",
    };

    try {
      await axios.post(`${API_URL}/api/admin/offers`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تمت إضافة العرض بنجاح 🎉");
      setOfferForm({ image: [""] });
      const res = await axios.get(`${API_URL}/api/offers`);
      setOffers(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("حدث خطأ أثناء إضافة العرض ❌");
    }
  };

  const deleteOffer = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/offers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOffers(offers.filter((o) => o._id !== id));
      toast.success("تم حذف العرض ✔");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف العرض ❌");
    }
  };

  // ---------- Sales handlers ----------
  const updateSalesImage = (index, value) => {
    const arr = [...salesForm.image];
    arr[index] = value;
    setSalesForm({ image: arr });
  };

  const handleSalesSubmit = async (e) => {
    e.preventDefault();
    if (!Array.isArray(salesForm.image) || salesForm.image.length < 2) {
      toast.error("يجب إدخال رابطين (لابتوب + موبايل)");
      return;
    }
    if (!salesForm.image.every((u) => u && u.trim() !== "")) {
      toast.error("يرجى إدخال روابط الصور صحيحة");
      return;
    }
    try {
      await axios.post(`${API_URL}/api/admin/sales`, salesForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تم حفظ الصور بنجاح ✔");
      const res = await axios.get(`${API_URL}/api/sales`);
      setSales(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("تعذر حفظ الصور ❌");
    }
  };

  // ---------- FAQ handlers ----------
  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) {
      toast.error("يرجى إدخال السؤال والإجابة");
      return;
    }
    try {
      await axios.post(`${API_URL}/api/admin/faq`, faqForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تمت إضافة السؤال بنجاح ✔");
      const res = await axios.get(`${API_URL}/api/faq`);
      setFaqs(res.data);
      setFaqForm({ question: "", answer: "" });
    } catch (err) {
      console.error(err);
      toast.error("فشل إضافة السؤال ❌");
    }
  };

  const deleteFaq = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/faq/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFaqs(faqs.filter((f) => f._id !== id));
      toast.success("تم حذف السؤال ✔");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف السؤال ❌");
    }
  };

  // ---------- Categories management (NEW) ----------
  // category form states
  const [newMain, setNewMain] = useState({ name_ar: "", key: "", image: "" });
  const [newSub, setNewSub] = useState({ name_ar: "", key: "", image: "", mainCategory: "" });
  const [catLoading, setCatLoading] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);
  const [editingCatData, setEditingCatData] = useState({});

  // refresh categories
  const refreshCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleCreateMain = async (e) => {
    e.preventDefault();
    if (!newMain.name_ar || !newMain.key) {
      toast.error("يرجى إدخال الاسم والمفتاح (key) للفئة الرئيسية");
      return;
    }
    setCatLoading(true);
    try {
      const payload = {
        name_ar: newMain.name_ar,
        key: newMain.key,
        mainCategory: newMain.key, // main category points to its own key
        image: newMain.image || "",
      };
      await axios.post(`${API_URL}/api/admin/categories/add`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تم إنشاء الفئة الرئيسية");
      setNewMain({ name_ar: "", key: "", image: "" });
      await refreshCategories();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("فشل إنشاء الفئة الرئيسية");
    } finally {
      setCatLoading(false);
    }
  };

  const handleCreateSub = async (e) => {
    e.preventDefault();
    if (!newSub.name_ar || !newSub.key || !newSub.mainCategory) {
      toast.error("يرجى ملء اسم المفتاح واختيار الفئة الرئيسية");
      return;
    }
    setCatLoading(true);
    try {
      const payload = {
        name_ar: newSub.name_ar,
        key: newSub.key,
        mainCategory: newSub.mainCategory,
        image: newSub.image || "",
      };
      await axios.post(`${API_URL}/api/admin/categories/add`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تم إنشاء التصنيف الفرعي");
      setNewSub({ name_ar: "", key: "", image: "", mainCategory: "" });
      await refreshCategories();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("فشل إنشاء التصنيف الفرعي");
    } finally {
      setCatLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟ سيؤثر ذلك على المنتجات المرتبطة")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/categories/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تم حذف الفئة");
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف الفئة");
    }
  };

  const startEditCategory = (cat) => {
    setEditingCatId(cat._id);
    setEditingCatData({ name_ar: cat.name_ar, key: cat.key, mainCategory: cat.mainCategory, image: cat.image || "" });
  };

  const cancelEdit = () => {
    setEditingCatId(null);
    setEditingCatData({});
  };

  const saveEditCategory = async (id) => {
    if (!editingCatData.name_ar || !editingCatData.key || !editingCatData.mainCategory) {
      toast.error("أكمل الحقول المطلوبة قبل الحفظ");
      return;
    }
    try {
      await axios.put(`${API_URL}/api/admin/categories/update/${id}`, editingCatData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("تم تحديث الفئة");
      await refreshCategories();
      cancelEdit();
    } catch (err) {
      console.error(err);
      toast.error("فشل تحديث الفئة");
    }
  };

  // ---------- Misc ----------
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Lottie animationData={loadingAnimation} loop autoplay style={{ width: 250, height: 250 }} />
      </div>
    );

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
            <h2 className="text-2xl font-semibold text-purple-700 mb-6 text-center">إضافة منتج جديد</h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 justify-between">
              <fieldset className="flex-1 border p-6 rounded-xl shadow bg-white">
                <legend className="px-3 text-purple-700 font-semibold text-lg">بيانات المنتج</legend>

                <div className="flex flex-col gap-4 mt-4">
                  <input type="text" placeholder="اسم المنتج"
                    className="p-3 border rounded-lg"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} />

                  <input type="number" placeholder="السعر"
                    className="p-3 border rounded-lg"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })} />

                  <input type="number" placeholder="السعر القديم"
                    className="p-3 border rounded-lg"
                    value={form.oldPrice}
                    onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />

                  <input type="text" placeholder="وصف قصير"
                    className="p-3 border rounded-lg"
                    value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />

                  <textarea placeholder="وصف طويل"
                    className="p-3 border rounded-lg h-28"
                    value={form.longDescription}
                    onChange={(e) => setForm({ ...form, longDescription: e.target.value })} />

                  <input type="text" placeholder="الفئة (category ObjectId)"
                    className="p-3 border rounded-lg"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })} />

                  <input type="text" placeholder="الفرعي (subcategory slug)"
                    className="p-3 border rounded-lg"
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })} />

                  <input type="number" placeholder="قيمة الخصم (Sale)"
                    className="p-3 border rounded-lg"
                    value={form.sale}
                    onChange={(e) => setForm({ ...form, sale: e.target.value })} />

                  <select value={form.stockStatus} onChange={(e) => setForm({ ...form, stockStatus: e.target.value })} className="p-3 border rounded-lg">
                    <option value="متوفر">متوفر</option>
                    <option value="عدد محدود">عدد محدود</option>
                    <option value="غير متوفر">غير متوفر</option>
                  </select>
                </div>
              </fieldset>

              <fieldset className="flex-1 border p-6 rounded-xl shadow bg-white relative">
                <legend className="flex items-center gap-2 text-purple-700 font-semibold text-lg">صور المنتج</legend>

                <button type="button"
                  onClick={addImageInput}
                  className="absolute top-3 left-3 bg-purple-700 text-white p-1.5 rounded-lg hover:bg-purple-800">
                  <Plus size={20} />
                </button>

                <div className="flex flex-col gap-4 mt-4">
                  {form.images.map((img, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`رابط الصورة ${index + 1}`}
                      className="p-3 border rounded-lg"
                      value={img}
                      onChange={(e) => updateImage(index, e.target.value)}
                    />
                  ))}
                </div>
              </fieldset>
            </form>

            <button onClick={handleSubmit} className="mt-6 w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800">إضافة المنتج</button>

            {/* PRODUCT CARDS */}
            <div className="flex flex-wrap gap-8 mt-8">
              {products.map((p) => (
                <div key={p._id} className="w-full sm:w-[48%] lg:w-[30%] bg-white rounded-2xl shadow overflow-hidden">
                  <img src={p.images?.[0] || "https://via.placeholder.com/400"} className="w-full h-56 object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800">{p.title || p.name}</h3>
                    <p className="text-gray-600">{p.category?.name_ar || p.category?.key || p.category}</p>
                    <p className="text-gray-600">{p.shortDescription}</p>
                    <p className="text-purple-700 font-bold mt-2">{p.price} د.ع</p>
                    {p.sale > 0 && (<p className="text-red-600 font-semibold">خصم: {p.sale}%</p>)}
                    <button onClick={() => deleteProduct(p._id)} className="mt-4 w-full bg-red-500 text-white flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-red-600">
                      <Trash2 size={18} /> حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================== OFFER SECTION ================== */}
        {activeSection === "addOffer" && (
          <div className="w-full bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl mb-6 flex items-center gap-2 text-purple-700"><TicketPercent size={28} /> إدارة عروض الصفحة</h2>

            <form onSubmit={handleOfferSubmit} className="flex flex-col gap-4 max-w-lg">
              {offerForm.image.map((img, i) => (
                <input key={i} type="text" placeholder={`رابط صورة العرض ${i + 1}`} className="p-3 border rounded-lg" value={img} onChange={(e) => updateOfferImage(i, e.target.value)} />
              ))}

              <input type="text" placeholder="وصف قصير (اختياري)" className="p-3 border rounded-lg" value={offerForm.shortDescription || ""} onChange={(e) => setOfferForm({ ...offerForm, shortDescription: e.target.value })} />
              <textarea placeholder="وصف طويل (اختياري)" className="p-3 border rounded-lg" value={offerForm.longDescription || ""} onChange={(e) => setOfferForm({ ...offerForm, longDescription: e.target.value })} />

              <button type="button" onClick={addOfferImageInput} className="bg-purple-600 text-white py-2 rounded-lg">إضافة صورة أخرى</button>

              <button type="submit" className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800">إضافة العرض</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {offers.map((o) => (
                <div key={o._id} className="bg-white shadow rounded-xl overflow-hidden">
                  {/* offers store image as array or string - handle both */}
                  <img src={Array.isArray(o.image) ? o.image[0] : o.image} className="w-full h-56 object-cover border-b" alt="offer" />
                  <div className="p-3 flex gap-2">
                    <button onClick={() => deleteOffer(o._id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================== SALES HEADER SECTION ================== */}
        {activeSection === "addSales" && (
          <div className="w-full bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl mb-6 flex items-center gap-2 text-purple-700"><Images size={28} /> إدارة صور الهيدر (موبايل + لابتوب)</h2>

            <form onSubmit={handleSalesSubmit} className="flex flex-col gap-4 max-w-lg">
              <input type="text" placeholder="رابط صورة اللابتوب" className="p-3 border rounded-lg" value={salesForm.image[0]} onChange={(e) => updateSalesImage(0, e.target.value)} />
              <input type="text" placeholder="رابط صورة الموبايل" className="p-3 border rounded-lg" value={salesForm.image[1]} onChange={(e) => updateSalesImage(1, e.target.value)} />
              <button type="submit" className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800">حفظ الصور</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {sales.map((s) => (
                <div key={s._id} className="bg-white shadow rounded-xl overflow-hidden">
                  <img src={s.image?.[0]} className="w-full h-48 object-cover border-b" alt="desktop" />
                  <img src={s.image?.[1]} className="w-full h-48 object-cover" alt="mobile" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================== FAQ SECTION ================== */}
        {activeSection === "addFaq" && (
          <div className="w-full bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl mb-6 flex items-center gap-2 text-purple-700">❓ إدارة الأسئلة الشائعة (FAQ)</h2>

            <form onSubmit={handleFaqSubmit} className="flex flex-col gap-4 max-w-lg">
              <input type="text" placeholder="السؤال" className="p-3 border rounded-lg" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} />
              <textarea placeholder="الإجابة" className="p-3 border rounded-lg h-28" value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} />
              <button type="submit" className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800">إضافة السؤال</button>
            </form>

            <div className="mt-8 flex flex-col gap-4">
              {faqs.map((f) => (
                <div key={f._id} className="p-5 bg-gray-50 border rounded-xl shadow flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-purple-700">{f.question}</h3>
                  <p className="text-gray-700">{f.answer}</p>
                  <button onClick={() => deleteFaq(f._id)} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-2">حذف</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================== CATEGORIES SECTION (NEW) ================== */}
        {activeSection === "manageCategories" && (
          <div className="w-full bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl mb-6 flex items-center gap-2 text-purple-700">🗂️ إدارة التصنيفات</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Create main category */}
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-lg mb-3">إنشاء فئة رئيسية</h3>
                <form onSubmit={handleCreateMain} className="flex flex-col gap-3">
                  <input type="text" placeholder="الاسم بالعربية (name_ar)" className="p-3 border rounded-lg" value={newMain.name_ar} onChange={(e) => setNewMain({ ...newMain, name_ar: e.target.value })} />
                  <input type="text" placeholder="المفتاح (key) — مثال: entertainment" className="p-3 border rounded-lg" value={newMain.key} onChange={(e) => setNewMain({ ...newMain, key: e.target.value })} />
                  <input type="text" placeholder="رابط الصورة (اختياري)" className="p-3 border rounded-lg" value={newMain.image} onChange={(e) => setNewMain({ ...newMain, image: e.target.value })} />
                  <button type="submit" className="bg-purple-700 text-white py-2 rounded-lg">{catLoading ? "جارٍ الحفظ..." : "إنشاء الفئة الرئيسية"}</button>
                </form>
              </div>

              {/* Create subcategory */}
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-lg mb-3">إنشاء تصنيف فرعي</h3>
                <form onSubmit={handleCreateSub} className="flex flex-col gap-3">
                  <input type="text" placeholder="الاسم بالعربية (name_ar)" className="p-3 border rounded-lg" value={newSub.name_ar} onChange={(e) => setNewSub({ ...newSub, name_ar: e.target.value })} />
                  <input type="text" placeholder="المفتاح (key) — مثال: netflix" className="p-3 border rounded-lg" value={newSub.key} onChange={(e) => setNewSub({ ...newSub, key: e.target.value })} />
                  <select className="p-3 border rounded-lg" value={newSub.mainCategory} onChange={(e) => setNewSub({ ...newSub, mainCategory: e.target.value })}>
                    <option value="">اختر الفئة الرئيسية</option>
                    {/* main categories: treat any category whose mainCategory equals its own key as a main */}
                    {categories
                      .filter((c) => c.mainCategory === c.key)
                      .map((mc) => (
                        <option value={mc.key} key={mc._id}>{mc.name_ar} ({mc.key})</option>
                      ))}
                  </select>
                  <input type="text" placeholder="رابط الصورة (اختياري)" className="p-3 border rounded-lg" value={newSub.image} onChange={(e) => setNewSub({ ...newSub, image: e.target.value })} />
                  <button type="submit" className="bg-purple-700 text-white py-2 rounded-lg">{catLoading ? "جارٍ الحفظ..." : "إنشاء التصنيف الفرعي"}</button>
                </form>
              </div>
            </div>

            {/* List & edit categories */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">قائمة التصنيفات</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div key={cat._id} className="p-4 border rounded-lg bg-gray-50">
                    {editingCatId === cat._id ? (
                      <>
                        <input className="p-2 border rounded w-full mb-2" value={editingCatData.name_ar} onChange={(e) => setEditingCatData({ ...editingCatData, name_ar: e.target.value })} />
                        <input className="p-2 border rounded w-full mb-2" value={editingCatData.key} onChange={(e) => setEditingCatData({ ...editingCatData, key: e.target.value })} />
                        <select className="p-2 border rounded w-full mb-2" value={editingCatData.mainCategory} onChange={(e) => setEditingCatData({ ...editingCatData, mainCategory: e.target.value })}>
                          {/* allow picking any existing mainCategory */}
                          {Array.from(new Set(categories.map((c) => c.mainCategory))).map((mc) => (
                            <option key={mc} value={mc}>{mc}</option>
                          ))}
                        </select>
                        <input className="p-2 border rounded w-full mb-2" value={editingCatData.image} onChange={(e) => setEditingCatData({ ...editingCatData, image: e.target.value })} />
                        <div className="flex gap-2">
                          <button className="flex-1 bg-green-600 text-white py-2 rounded" onClick={() => saveEditCategory(cat._id)}><Save size={16} /> حفظ</button>
                          <button className="flex-1 bg-gray-300 text-gray-800 py-2 rounded" onClick={cancelEdit}>إلغاء</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-white rounded overflow-hidden border">
                            {cat.image ? <img src={cat.image} alt={cat.name_ar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200" />}
                          </div>
                          <div>
                            <div className="font-semibold">{cat.name_ar}</div>
                            <div className="text-xs text-gray-600">key: {cat.key}</div>
                            <div className="text-xs text-gray-600">main: {cat.mainCategory}</div>
                          </div>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <button onClick={() => startEditCategory(cat)} className="flex-1 bg-yellow-400 text-white py-2 rounded flex items-center justify-center gap-2"><Edit2 size={16} /> تعديل</button>
                          <button onClick={() => handleDeleteCategory(cat._id)} className="flex-1 bg-red-500 text-white py-2 rounded">حذف</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
        <button onClick={() => setActiveSection("addSales")} className={`p-3 rounded-xl text-lg flex items-center gap-3 transition-all ${activeSection === "addSales" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>
          <Megaphone size={22} /> إضافة إعلان
        </button>
        <button onClick={() => setActiveSection("addFaq")} className={`p-3 rounded-xl text-lg flex items-center gap-3 transition-all ${activeSection === "addFaq" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>
          ❓ إدارة الأسئلة الشائعة
        </button>

        {/* NEW: categories management */}
        <button onClick={() => setActiveSection("manageCategories")} className={`p-3 rounded-xl text-lg flex items-center gap-3 transition-all ${activeSection === "manageCategories" ? "bg-white text-purple-700" : "hover:bg-purple-600"}`}>
          🗂️ إدارة التصنيفات
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}
