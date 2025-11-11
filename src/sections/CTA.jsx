import React from 'react'

function CTA() {
  return (
    <section className="py-16 px-6 mt-10">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-700">
          اكتشف أحدث العروض الرقمية الآن
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          تصفح مجموعتنا الواسعة من المنتجات الرقمية والعروض المميزة لتجد ما يناسبك بأفضل الأسعار.
        </p>
        <button className="px-8 py-3 mt-4 text-lg font-semibold rounded-xl bg-purple-700 text-white hover:bg-purple-800 transition-all duration-300 shadow">
          تصفح العروض
        </button>
      </div>
    </section>
  )
}

export default CTA
