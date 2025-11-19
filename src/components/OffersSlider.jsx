import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import bgHero from "../assets/bgHero.jpeg";

const API_URL = import.meta.env.VITE_API_URL;

function OffersSlider() {
  const [offers, setOffers] = useState([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setOffers([
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
    ]);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [offers]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % offers.length);
    startTimer();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + offers.length) % offers.length);
    startTimer();
  };

  if (!offers.length) return null;

  return (
    <div className="w-full flex justify-center items-start">
  <div className="
      w-full 
      sm:max-w-2xl 
      flex items-center justify-between 
      gap-2 sm:gap-4
      px-0
    ">

    {/* Prev Button */}
    <button
      onClick={prevSlide}
      className="w-12 h-12 flex justify-center items-center
      bg-white shadow-lg rounded-full text-[var(--purple-light-trans)]
      hover:bg-[var(--purple-light-trans)] hover:text-white transition hidden sm:flex"
    >
      ‹
    </button>

    {/* Slider */}
    <div className="relative overflow-hidden flex-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={offers[current].id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white/80 backdrop-blur-md 
          shadow-lg border border-purple-300/40 overflow-hidden"
        >
          <img
            src={offers[current].image}
            alt={offers[current].title}
            className="w-full h-56 sm:h-72 object-cover"
          />

          <div className="p-4 sm:p-6 text-right">
            <h3 className="text-xl sm:text-3xl font-bold text-gray-900">
              {offers[current].title}
            </h3>

            <p className="text-gray-700 mt-2 leading-relaxed text-sm sm:text-lg">
              {offers[current].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center mt-4 sm:mt-5 gap-2 sm:gap-3">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              startTimer();
            }}
            className={`
              rounded-full transition-all
              ${index === current
                ? "w-3 h-3 sm:w-4 sm:h-4 bg-purple-600 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                : "w-2 h-2 sm:w-3 sm:h-3 bg-gray-300"
              }
            `}
          />
        ))}
      </div>
    </div>

    {/* Next button (hidden on phones) */}
    <button
      onClick={nextSlide}
      className="w-12 h-12 flex justify-center items-center
      bg-white shadow-lg rounded-full text-[var(--purple-light-trans)]
      hover:bg-[var(--purple-light-trans)] hover:text-white transition hidden sm:flex"
    >
      ›
    </button>
  </div>
</div>
    
  );
}

export default OffersSlider;
