import React from 'react'
import sales from '../assets/sales.jpg'
import { motion, AnimatePresence } from "framer-motion";

function SalesHeader() {
  return (
    <div>
        <div className='pt-12 pb-20 p-4'>
            <AnimatePresence mode="wait">
                <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                className="w-full flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mx-auto max-w-6xl"
                >
                <img
                    src={sales}
                    alt="sales"
                    className="w-full h-64 md:h-80 object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                />
                </motion.div>
            </AnimatePresence>
        </div>
    </div>
  )
}

export default SalesHeader