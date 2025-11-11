import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([
    { id: 1, name: 'كوبون خصم 50%', price: '10$', stock: 25 },
    { id: 2, name: 'بطاقة متجر Google Play', price: '20$', stock: 15 },
    { id: 3, name: 'بطاقة App Store', price: '25$', stock: 12 },
  ])

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate('/signin')
  }

  return (
    <section className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">لوحة التحكم</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          تسجيل الخروج
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">المنتجات الرقمية</h2>
        <table className="w-full border-collapse text-right">
          <thead>
            <tr className="bg-purple-100 text-gray-700">
              <th className="p-3">الاسم</th>
              <th className="p-3">السعر</th>
              <th className="p-3">المخزون</th>
              <th className="p-3">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Dashboard
