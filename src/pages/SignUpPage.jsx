import React from 'react'
import { useForm } from 'react-hook-form'

function SignUpPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    console.log('Sign up page data:', data)
    alert(`شكراً للتسجيل، ${data.name}!`)
    reset()
  }

  return (
    <div>
        <div className="p-32 flex justify-center items-center bg-purple-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">صفحة التسجيل</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="الاسم"
                    {...register('name', { required: 'الاسم مطلوب' })}
                    className="p-3 border border-gray-300 rounded-lg"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

                <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    {...register('email', { 
                    required: 'البريد الإلكتروني مطلوب',
                    pattern: { value: /^\S+@\S+$/i, message: 'بريد إلكتروني غير صالح' }
                    })}
                    className="p-3 border border-gray-300 rounded-lg"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                <input
                    type="password"
                    placeholder="كلمة المرور"
                    {...register('password', { required: 'كلمة المرور مطلوبة', minLength: { value: 6, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' } })}
                    className="p-3 border border-gray-300 rounded-lg"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                <button
                    type="submit"
                    className="p-3 mt-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-all"
                >
                    تسجيل
                </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage