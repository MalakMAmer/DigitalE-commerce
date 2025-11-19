import { useState } from "react";

export default function OffersDash({ offers = [], onCreate, onDelete }) {
  const [form, setForm] = useState({
    image: "",
    shortDescription: "",
    longDescription: "",
  });

  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.image) return alert("أضف رابط صورة");

    setSaving(true);

    try {
      await onCreate({
        image: form.image,
        shortDescription: form.shortDescription,
        longDescription: form.longDescription,
      });

      setForm({ image: "", shortDescription: "", longDescription: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">
        إدارة العروض
      </h2>

      <form onSubmit={submit} className="flex flex-col gap-3 max-w-lg">
        <input
          className="p-3 border rounded-lg"
          placeholder="رابط صورة العرض"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          className="p-3 border rounded-lg"
          placeholder="وصف قصير (اختياري)"
          value={form.shortDescription}
          onChange={(e) =>
            setForm({ ...form, shortDescription: e.target.value })
          }
        />

        <textarea
          className="p-3 border rounded-lg"
          placeholder="وصف طويل (اختياري)"
          value={form.longDescription}
          onChange={(e) =>
            setForm({ ...form, longDescription: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-purple-700 text-white py-3 rounded-lg w-44"
        >
          {saving ? "جارٍ الحفظ..." : "إضافة العرض"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {offers.map((o) => (
          <div
            key={o._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={o.image}
              className="w-full h-40 object-cover"
              alt="offer"
            />

            <div className="p-3 flex gap-2">
              <button
                onClick={() => onDelete(o._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
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
