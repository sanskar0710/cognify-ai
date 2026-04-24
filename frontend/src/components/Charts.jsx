import React from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Charts({ data = {} }) {
  // Sample data
  const lineData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 2.5 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 2 },
  ]

  const barData = [
    { subject: 'DSA', score: 85 },
    { subject: 'DBMS', score: 78 },
    { subject: 'OS', score: 92 },
    { subject: 'CN', score: 75 },
  ]

  const pieData = [
    { name: 'DSA', value: 35 },
    { name: 'DBMS', value: 25 },
    { name: 'OS', value: 25 },
    { name: 'Others', value: 15 },
  ]

  const colors = ['#0ea5e9', '#0369a1', '#06b6d4', '#0891b2']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl card-shadow"
      >
        <h3 className="text-lg font-semibold mb-4">Study Time Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hours" stroke="#0ea5e9" strokeWidth={2} name="Hours" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-6 rounded-xl card-shadow"
      >
        <h3 className="text-lg font-semibold mb-4">Subject-wise Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#0ea5e9" name="Score %" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-xl card-shadow"
      >
        <h3 className="text-lg font-semibold mb-4">Time Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
