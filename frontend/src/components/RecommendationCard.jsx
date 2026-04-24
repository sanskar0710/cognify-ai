import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, Star } from 'lucide-react'

export default function RecommendationCard({ recommendations }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-blue-200 dark:border-slate-700 p-8 rounded-2xl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <Zap className="text-yellow-500 flex-shrink-0 mt-1" size={28} />
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">🤖 Cognify Says</h2>
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
              {recommendations.motivation_message}
            </p>
          </div>
        </div>

        {/* Main Recommendation */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg mb-6 border-l-4 border-blue-600 dark:border-blue-500">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{recommendations.recommendation}</p>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weak Subjects */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg dark:border dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Target className="text-red-500" size={20} />
              <h3 className="font-semibold text-red-600 dark:text-red-400">Areas to Improve</h3>
            </div>
            {recommendations.weak_subjects.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.weak_subjects.map((subject, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                    • {subject}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">No weak areas detected! 🎉</p>
            )}
          </div>

          {/* Strong Subjects */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg dark:border dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Your Strengths</h3>
            </div>
            {recommendations.strong_subjects.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.strong_subjects.map((subject, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                    ✓ {subject}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">Keep practicing to find strengths!</p>
            )}
          </div>

          {/* Suggested Topics */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg dark:border dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="text-blue-600 dark:text-blue-400" size={20} />
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">What to Focus On</h3>
            </div>
            {recommendations.suggested_topics.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.suggested_topics.map((topic, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                    💡 {topic}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">Keep adding study sessions!</p>
            )}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 pt-4 border-t border-blue-200 dark:border-slate-700 flex justify-between text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Consistency Score</p>
            <p className="font-bold text-blue-600 dark:text-blue-400">{recommendations.consistency_score}/7 days</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Overall Average</p>
            <p className="font-bold text-blue-600 dark:text-blue-400">{recommendations.overall_average}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
