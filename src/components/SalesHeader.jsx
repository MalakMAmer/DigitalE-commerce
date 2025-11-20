import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const API_URL = import.meta.env.VITE_API_URL;

function SalesHeader() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch sales header images
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/sales`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setImages(data[0].images); // take the first sales header
        }
      })
      .catch((err) => console.error("Error fetching sales header:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="w-full flex justify-center py-20">
        <Lottie animationData={loadingAnimation} loop autoplay style={{ width: 150, height: 150 }} />
      </div>
    );

  if (images.length === 0) return null; // nothing to show

  return (
    <div className="pt-12 pb-20 p-1">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mx-auto max-w-6xl"
        >
          <img
            src={isMobile ? images[1] : images[0]} // desktop = images[0], mobile = images[1]
            alt="sales"
            className="w-full h-40 md:h-80 object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SalesHeader;
