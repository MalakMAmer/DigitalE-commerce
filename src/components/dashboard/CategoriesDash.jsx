import { useState, useEffect } from "react";

/**
 * Props:
 * - categories: []  // fetched from API
 * - onCreate(payload)
 * - onUpdate(id, payload)
 * - onDelete(id)
 */
export default function CategoriesDash({ categories = [], onCreate, onUpdate, onDelete }) {
  const [newMain, setNewMain] = useState({ name_ar: "", key: "", image: "" });
  const [newSub, setNewSub] = useState({ name_ar: "", key: "", mainCategory: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ name_ar: "", key: "", mainCategory: "", image: "" });

  const createMain = async (e) => {
    e.preventDefault();
    if (!newMain.name_ar || !newMain.key) return alert("املأ الاسم والمفتاح");
    await onCreate({ 
      name_ar: newMain.name_ar, 
      key: newMain.key, 
      mainCategory: newMain.key, // mainCategory same as key
      image: newMain.image 
    });
    setNewMain({ name_ar: "", key: "", image: "" });
  };

  const createSub = async (e) => {
    e.preventDefault();
    if (!newSub.name_ar || !newSub.key || !newSub.mainCategory) return alert("املأ جميع الحقول الفرعية");
    await onCreate({ 
      name_ar: newSub.name_ar, 
      key: newSub.key, 
      mainCategory: newSub.mainCategory, 
      image: newSub.image 
    });
    setNewSub({ name_ar: "", key: "", mainCategory: "", image: "" });
  };

  const startEdit = (cat) => {
    setEditingId(cat._id);
    setEditingData({ 
      name_ar: cat.name_ar, 
      key: cat.key, 
      mainCategory: cat.mainCategory, 
      image: cat.image || "" 
    });
  };

  const saveEdit = async (id) => {
    if (!editingData.name_ar || !editingData.key || !editingData.mainCategory) return alert("أكمل الحقول");
    await onUpdate(id, editingData);
    setEditingId(null);
    setEditingData({ name_ar: "", key: "", mainCategory: "", image: "" });
  };

  // fetch only main categories from API (mainCategory === key)
  const mainCategories = categories.filter(c => c.mainCategory === c.key);

  return (
    <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">إدارة التصنيفات</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Category Form */}
        <form onSubmit={createMain} className="p-4 border rounded-lg flex flex-col gap-3">
          <h3 className="font-semibold mb-2">إنشاء فئة رئيسية</h3>
          <input 
            className="p-2 border rounded w-full" 
            placeholder="الاسم (عربي)" 
            value={newMain.name_ar} 
            onChange={(e) => setNewMain({ ...newMain, name_ar: e.target.value })} 
          />
          <input 
            className="p-2 border rounded w-full" 
            placeholder="المفتاح (مثال: entertainment)" 
            value={newMain.key} 
            onChange={(e) => setNewMain({ ...newMain, key: e.target.value })} 
          />
          <input 
            className="p-2 border rounded w-full" 
            placeholder="رابط الصورة (اختياري)" 
            value={newMain.image} 
            onChange={(e) => setNewMain({ ...newMain, image: e.target.value })} 
          />
          <button className="bg-purple-700 text-white py-2 rounded-lg mt-2">إنشاء</button>
        </form>

        {/* Subcategory Form */}
        <form onSubmit={createSub} className="p-4 border rounded-lg flex flex-col gap-3">
          <h3 className="font-semibold mb-2">إنشاء تصنيف فرعي</h3>
          <input 
            className="p-2 border rounded w-full" 
            placeholder="الاسم (عربي)" 
            value={newSub.name_ar} 
            onChange={(e) => setNewSub({ ...newSub, name_ar: e.target.value })} 
          />
          <input 
            className="p-2 border rounded w-full" 
            placeholder="المفتاح (مثال: netflix)" 
            value={newSub.key} 
            onChange={(e) => setNewSub({ ...newSub, key: e.target.value })} 
          />
          <select 
            className="p-2 border rounded w-full" 
            value={newSub.mainCategory} 
            onChange={(e) => setNewSub({ ...newSub, mainCategory: e.target.value })}
            required
          >
            <option value="">اختر الفئة الرئيسية</option>
            {mainCategories.map(mc => (
              <option key={mc._id} value={mc.key}>{mc.name_ar}</option>
            ))}
          </select>
          <input 
            className="p-2 border rounded w-full" 
            placeholder="رابط الصورة (اختياري)" 
            value={newSub.image} 
            onChange={(e) => setNewSub({ ...newSub, image: e.target.value })} 
          />
          <button className="bg-purple-700 text-white py-2 rounded-lg mt-2">إنشاء</button>
        </form>
      </div>

      {/* Categories List */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3">قائمة التصنيفات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div key={cat._id} className="p-3 border rounded-lg bg-gray-50">
              {editingId === cat._id ? (
                <div className="flex flex-col gap-2">
                  <input 
                    className="p-2 border rounded w-full" 
                    value={editingData.name_ar} 
                    onChange={(e) => setEditingData({ ...editingData, name_ar: e.target.value })} 
                  />
                  <input 
                    className="p-2 border rounded w-full" 
                    value={editingData.key} 
                    onChange={(e) => setEditingData({ ...editingData, key: e.target.value })} 
                  />
                  <select 
                    className="p-2 border rounded w-full" 
                    value={editingData.mainCategory} 
                    onChange={(e) => setEditingData({ ...editingData, mainCategory: e.target.value })}
                    required
                  >
                    {mainCategories.map(mc => (
                      <option key={mc._id} value={mc.key}>{mc.name_ar}</option>
                    ))}
                  </select>
                  <input 
                    className="p-2 border rounded w-full" 
                    value={editingData.image} 
                    onChange={(e) => setEditingData({ ...editingData, image: e.target.value })} 
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => saveEdit(cat._id)} className="flex-1 bg-green-600 text-white py-2 rounded">حفظ</button>
                    <button onClick={() => { setEditingId(null); setEditingData({}); }} className="flex-1 bg-gray-300 py-2 rounded">إلغاء</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
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
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => startEdit(cat)} className="flex-1 bg-yellow-400 text-white py-2 rounded">تعديل</button>
                    <button onClick={() => onDelete(cat._id)} className="flex-1 bg-red-500 text-white py-2 rounded">حذف</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
