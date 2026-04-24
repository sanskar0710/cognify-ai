import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { studyAPI } from '../utils/api'
import Navbar from '../components/Navbar'
import { LogOut, Plus, Check } from 'lucide-react'

export default function Study() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    timeSpent: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const subjects = ['DSA', 'DBMS', 'OS', 'Networks', 'Web Development', 'Other']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await studyAPI.addSession(
        formData.subject,
        formData.topic,
        parseInt(formData.timeSpent),
        formData.notes
      )
      setSuccess(true)
      setFormData({ subject: '', topic: '', timeSpent: '', notes: '' })

      setTimeout(() => {
        setSuccess(false)
        navigate('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Error adding study session:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogout={logout} userName="Study" />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl card-shadow p-8">
            <h1 className="text-3xl font-bold mb-2">Log Study Session</h1>
            <p className="text-gray-600 mb-8">Track your study progress and improve over time</p>

            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3"
              >
                <Check className="text-green-600" size={24} />
                <p className="text-green-700 font-semibold">Session logged successfully! Redirecting...</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Topic *
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., Binary Search, Sorting Algorithms"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time Spent (minutes) *
                </label>
                <input
                  type="number"
                  name="timeSpent"
                  value={formData.timeSpent}
                  onChange={handleChange}
                  placeholder="30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="What did you learn? Any challenges?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-brand text-white py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Logging session...
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Log Session
                  </>
                )}
              </motion.button>
            </form>

            {/* Quick Tips */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-blue-900 mb-2">💡 Pro Tip:</p>
              <p className="text-sm text-blue-800">
                Regular study sessions help the AI provide better recommendations. Try to study consistently!
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
