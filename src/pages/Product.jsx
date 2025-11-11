import React from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products'
import { useTranslation } from 'react-i18next'

function Product() {
    const { id } = useParams()
    const { i18n } = useTranslation()
    const lang = i18n.language
    const product = products.find(p => p.id === id)
    if(!product) return (
    <div className="max-w-5xl mx-auto p-4">منتج غير موجود. <Link to="/">العودة</Link></div>
    )
  return (
    <div className="max-w-5xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <img src={product.image} alt={product.title[lang]} className="w-full h-80 object-cover rounded-lg" />
            <div>
            <h2 className="text-2xl font-bold">{product.title[lang]}</h2>
            <p className="text-gray-700 mt-2">{product.description[lang]}</p>
                <div className="mt-4 flex items-center gap-3">
                <span className="text-xl font-semibold">{product.price}</span>
                <button className="px-4 py-2 bg-purple-700 text-white rounded">شراء</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product