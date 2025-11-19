import { useState } from "react";

export default function SalesDash({ sales = [], onCreate, onDelete }) {
  const [images, setImages] = useState(["", ""]);
  const [saving, setSaving] = useState(false);

  const update = (i, v) => {
    const arr = [...images];
    arr[i] = v;
    setImages(arr);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!images[0] || !images[1]) return alert("أدخل رابطين (لابتوب + موبايل)");

    setSaving(true);
    try {
      await onCreate({ images });
      setImages(["", ""]);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">
        إدارة صور الهيدر (لابتوب + موبايل)
      </h2>

      {/* 🔥 Only show the form if there is NO existing entry */}
      {sales.length === 0 ? (
        <form onSubmit={submit} className="flex flex-col gap-3 max-w-lg">
          <input
            className="p-3 border rounded-lg"
            placeholder="رابط صورة اللابتوب"
            value={images[0]}
            onChange={(e) => update(0, e.target.value)}
          />

          <input
            className="p-3 border rounded-lg"
            placeholder="رابط صورة الموبايل"
            value={images[1]}
            onChange={(e) => update(1, e.target.value)}
          />

          <button
            type="submit"
            disabled={saving}
            className="bg-purple-700 text-white py-3 rounded-lg w-48"
          >
            {saving ? "جارٍ الحفظ..." : "حفظ الهيدر"}
          </button>
        </form>
      ) : (
        <p className="text-red-600 bg-red-50 p-3 rounded-lg w-fit text-sm">
          لا يمكنك إضافة أكثر من هيدر. قم بحذف الهيدر الحالي لإضافة واحد جديد.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {sales.map((s) => (
          <div
            key={s._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
            src={s.images?.[0]}
            className="w-full h-40 object-cover border-b"
            alt="desktop"
            />

            <img
            src={s.images?.[1]}
            className="w-full h-40 object-cover"
            alt="mobile"
            />

            <div className="p-3">
              <button
                onClick={() => onDelete(s._id)}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
