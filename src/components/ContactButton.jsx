import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTelegramPlane, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

function ContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-4">

      {/* Contact Options */}
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp */}
            <motion.a
              href="https://web.whatsapp.com/send?phone=9647728231332"
              target="_blank"
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="w-14 h-14 rounded-full bg-green-500 shadow-xl flex items-center justify-center text-white 
              transform transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <FaWhatsapp size={26} />
            </motion.a>

            {/* Telegram */}
            <motion.a
              href="https://telegram.me/agm_0"
              target="_blank"
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.7 }}
              transition={{ duration: 0.20 }}
              className="w-14 h-14 rounded-full bg-blue-800 shadow-xl flex items-center justify-center text-white 
              transform transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <FaTelegramPlane size={26} />
            </motion.a>

            {/* Facebook */}
            <motion.a
              href="https://www.instagram.com/bmd.iq2/#"
              target="_blank"
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.7 }}
              transition={{ duration: 0.25 }}
              className="w-14 h-14 rounded-full bg-[#c302e6] shadow-xl flex items-center justify-center text-white 
              transform transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <FaInstagram size={26} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: [
            "0 0 15px rgba(150, 0, 255, 0.8)",
            "0 0 30px rgba(150, 0, 255, 1)",
            "0 0 15px rgba(150, 0, 255, 0.8)",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full bg-[var(--purple-light)] text-white shadow-2xl flex items-center justify-center transition-all relative"
      >
        {open ? (
          <span className="text-3xl font-bold">×</span>
        ) : (
          <FaPhoneAlt className="text-2xl" />
        )}
      </motion.button>
    </div>
  );
}

export default ContactButton;
