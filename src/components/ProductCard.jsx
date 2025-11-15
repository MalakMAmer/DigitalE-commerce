// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'

// function ProductCard({ product }) {
//   const { i18n } = useTranslation()
//   const lang = i18n.language

//   return (
//     <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-44 object-cover"
//       />
//       <div className="p-5 text-right">
//         <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
//         <p className="text-sm text-gray-600 mb-4">{typeof product.description === 'object' ? product.description.ar : product.description}</p>
//         <div className="flex items-center justify-between">
//           <span className="font-bold text-gray-900">{product.price} da</span>
//           <Link
//             to={`/product/${product._id}`}
//             className="bg-purple-700 text-white px-3 py-1.5 rounded-md text-sm hover:bg-purple-800 transition-all"
//           >
//             عرض المنتج
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductCard
