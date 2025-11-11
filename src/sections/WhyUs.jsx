import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, Star, Zap } from 'lucide-react'

function WhyUs() {
  const { t } = useTranslation()

  const features = [
    {
      icon: <Star className="text-purple-700 w-6 h-6" />,
      title: t('whyus.quality', 'أفضل العروض'),
      text: t('whyus.text1', 'نقدّم أفضل العروض الرقمية والخصومات الموثوقة بأسعار مميزة.'),
    },
    {
      icon: <Zap className="text-purple-700 w-6 h-6" />,
      title: t('whyus.speed', 'سهولة الاستخدام'),
      text: t('whyus.text2', 'تجربة مريحة وسريعة لشراء المنتجات الرقمية بدون تعقيدات.'),
    },
    {
      icon: <ShieldCheck className="text-purple-700 w-6 h-6" />,
      title: t('whyus.security', 'ضمان الأمان'),
      text: t('whyus.text3', 'نضمن لك استلام منتجاتك الرقمية بأمان تام وموثوقية عالية.'),
    },
  ]

  return (
    <section id="whyus" className="py-24 bg-gray-50 text-center px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3"
        >
          {t('whyus.title', 'لماذا تختار BMD؟')}
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          {t('whyus.subtitle', 'نوفّر لك تجربة سلسة وموثوقة لشراء المنتجات الرقمية بأمان وسرعة.')}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-purple-100 rounded-full">{feature.icon}</div>
                <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
