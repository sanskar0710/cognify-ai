# Cognify AI - Your Personalized AI Study Companion

A full-stack web application that helps students track their study behavior, analyze performance, and get AI-powered personalized study recommendations.

## 🎯 Features

- **Personalized Dashboard**: Welcome screen with study statistics and AI insights
- **Study Tracker**: Log study sessions with subject, topic, and time spent
- **Quiz System**: Take quizzes on multiple subjects (DSA, DBMS, OS, etc.)
- **Performance Analytics**: Visual dashboards with charts showing progress
- **AI Recommendations**: Smart suggestions based on your performance patterns
- **Real-time Updates**: Dynamic data updates as you log sessions and take quizzes
- **Modern UI**: Beautiful, responsive design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **FastAPI** - Python web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Scikit-learn** - Recommendation engine

## 📁 Project Structure

```
cognify-ai/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context
│   │   ├── utils/           # API utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── routes/          # API routes
│   │   ├── models/          # Data models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   ├── ml_engine/       # ML recommendations
│   │   ├── utils/           # Utilities
│   │   └── main.py
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- MongoDB (local or Atlas)

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

5. **Run backend**
   ```bash
   python -m uvicorn app.main:app --reload
   ```
   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   VITE_API_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000` or `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info

### Study Tracker
- `POST /study/session` - Log a study session
- `GET /study/sessions` - Get all study sessions
- `GET /study/dashboard` - Get dashboard data

### Quiz/Tests
- `GET /quiz/subjects` - Get available subjects
- `GET /quiz/quiz/{subject}` - Get quiz for subject
- `POST /quiz/submit` - Submit quiz answers
- `GET /quiz/results` - Get all test results
- `GET /quiz/recommendations` - Get AI recommendations

## 🎨 Design System

- **Primary Color**: Indigo/Blue (`#0ea5e9`)
- **Accent Color**: Cyan (`#06b6d4`)
- **Font**: Inter, Poppins
- **Border Radius**: 12px - 20px
- **Animations**: Smooth Framer Motion transitions

## 🤖 AI Features

### Recommendation Engine
- Analyzes test scores and study patterns
- Identifies weak subjects for improvement
- Recommends personalized study topics
- Provides motivational messages
- Tracks study consistency

### Performance Metrics
- Subject-wise accuracy
- Average scores over time
- Study time distribution
- Progress trends

## 📊 Dashboard Analytics

- **Study Time Trend**: Line chart showing study hours per day
- **Subject Performance**: Bar chart comparing scores across subjects
- **Time Distribution**: Pie chart showing time spent per subject
- **AI Insights**: Personalized recommendations and suggestions

## 🔐 Authentication

- JWT-based token authentication
- Secure password hashing (bcrypt)
- Session management with HTTP-only cookies
- Protected API routes

## 📝 Available Quiz Subjects

- Data Structures & Algorithms (DSA)
- Database Management Systems (DBMS)
- Operating Systems (OS)
- Computer Networks (CN)
- Web Development

## 🌐 Deployment

### Frontend
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod`

### Backend
- **Render**: Push to GitHub, connect repository
- **Railway**: Similar to Render
- **Heroku**: `git push heroku main`

### Database
- **MongoDB Atlas**: Create free cluster at mongodb.com/cloud/atlas

## 🛡️ Environment Variables

Create `.env` file in backend with:
```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/cognify_ai
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
ENVIRONMENT=development
```

## 🤝 Contributing

Feel free to open issues or submit pull requests for improvements.

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Learning Path

1. Sign up or login
2. Log your first study session
3. Take a quiz to get personalized recommendations
4. View your dashboard with analytics
5. Follow AI suggestions to improve performance

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Made with ❤️ by Cognify AI Team**

Empowering students through intelligent learning analytics.
