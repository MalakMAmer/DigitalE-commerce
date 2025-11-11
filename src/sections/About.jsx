import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation()

  return (
    <section
      id="about"
      className="relative py-32 px-4 flex justify-center items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-indigo-100 opacity-70"></div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Gradient text title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent"
        >
          {t('about.title')}
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-700 leading-relaxed max-w-3xl mx-auto"
        >
          {t('about.p')}
        </motion.p>
      </div>
    </section>
  )
}

export default About
