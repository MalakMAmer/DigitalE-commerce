import { useState, useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function ProductsDash({ products = [], categories = [], onCreate, onDelete }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    oldPrice: "",
    shortDescription: "",
    longDescription: "",
    mainCategory: "",
    category: "",
    sale: 0,
    stockStatus: "متوفر",
    images: [""],
  });

  const [submitting, setSubmitting] = useState(false);

  // --- Filter categories by mainCategory ---
  const filteredCategories = useMemo(() => {
    if (!form.mainCategory) return [];
    return categories.filter(c => c.mainCategory === form.mainCategory);
  }, [form.mainCategory, categories]);
  console.log("Filtered subcategories:", filteredCategories);

  // --- Add image (max 10) ---
  const addImage = () => {
    if (form.images.length >= 10) return alert("يمكن إضافة 10 صور فقط");
    setForm((f) => ({ ...f, images: [...f.images, ""] }));
  };

  const updateImage = (i, val) => {
    const updated = [...form.images];
    updated[i] = val;
    setForm({ ...form, images: updated });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category || !form.mainCategory)
      return alert("يرجى ملء الحقول المطلوبة");

    setSubmitting(true);
    try {
      // Send product to backend
      const created = await onCreate({
        title: form.title,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
        shortDescription: form.shortDescription,
        longDescription: form.longDescription,
        subcategory: filteredCategories.find((c) => c._id === form.category)?.key || "default",
        mainCategory: form.mainCategory,
        category: form.category, // must be _id of category
        sale: Number(form.sale),
        stockStatus: form.stockStatus,
        images: form.images.filter(Boolean),
      });

      // Reset form
      setForm({
        title: "",
        price: "",
        oldPrice: "",
        shortDescription: "",
        longDescription: "",
        mainCategory: "",
        category: "",
        sale: 0,
        stockStatus: "متوفر",
        images: [""],
      });
    } catch (err) {
      console.error("Error creating product:", err);
    } finally {
      setSubmitting(false);
    }
  };

  

  return (
    <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">
        إدارة المنتجات
      </h2>

      {/* ---------- FORM ---------- */}
      <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RIGHT SIDE – PRODUCT DETAILS */}
        <div className="border p-5 rounded-xl space-y-4">
          <input
            className="p-3 border rounded-lg w-full"
            placeholder="اسم المنتج"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <div className="flex flex-col gap-3">
            <input
              className="p-3 border rounded-lg flex-1"
              placeholder="السعر"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="p-3 border rounded-lg flex-1"
              placeholder="السعر القديم"
              type="number"
              value={form.oldPrice}
              onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
            />
          </div>

          <input
            className="p-3 border rounded-lg w-full"
            placeholder="وصف قصير"
            value={form.shortDescription}
            onChange={(e) =>
              setForm({ ...form, shortDescription: e.target.value })
            }
          />

          <textarea
            className="p-3 border rounded-lg w-full h-28"
            placeholder="وصف طويل"
            value={form.longDescription}
            onChange={(e) =>
              setForm({ ...form, longDescription: e.target.value })
            }
          />

          <select
            className="p-3 border rounded-lg w-full"
            value={form.mainCategory}
            onChange={(e) => setForm({ ...form, mainCategory: e.target.value, category: "" })}
          >
            <option value="">اختر القسم الرئيسي</option>
            {[...new Set(categories.map(c => c.mainCategory))].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {/* Subcategory */}
          <select
            className="p-3 border rounded-lg w-full"
            value={form.category}
            disabled={!form.mainCategory || filteredCategories.length === 0}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">اختر الفئة</option>
            {filteredCategories.map(sub => (
              <option key={sub._id} value={sub._id}>
                {sub.name_ar} ({sub.key})
              </option>
            ))}
          </select>

          <div className="flex flex-col gap-3">
            <input
              className="p-3 border rounded-lg flex-1"
              type="number"
              placeholder="قيمة الخصم(%)"
              value={form.sale}
              onChange={(e) => setForm({ ...form, sale: e.target.value })}
            />

            <select
              className="p-3 border rounded-lg flex-1"
              value={form.stockStatus}
              onChange={(e) =>
                setForm({ ...form, stockStatus: e.target.value })
              }
            >
              <option value="متوفر">متوفر</option>
              <option value="عدد محدود">عدد محدود</option>
              <option value="غير متوفر">غير متوفر</option>
            </select>
          </div>
        </div>

        {/* LEFT SIDE – IMAGES */}
        <div className="border p-5 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold">صور المنتج (حتى 10 صور)</p>
            <button
              type="button"
              onClick={addImage}
              className="bg-purple-600 text-white px-3 py-1 rounded-lg flex items-center gap-2"
            >
              <Plus size={14} /> إضافة
            </button>
          </div>

          <div className="space-y-2 max-h-[350px] overflow-auto pr-1">
            {form.images.map((img, i) => (
              <input
                key={i}
                className="p-3 border rounded-lg w-full"
                placeholder={`رابط الصورة ${i + 1}`}
                value={img}
                onChange={(e) => updateImage(i, e.target.value)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-700 text-white py-3 rounded-lg mt-6"
          >
            {submitting ? "جارٍ الحفظ..." : "إضافة المنتج"}
          </button>
        </div>
      </form>

      {/* PRODUCT LIST */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-2xl shadow overflow-hidden">
            <img
              src={p.images?.[0] || "https://via.placeholder.com/400"}
              className="w-full h-56 object-cover"
              alt={p.title}
            />
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.category?.name_ar || "بدون فئة"}</p>
              <p className="mt-2 text-purple-700 font-bold">{p.price} د.ع</p>

              <button
                onClick={() => onDelete(p._id)}
                className="w-full bg-red-500 text-white py-2 rounded flex items-center justify-center gap-2 mt-4"
              >
                <Trash2 size={14} /> حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
