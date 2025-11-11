import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import bgHero from '../assets/bgHero.jpeg'

const offers = [
  {
    id: 1,
    title: 'خصم 20% على كل المنتجات الرقمية',
    description: 'اغتنم الفرصة واحصل على أفضل المنتجات بسعر مخفض.',
    image: bgHero,
  },
  {
    id: 2,
    title: 'اشتراك سنوي مجاني لأول 50 عميل',
    description: 'كن من أوائل المشتركين واستمتع بالمزايا الحصرية.',
    image: bgHero,
  },
  {
    id: 3,
    title: 'هدايا مجانية عند شراء أي منتج',
    description: 'احصل على منتجات رقمية إضافية مجانية عند كل عملية شراء.',
    image: bgHero,
  },
]

function NewestOffers() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => setCurrent((prev) => (prev + 1) % offers.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + offers.length) % offers.length)

  return (
    <section className="py-24 px-4 bg-gray-50 text-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3"
        >
          أحدث العروض
        </motion.h2>
        <p className="text-gray-600 mb-12">
          اكتشف أفضل العروض الرقمية المتاحة لدينا الآن
        </p>

        {/* Offer Slider */}
        <div className="relative flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={offers[current].id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full sm:w-[28rem] text-right"
            >
              <img
                src={offers[current].image}
                alt={offers[current].title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {offers[current].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {offers[current].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 border border-gray-300 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-700 hover:text-white shadow-sm transition-all"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 border border-gray-300 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-700 hover:text-white shadow-sm transition-all"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current ? 'bg-purple-700 scale-110' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewestOffers
