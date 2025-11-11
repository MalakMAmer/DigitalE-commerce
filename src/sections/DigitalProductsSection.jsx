import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import product from '../assets/product.png'

function DigitalProductsSection() {
  const [filter, setFilter] = useState('all')

  const products = [
    { id: 1, 
    name: 'كوبون خصم 50٪', 
    price: '4.99', 
    category: 'coupons', 
    image: product },
    { id: 2, 
    name: 'بطاقة اشتراك نتفليكس شهر', 
    price: '9.99', 
    category: 'subscriptions', image: product },
    { id: 3, name: 'عرض باقات برامج أوفيس', price: '14.99', category: 'software', image: product },
    { id: 4, name: 'كود خصم للألعاب', price: '6.50', category: 'gaming', image: product },
    { id: 5, name: 'كتاب رقمي حول التسويق', price: '7.99', category: 'ebooks', image: product},
  ]

  const categories = [
    { key: 'all', label: 'الكل' },
    { key: 'coupons', label: 'كوبونات' },
    { key: 'subscriptions', label: 'الاشتراكات' },
    { key: 'software', label: 'البرامج' },
    { key: 'gaming', label: 'الألعاب' },
    { key: 'ebooks', label: 'الكتب الرقمية' },
  ]

  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter)

  return (
    <section className="py-20 px-6 bg-white" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-3xl font-extrabold text-center text-purple-700 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          منتجات رقمية بأسعار مميزة
        </motion.h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                filter === cat.key
                  ? 'bg-purple-700 text-white border-purple-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
              data-aos="fade-up"
            >
              <img src={product.image} alt={product.name} className="w-36 h-36 object-contain mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-1">${product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DigitalProductsSection
