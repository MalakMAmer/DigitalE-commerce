import React from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function ProductsList() {
  const { t } = useTranslation()

  return (
    <section id="products" className="py-24 px-4 bg-white text-center">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3"
        >
          {t('products.title', 'اكتشف منتجاتنا الرقمية')}
        </motion.h2>
        <p className="text-gray-600 mb-10">
          {t('products.subtitle', 'اختر من بين مجموعة متنوعة من المنتجات الرقمية والخصومات المميزة')}
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <button className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition-all">
            {t('products.viewAll', 'عرض جميع المنتجات')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductsList
