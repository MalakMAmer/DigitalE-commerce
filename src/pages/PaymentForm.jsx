import React from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emailjs from '@emailjs/browser'
import { useNavigate } from "react-router-dom"

function PaymentForm({ cost = 100 }) {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch, reset, trigger } = useForm()

  const fees = {
    'زين كاش': 0.02,
    'تحويل بنكي': 0.015
  }

  const calculateTotal = (method) => {
    const feeRate = fees[method] || 0
    const fee = cost * feeRate
    return { cost, fee, total: cost + fee }
  }

  const onSubmit = async (data) => {
    const totals = calculateTotal(data.paymentMethod)
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      instagram: data.instagram,
      facebook: data.facebook,
      telegram: data.telegram,
      paymentMethod: data.paymentMethod || 'غير محدد',
      fees: `${(totals.fee).toFixed(2)} IQD`,
      cost: `${totals.cost} IQD`,
      total: `${(totals.total).toFixed(2)} IQD`
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE_USER,
        payload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
        payload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      toast.success('تم إرسال الطلب بنجاح!', {
        position: "top-right",
        autoClose: 4000,
        transition: Slide
      })
      reset()
      navigate('/bill', { state: payload })
    } catch (err) {
      console.error(err)
      toast.error('حدث خطأ أثناء إرسال الطلب', {
        position: "top-right",
        autoClose: 4000,
        transition: Slide
      })
    }
  }

  const onError = async () => {
    // Trigger all validations and show one toast
    const valid = await trigger()
    if (!valid) {
      toast.error("يرجى ملء جميع الحقول المطلوبة قبل الإرسال", {
        position: "top-right",
        autoClose: 4000,
        transition: Slide
      })
    }
  }

  const selectedMethod = watch("paymentMethod")
  const totals = calculateTotal(selectedMethod)

  return (
    <div className='flex justify-center items-start pt-20 min-h-screen bg-gray-50 pb-10'>
      <div className="w-full max-w-3xl p-8 sm:p-12 bg-white shadow-lg rounded-xl text-gray-800 m-4">
        <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">نموذج الدفع</h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-6">

          {/* 1. معلومات العميل */}
          <fieldset className="border border-purple-200 p-4 rounded-lg flex flex-col gap-4">
            <legend className="text-lg font-semibold text-purple-700">معلومات العميل (مطلوب)</legend>
            <input type="text" placeholder="الاسم" {...register('name', { required: true })} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full" />
            <input type="email" placeholder="البريد الإلكتروني" {...register('email', { required: true })} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full" />
            <input type="tel" placeholder="الهاتف" {...register('phone', { required: true })} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full rtl" />
            <input type="text" placeholder="البلد" {...register('country', { required: true })} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full" />
          </fieldset>

          {/* 2. معلومات التواصل */}
          <fieldset className="border border-purple-200 p-4 rounded-lg flex flex-col gap-4">
            <legend className="text-lg font-semibold text-purple-700">معلومات التواصل (اختياري)</legend>
            <input type="text" placeholder="رابط Instagram" {...register('instagram')} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full" />
            <input type="text" placeholder="رابط Facebook" {...register('facebook')} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full" />
            <input type="text" placeholder="رابط Telegram" {...register('telegram')} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full" />
          </fieldset>

          {/* 3. طريقة الدفع */}
          <fieldset className="border border-purple-200 p-4 rounded-lg flex flex-col gap-2">
            <legend className="text-lg font-semibold text-purple-700">طريقة الدفع (مطلوب)</legend>
            <label className="flex items-center gap-2">
              <input type="radio" value="زين كاش" {...register('paymentMethod', { required: true })} />
              زين كاش (رسوم 2%)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="تحويل بنكي" {...register('paymentMethod', { required: true })} />
              تحويل بنكي (رسوم 1.5%)
            </label>
          </fieldset>

          {/* 4. ملخص الطلب */}
          <fieldset className="border border-purple-200 p-4 rounded-lg flex flex-col gap-2">
            <legend className="text-lg font-semibold text-purple-700">ملخص الطلب</legend>
            <input type="text" value={`التكلفة: ${totals.cost} IQD`} readOnly className="p-3 border rounded-lg bg-gray-100 w-full" />
            <input type="text" value={`الرسوم: ${totals.fee.toFixed(2)} IQD`} readOnly className="p-3 border rounded-lg bg-gray-100 w-full" />
            <input type="text" value={`الإجمالي: ${totals.total.toFixed(2)} IQD`} readOnly className="p-3 border rounded-lg bg-gray-100 font-bold w-full" />
          </fieldset>

          <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 rounded-lg transition-all text-lg">
            إرسال الطلب
          </button>
        </form>

        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick={false}
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </div>
    </div>
  )
}

export default PaymentForm
