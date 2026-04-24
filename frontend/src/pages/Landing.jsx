import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart3, Brain, Zap, TrendingUp } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized study recommendations based on your performance',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track your progress with detailed charts and performance metrics',
    },
    {
      icon: Zap,
      title: 'Smart Quizzes',
      description: 'Test your knowledge with adaptive quizzes across multiple subjects',
    },
    {
      icon: TrendingUp,
      title: 'Performance Tracking',
      description: 'Monitor your improvement over time with real-time dashboards',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="font-bold text-xl gradient-text">Cognify AI</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-gray-700 font-medium hover:text-gray-900 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-gradient-brand text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-4 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
          >
            Your Personalized AI Study Companion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 mb-8"
          >
            Track your study progress, get AI-powered recommendations, and improve your
            performance with intelligent analytics and adaptive learning insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-gradient-brand text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
              Learn More
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Why Choose Cognify AI?
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl card-shadow"
                >
                  <Icon className="text-blue-600 mb-4" size={32} />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your studies?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students using Cognify AI to achieve their academic goals.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-gradient-brand text-white rounded-lg font-semibold hover:opacity-90 transition text-lg"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">© 2024 Cognify AI. All rights reserved.</p>
          <p className="text-gray-400">Your Personalized AI Study Companion</p>
        </div>
      </footer>
    </div>
  )
}
