import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { quizAPI } from '../utils/api'
import Navbar from '../components/Navbar'
import { LogOut } from 'lucide-react'

export default function Quiz() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    fetchSubjects()
  }, [token, navigate])

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted) return

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, submitted])

  const fetchSubjects = async () => {
    try {
      const response = await quizAPI.getSubjects()
      setSubjects(response.data.subjects)
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  const startQuiz = async (subject) => {
    setLoading(true)
    try {
      const response = await quizAPI.getQuiz(subject)
      setQuiz(response.data)
      setSelectedSubject(subject)
      setAnswers(new Array(response.data.questions.length).fill(null))
      setCurrentQuestion(0)
      setTimeLeft(response.data.time_limit * 60)
    } catch (error) {
      console.error('Error starting quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectAnswer = (optionIndex) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitQuiz = async () => {
    setLoading(true)
    try {
      const response = await quizAPI.submitTest(
        quiz._id,
        answers,
        (quiz.time_limit * 60 - timeLeft)
      )
      setResult(response.data)
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!token) return null

  // Subject Selection
  if (!selectedSubject) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onLogout={logout} userName="Quiz" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Select a Subject</h1>
          <p className="text-gray-600 mb-8">Choose a subject to test your knowledge</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <motion.button
                key={subject}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startQuiz(subject)}
                disabled={loading}
                className="bg-white p-8 rounded-xl card-shadow text-lg font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                {subject}
              </motion.button>
            ))}
          </div>
        </main>
      </div>
    )
  }

  // Results Screen
  if (submitted && result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onLogout={logout} userName="Quiz" />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl card-shadow text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Quiz Complete! 🎉</h1>

            <div className="grid grid-cols-3 gap-6 my-8">
              <div>
                <p className="text-gray-600 mb-2">Score</p>
                <p className="text-4xl font-bold text-blue-600">
                  {result.score}/{result.total_count}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Percentage</p>
                <p className="text-4xl font-bold text-blue-600">{result.percentage}%</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Accuracy</p>
                <p className="text-4xl font-bold text-blue-600">
                  {Math.round((result.correct_count / result.total_count) * 100)}%
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-gradient-brand text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Back to Dashboard
            </button>
          </motion.div>
        </main>
      </div>
    )
  }

  // Quiz Taking
  if (quiz) {
    const question = quiz.questions[currentQuestion]
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onLogout={logout} userName="Quiz" />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
              <p className={`text-sm font-semibold ${timeLeft < 60 ? 'text-red-600' : 'text-gray-600'}`}>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-brand h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-xl card-shadow mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition ${
                    answers[currentQuestion] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center ${
                        answers[currentQuestion] === index
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {answers[currentQuestion] === index && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Previous
            </button>

            <div className="flex gap-4">
              {currentQuestion === quiz.questions.length - 1 ? (
                <button
                  onClick={submitQuiz}
                  disabled={loading}
                  className="px-8 py-2 bg-gradient-brand text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Quiz'}
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-gradient-brand text-white rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="mt-8 p-4 bg-white rounded-lg">
            <p className="text-sm font-semibold mb-4">Questions</p>
            <div className="grid grid-cols-10 gap-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-full h-10 rounded font-semibold transition ${
                    index === currentQuestion
                      ? 'bg-gradient-brand text-white'
                      : answers[index] !== null
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}
