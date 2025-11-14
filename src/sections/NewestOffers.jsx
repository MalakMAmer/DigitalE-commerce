import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgHero from "../assets/bgHero.jpeg";

const offers = [
  {
    id: 1,
    title: "خصم 20% على كل المنتجات الرقمية",
    description: "اغتنم الفرصة واحصل على أفضل المنتجات بسعر مخفض.",
    image: bgHero,
  },
  {
    id: 2,
    title: "اشتراك سنوي مجاني لأول 50 عميل",
    description: "كن من أوائل المشتركين واستمتع بالمزايا الحصرية.",
    image: bgHero,
  },
  {
    id: 3,
    title: "هدايا مجانية عند شراء أي منتج",
    description: "احصل على منتجات رقمية إضافية مجانية عند كل عملية شراء.",
    image: bgHero,
  },
];

function NewestOffers() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % offers.length);
    startTimer(); // reset timer on click
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + offers.length) % offers.length);
    startTimer(); // reset timer on click
  };

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-full mx-auto relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-3">
          أحدث العروض
        </h2>
        <p className="text-gray-600 text-center mb-12">
          اكتشف أفضل العروض الرقمية المتاحة لدينا الآن
        </p>

        <div className="relative w-full overflow-hidden px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={offers[current].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mx-auto max-w-6xl"
            >
              <img
                src={offers[current].image}
                alt={offers[current].title}
                className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
              />
              <div className="p-6 md:p-12 text-right md:text-left flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {offers[current].title}
                </h3>
                <p className="text-gray-700 text-lg">{offers[current].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-purple-700 hover:text-white flex items-center justify-center transition-all"
            aria-label="Previous"
            style={{ direction: "ltr" }}
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-purple-700 hover:text-white flex items-center justify-center transition-all"
            aria-label="Next"
            style={{ direction: "ltr" }}
          >
            ›
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-3">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                startTimer(); // reset timer on dot click
              }}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === current ? "bg-purple-700 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewestOffers;
