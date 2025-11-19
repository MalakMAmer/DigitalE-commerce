import { useState } from "react";

/**
 * Props:
 * - faqs: []
 * - onCreate(payload)
 * - onDelete(id)
 */
export default function FAQDash({ faqs = [], onCreate, onDelete }) {
  const [form, setForm] = useState({ question: "", answer: "" });
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.question || !form.answer) return alert("املأ السؤال والإجابة");
    setSaving(true);
    try {
      await onCreate(form);
      setForm({ question: "", answer: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">الأسئلة الشائعة</h2>

      <form onSubmit={submit} className="max-w-lg flex flex-col gap-3">
        <input className="p-3 border rounded-lg" placeholder="السؤال" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
        <textarea className="p-3 border rounded-lg" placeholder="الإجابة" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
        <button type="submit" className="bg-purple-700 text-white py-3 rounded-lg w-48">{saving ? "جارٍ الحفظ..." : "إضافة السؤال"}</button>
      </form>

      <div className="mt-6 grid gap-4">
        {faqs.map((f) => (
          <div key={f._id} className="p-4 bg-gray-50 border rounded-lg">
            <div className="font-semibold text-purple-700">{f.question}</div>
            <div className="text-gray-700 mt-2">{f.answer}</div>
            <div className="mt-3">
              <button onClick={() => onDelete(f._id)} className="bg-red-500 text-white py-2 px-3 rounded-lg">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
