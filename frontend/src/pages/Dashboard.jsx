import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LogOut, Book, Trophy, TrendingUp, Plus, Download, Flame } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useAuth } from '../context/AuthContext'
import { studyAPI, quizAPI } from '../utils/api'
import Navbar from '../components/Navbar'
import Charts from '../components/Charts'
import RecommendationCard from '../components/RecommendationCard'

export default function Dashboard() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const fetchData = async () => {
      try {
        const [dashData, recsData] = await Promise.all([
          studyAPI.getDashboardData(),
          quizAPI.getRecommendations(),
        ])
        setDashboardData(dashData.data)
        setRecommendations(recsData.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const userName = dashboardData?.user_name || 'Student'
  const stats = [
    { label: 'Total Study Hours', value: dashboardData?.total_study_hours || 0, icon: Book },
    { label: 'Topics Completed', value: dashboardData?.topics_completed || 0, icon: TrendingUp },
    { label: 'Average Score', value: `${dashboardData?.average_score || 0}%`, icon: Trophy },
    { label: 'Daily Streak', value: `${dashboardData?.daily_streak || 0} days`, icon: Flame, color: 'text-orange-500' },
  ]

  const handleExportPDF = async () => {
    const element = document.getElementById('dashboard-content');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Cognify_Performance_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar onLogout={logout} userName={userName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="dashboard-content">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Welcome back, {userName}! 👋</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {recommendations?.motivation_message || 'Keep up the great work!'}
            </p>
          </div>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition card-shadow font-medium"
          >
            <Download size={18} />
            Export Report
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const iconColor = stat.color || 'text-blue-600'
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl card-shadow border border-transparent dark:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <Icon className={`${iconColor}`} size={32} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/study')}
            className="bg-gradient-brand text-white p-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <Plus size={20} />
            Log Study Session
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/quiz')}
            className="bg-indigo-600 text-white p-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <Trophy size={20} />
            Take a Quiz
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              document.getElementById('analytics-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-cyan-600 text-white p-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <TrendingUp size={20} />
            View Analytics
          </motion.button>
        </div>

        {/* Charts */}
        <motion.div
          id="analytics-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your Progress</h2>
          <div className="dark:bg-slate-800 rounded-xl dark:p-4 dark:border dark:border-slate-700">
             <Charts data={dashboardData} />
          </div>
        </motion.div>

        {/* Recommendations */}
        {recommendations && <RecommendationCard recommendations={recommendations} />}
      </main>
    </div>
  )
}
