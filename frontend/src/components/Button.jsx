import React from 'react'
import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick = () => {},
  className = '',
  ...props
}) {
  const baseClasses = 'font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-gradient-brand text-white hover:opacity-90 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={disabled ? {} : { scale: 1.02 }}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  )
}
