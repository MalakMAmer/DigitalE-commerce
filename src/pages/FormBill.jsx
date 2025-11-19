import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

function FormBill() {
  const location = useLocation()
  const formData = location.state || {}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center border border-purple-200"
      >
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-purple-700 mb-2">تم إرسال الطلب بنجاح </h2>
        <p className="text-gray-500 mb-6">هذه هي تفاصيل الفاتورة الخاصة بك</p>

        <div className="text-right space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-purple-600 mb-1">معلومات العميل</h3>
            <p>الاسم: {formData.name || '—'}</p>
            <p>البريد الإلكتروني: {formData.email || '—'}</p>
            <p>رقم الهاتف: {formData.phone || '—'}</p>
            <p>الدولة: {formData.country || '—'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-600 mb-1">معلومات التواصل</h3>
            <p>Instagram: {formData.instagram || '—'}</p>
            <p>Facebook: {formData.facebook || '—'}</p>
            <p>Telegram: {formData.telegram || '—'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-600 mb-1">طريقة الدفع</h3>
            <p>{formData.paymentMethod ? formData.paymentMethod : 'لم يتم التحديد'}</p>
            {formData.paymentMethod === 'زين كاش' && <p className="text-gray-500">رسوم 2%</p>}
            {formData.paymentMethod === 'تحويل بنكي' && <p className="text-gray-500">رسوم 1.5%</p>}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-600 mb-1">ملخص الطلب</h3>
            <p>التكلفة: {formData.cost || '0'} IQD</p>
            <p>الرسوم: {formData.fees || '0'} IQD</p>
            <p className="font-bold text-purple-700">الإجمالي: {formData.total || '0'} IQD</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-red-600 font-semibold mb-4">
            ⚠️ يرجى أخذ لقطة شاشة لهذه الفاتورة للاحتفاظ بها، وإتمام التحويل البنكي باستخدام الطريقة المحددة، ثم إرسال لقطة الشاشة إلى support@bmdiq.com للتأكيد.
          </p>
          <Link
            to="/"
            className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-all"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </motion.div>

      <p className="mt-6 text-gray-400 text-sm">
        يجب التأكد من إرسال لقطة الشاشة مع التحويل البنكي إلى support@bmdiq.com 💜
      </p>
    </div>
  )
}

export default FormBill
