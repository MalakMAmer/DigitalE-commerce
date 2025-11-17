import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Plus, Trash2, LogOut } from "lucide-react";
import { Images } from "lucide-react";
import { PackagePlus, TicketPercent, Megaphone } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState("addProduct");
  const [offers, setOffers] = useState([]);
  const [sales, setSales] = useState([]); 
  const [faqs, setFaqs] = useState([]);

  const [faqForm, setFaqForm] = useState({ question: "", answer: "" });
  const [form, setForm] = useState({
    name: "",
    price: "",
    shortDescription: "",
    longDescription: "",
    category: "",
    sale: "",
    images: [""],
  });

  const [salesForm, setSalesForm] = useState({ image: ["", ""] });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch(() => toast.error("فشل تحميل المنتجات"));
    axios.get(`${API_URL}/api/offers`).then((res) => setOffers(res.data));
    axios.get(`${API_URL}/api/sales`).then((res) => setSales(res.data));
    axios.get(`${API_URL}/api/faq`).then((res) => setFaqs(res.data));

  }, []);

  // Product handlers
  

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
    try {
      await axios.post(`${API_URL}/api/admin/products`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("تمت إضافة المنتج بنجاح ✔");

      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);

      setForm({
        name: "",
        price: "",
        shortDescription: "",
        longDescription: "",
        category: "",
        sale: "",
        images: [""],
      });
    } catch {
      toast.error("فشل إضافة المنتج ❌");
    }
  };
  // ========================= OFFER HANDLERS =============================

  

  // OFFER STATE
  const [offerForm, setOfferForm] = useState({ image: [""] });


  // HANDLE INPUT CHANGE
  const updateOfferImage = (index, value) => {
    const arr = [...offerForm.image];
    arr[index] = value;
    setOfferForm({ image: arr });
  };
  const addOfferImageInput = () => {
    setOfferForm({ image: [...offerForm.image, ""] });
  };


  // SUBMIT OFFER
  const handleOfferSubmit = async (e) => {
    e.preventDefault();

    if (!offerForm.image.trim()) {
      toast.error("يجب إضافة رابط الصورة");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/admin/offers`, offerForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("تمت إضافة العرض بنجاح 🎉");

      setOfferForm({ image: "" });

      const res = await axios.get(`${API_URL}/api/offers`);
      setOffers(res.data);

    } catch {
      toast.error("حدث خطأ أثناء إضافة العرض ❌");
    }
  };

  // DELETE OFFER
  const deleteOffer = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/offers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOffers(offers.filter((o) => o._id !== id));
      toast.success("تم حذف العرض ✔");
    } catch {
      toast.error("فشل حذف العرض ❌");
    }
  };


  // ========================= SALES HEADER HANDLERS =============================
  const updateSalesImage = (index, value) => {
  const arr = [...salesForm.image];
  arr[index] = value;
  setSalesForm({ image: arr });
  };


  const handleSalesSubmit = async (e) => {
    e.preventDefault();

    // Validate non-empty URLs
    if (!salesForm.image.every(url => url.trim() !== "")) {
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


  // ========================= FAQ HANDLERS =============================
  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/faq`, faqForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("تمت إضافة السؤال بنجاح ✔");

      const res = await axios.get(`${API_URL}/api/faq`);
      setFaqs(res.data);

      setFaqForm({ question: "", answer: "" });
    } catch {
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
    } catch {
      toast.error("فشل حذف السؤال ❌");
    }
  };


  const handleLogout = () => {
  localStorage.removeItem("token");
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
                <legend className="px-3 text-purple-700 font-semibold text-lg">
                  بيانات المنتج
                </legend>

                <div className="flex flex-col gap-4 mt-4">
                  <input type="text" placeholder="اسم المنتج"
                    className="p-3 border rounded-lg"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />

                  <input type="number" placeholder="السعر"
                    className="p-3 border rounded-lg"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })} />

                  <input type="text" placeholder="وصف قصير"
                    className="p-3 border rounded-lg"
                    value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />

                  <textarea placeholder="وصف طويل"
                    className="p-3 border rounded-lg h-28"
                    value={form.longDescription}
                    onChange={(e) => setForm({ ...form, longDescription: e.target.value })} />

                  <input type="text" placeholder="الفئة"
                    className="p-3 border rounded-lg"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })} />

                  <input type="number" placeholder="قيمة الخصم (Sale)"
                    className="p-3 border rounded-lg"
                    value={form.sale}
                    onChange={(e) => setForm({ ...form, sale: e.target.value })} />
                </div>
              </fieldset>

              {/* Product images */}
              <fieldset className="flex-1 border p-6 rounded-xl shadow bg-white relative">
                <legend className="flex items-center gap-2 text-purple-700 font-semibold text-lg">
                  صور المنتج
                </legend>

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

            <button
              type="submit"
              className="mt-6 w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800">
              إضافة المنتج
            </button>

            {/* PRODUCT CARDS */}
            <div className="flex flex-wrap gap-8 mt-8">
              {products.map((p) => (
                <div key={p._id} className="w-full sm:w-[48%] lg:w-[30%] bg-white rounded-2xl shadow overflow-hidden">

                  <img src={p.images?.[0] || "https://via.placeholder.com/400"}
                    className="w-full h-56 object-cover" />

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
                    <p className="text-gray-600">{p.category}</p>
                    <p className="text-gray-600">{p.shortDescription}</p>
                    <p className="text-purple-700 font-bold mt-2">{p.price} ج.م</p>
                    {p.sale > 0 && (
                      <p className="text-red-600 font-semibold">خصم: {p.sale}%</p>
                    )}

                    <button onClick={() => deleteProduct(p._id)}
                      className="mt-4 w-full bg-red-500 text-white flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-red-600">
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
          <input
            key={i}
            type="text"
            placeholder={`رابط صورة العرض ${i + 1}`}
            className="p-3 border rounded-lg"
            value={img}
            onChange={(e) => updateOfferImage(i, e.target.value)}
          />
        ))}

        <button
          type="button"
          onClick={addOfferImageInput}
          className="bg-purple-600 text-white py-2 rounded-lg"
        >
          إضافة صورة أخرى
        </button>

        <button
          type="submit"
          className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800"
        >
          إضافة العرض
        </button>
      </form>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {offers.map((o) => (
          <div key={o._id} className="bg-white shadow rounded-xl overflow-hidden">
            <img
              src={o.image[0]}
              className="w-full h-56 object-cover border-b"
            />
            <button
              onClick={() => deleteOffer(o._id)}
              className="w-full bg-red-500 text-white py-2 hover:bg-red-600"
            >
              حذف
            </button>
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
        <img src={s.image?.[0]} className="w-full h-48 object-cover border-b" />
        <img src={s.image?.[1]} className="w-full h-48 object-cover" />
        </div>
        ))}
        </div>
        </div>
        )}


        {activeSection === "addFaq" && (
        <div className="w-full bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl mb-6 flex items-center gap-2 text-purple-700">
            ❓ إدارة الأسئلة الشائعة (FAQ)
          </h2>

          <form onSubmit={handleFaqSubmit} className="flex flex-col gap-4 max-w-lg">
            <input
              type="text"
              placeholder="السؤال"
              className="p-3 border rounded-lg"
              value={faqForm.question}
              onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
            />

            <textarea
              placeholder="الإجابة"
              className="p-3 border rounded-lg h-28"
              value={faqForm.answer}
              onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
            />

            <button
              type="submit"
              className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800"
            >
              إضافة السؤال
            </button>
          </form>

          {/* FAQ LIST */}
          <div className="mt-8 flex flex-col gap-4">
            {faqs.map((f) => (
              <div
                key={f._id}
                className="p-5 bg-gray-50 border rounded-xl shadow flex flex-col gap-2"
              >
                <h3 className="text-xl font-semibold text-purple-700">{f.question}</h3>
                <p className="text-gray-700">{f.answer}</p>

                <button
                  onClick={() => deleteFaq(f._id)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-2"
                >
                  حذف
                </button>
              </div>
            ))}
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
        <button
          onClick={() => setActiveSection("addFaq")}
          className={`p-3 rounded-xl text-lg flex items-center gap-3 transition-all ${
            activeSection === "addFaq" ? "bg-white text-purple-700" : "hover:bg-purple-600"
          }`}
        >
          ❓ إدارة الأسئلة الشائعة
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}
