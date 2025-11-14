import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: 'كيف أشتري كوبون خصم على BMD Store؟',
    answer: 'يمكنك شراء كوبون الخصم بسهولة من خلال تصفح المنتجات الرقمية، اختيار الكوبون وإتمام الطلب عبر طرق الدفع المتاحة.'
  },
  {
    question: 'ما هي طرق الدفع المتاحة على BMD Store؟',
    answer: 'ندعم الدفع عند الاستلام، التحويل البنكي، والمحافظ الرقمية، ويمكنك اختيار الطريقة المناسبة لك عند إتمام الطلب.'
  },
  {
    question: 'هل يمكنني استرجاع أو استبدال المنتج الرقمي؟',
    answer: 'نظراً للطبيعة الرقمية للمنتجات، لا يمكن الاسترجاع بعد إتمام الشراء، ولكن يمكنك التواصل معنا لأي استفسار.'
  },
  {
    question: 'كيف أستلم المنتج الرقمي بعد الشراء؟',
    answer: 'سيتم إرسال المنتج الرقمي مباشرة إلى بريدك الإلكتروني أو عبر رابط التحميل بعد اكتمال الطلب.'
  },
  {
    question: 'هل BMD Store آمن للتسوق؟',
    answer: 'نعم، جميع معاملاتنا محمية بأعلى معايير الأمان لضمان حماية بيانات العملاء.'
  },
  {
    question: 'هل يمكنني استخدام أكثر من كوبون خصم على نفس الطلب؟',
    answer: 'حالياً، يمكن استخدام كوبون خصم واحد لكل عملية شراء.'
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section dir="rtl" className="py-20 px-6 bg-gradient-to-b from-purple-200 via-purple-100 to-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Green label */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#300C66] text-white px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4"
      >
        الأسئلة الشائعة
      </motion.span>

      {/* Bold black headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-5xl md:text-6xl font-extrabold text-[#0F0F0F] mb-4"
      >
        كل ما تحتاج معرفته
      </motion.h2>

      {/* Subtle gray subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-[#6B7280] text-lg mb-12"
      >
        كل ما تحتاج معرفته — إجابات على الأسئلة الأكثر شيوعاً حول منتجات الرقمية
        <span className="font-semibold text-[#0F0F0F]"> BMD</span>
      </motion.p>

        {/* Outer div preserves its height */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1, ease: 'easeOut' }}
              className="bg-white rounded-xl shadow-sm overflow-hidden relative"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-right px-6 py-4 flex justify-between items-center text-lg font-medium text-purple-600 hover:bg-purple-50 transition-colors duration-300"
              >
                {item.question}
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.08, ease: 'easeInOut' }}
                >
                  +
                </motion.span>
              </button>

              {/* Collapsible content using max-height */}
              <div className="overflow-hidden">
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ maxHeight: 0, opacity: 0 }}
                      animate={{ maxHeight: 200, opacity: 1 }}
                      exit={{ maxHeight: 0, opacity: 0 }}
                      transition={{ duration: 0.08, ease: 'easeInOut' }}
                      className="px-6 py-4 text-gray-700 border-t border-gray-200"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
