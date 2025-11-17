import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
const API_URL = import.meta.env.VITE_API_URL;



function FAQSection() {
  const [faqData, setFaqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/faq`);
        setFaqData(res.data);
      } catch (err) {
        console.log("Error loading FAQ:", err);
      }
    };

    fetchFaq();
  }, []);


  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      dir="rtl"
      className="py-20 px-6 bg-gradient-to-b from-[var(--purple-light-trans)] via-[var(--purple-light-trans2)] to-white"
    >
      <div className="max-w-4xl mx-auto text-center">

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#300C66] text-white px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4"
        >
          الأسئلة الشائعة
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-5xl md:text-6xl font-extrabold text-[#0F0F0F] mb-4"
        >
          كل ما تحتاج معرفته
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-gray-100 text-lg mb-12"
        >
          كل ما تحتاج معرفته — إجابات على الأسئلة الأكثر شيوعاً حول منتجات الرقمية
          <span className="font-semibold text-[var(--purple-dark)]"> BMD</span>
        </motion.p>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className="bg-white rounded-xl shadow-sm overflow-hidden relative"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-right px-6 py-4 flex justify-between items-center text-lg font-medium text-[var(--purple-light)] hover:bg-purple-50 transition-colors duration-300"
              >
                {item.question}
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.08 }}
                >
                  +
                </motion.span>
              </button>

              <div className="overflow-hidden">
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ maxHeight: 0, opacity: 0 }}
                      animate={{ maxHeight: 200, opacity: 1 }}
                      exit={{ maxHeight: 0, opacity: 0 }}
                      transition={{ duration: 0.08 }}
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
