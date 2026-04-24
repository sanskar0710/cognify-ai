import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  signup: (email, password, fullName) =>
    api.post('/auth/signup', { email, password, full_name: fullName }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getCurrentUser: () =>
    api.get('/auth/me'),
}

export const studyAPI = {
  addSession: (subject, topic, timeSpent, notes) =>
    api.post('/study/session', { subject, topic, time_spent: timeSpent, notes }),
  getSessions: () =>
    api.get('/study/sessions'),
  getDashboardData: () =>
    api.get('/study/dashboard'),
}

export const quizAPI = {
  getSubjects: () =>
    api.get('/quiz/subjects'),
  getQuiz: (subject) =>
    api.get(`/quiz/quiz/${subject}`),
  submitTest: (quizId, answers, timeTaken) =>
    api.post('/quiz/submit', { quiz_id: quizId, answers, time_taken: timeTaken }),
  getResults: () =>
    api.get('/quiz/results'),
  getRecommendations: () =>
    api.get('/quiz/recommendations'),
}

export default api
