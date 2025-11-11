import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'meclient@gmail.com' && password === 'meclient1234') {
      localStorage.setItem('auth', 'true')
      navigate('/dashboard')
    } else {
      alert('❌ البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">تسجيل الدخول</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="p-3 mt-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-all"
          >
            دخول
          </button>
        </form>
      </div>
    </section>
  )
}

export default SignInPage
