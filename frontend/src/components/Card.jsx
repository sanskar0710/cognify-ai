import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={`bg-white rounded-xl card-shadow ${className}`}
    >
      {children}
    </motion.div>
  )
}
