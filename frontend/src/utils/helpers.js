import clsx from 'clsx'

export const cn = (...classes) => clsx(...classes)

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m ${secs}s`
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const calculateStreak = (sessions) => {
  if (!sessions || sessions.length === 0) return 0

  let streak = 0
  const today = new Date().toDateString()
  let currentDate = new Date(today)

  const sessionDates = sessions.map((s) => new Date(s.created_at).toDateString())

  while (sessionDates.includes(currentDate.toDateString())) {
    streak++
    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}

export const getPerformanceColor = (percentage) => {
  if (percentage >= 80) return 'text-green-600'
  if (percentage >= 60) return 'text-yellow-600'
  if (percentage >= 40) return 'text-orange-600'
  return 'text-red-600'
}

export const getPerformanceBgColor = (percentage) => {
  if (percentage >= 80) return 'bg-green-50'
  if (percentage >= 60) return 'bg-yellow-50'
  if (percentage >= 40) return 'bg-orange-50'
  return 'bg-red-50'
}
