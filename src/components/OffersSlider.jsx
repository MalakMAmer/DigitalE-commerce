import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import bgHero from "../assets/bgHero.jpeg";

const API_URL = import.meta.env.VITE_API_URL;

function OffersSlider() {
  const [offers, setOffers] = useState([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  // Fetch offers (or use static if API not available)
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // Example API call if you had offers endpoint
        // const res = await axios.get(`${API_URL}/api/offers`);
        // setOffers(Array.isArray(res.data) ? res.data : []);

        // fallback static offers
        setOffers([
          { id: 1, title: "خصم 20% على كل المنتجات الرقمية", description: "اغتنم الفرصة واحصل على أفضل المنتجات بسعر مخفض.", image: bgHero },
          { id: 2, title: "اشتراك سنوي مجاني لأول 50 عميل", description: "كن من أوائل المشتركين واستمتع بالمزايا الحصرية.", image: bgHero },
          { id: 3, title: "هدايا مجانية عند شراء أي منتج", description: "احصل على منتجات رقمية إضافية مجانية عند كل عملية شراء.", image: bgHero },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOffers();
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % offers.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [offers]);

  const nextSlide = () => { setCurrent(prev => (prev + 1) % offers.length); startTimer(); };
  const prevSlide = () => { setCurrent(prev => (prev - 1 + offers.length) % offers.length); startTimer(); };

  if (!offers.length) return null;

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={offers[current].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col bg-gradient-to-r from-white to-[var(--purple-light-trans2)] rounded-md shadow-lg border border-gray-100 overflow-hidden h-full"
        >
          <img src={offers[current].image} alt={offers[current].title} className="w-full h-60 object-cover" />
          <div className="p-6 text-right">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{offers[current].title}</h3>
            <p className="text-gray-700">{offers[current].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-2 z-20 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-[var(--purple-light)] hover:text-white transition-all" style={{ direction: "ltr" }}>‹</button>
      <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-2 z-20 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-[var(--purple-light)] hover:text-white transition-all" style={{ direction: "ltr" }}>›</button>

      <div className="flex justify-center mt-4 gap-2">
        {offers.map((_, index) => (
          <button key={index} onClick={() => { setCurrent(index); startTimer(); }} className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-[var(--purple-light)]" : "bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
}

export default OffersSlider;
