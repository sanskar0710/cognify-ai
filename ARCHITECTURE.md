# Cognify AI - Architecture & Design Documentation

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                     React + Tailwind + Framer                    │
└────────────────┬────────────────────────────────────────────────┘
                 │ HTTP/REST (JSON)
                 │ JWT Authentication
┌────────────────▼────────────────────────────────────────────────┐
│                      API Gateway (Proxy)                         │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│                    FastAPI Backend Server                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Routes Layer                                             │   │
│  │ ├── /auth - Authentication                             │   │
│  │ ├── /study - Study Sessions                            │   │
│  │ └── /quiz - Quizzes & Tests                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Services Layer                                           │   │
│  │ ├── UserService - User management                       │   │
│  │ ├── StudyService - Session management                  │   │
│  │ └── QuizService - Quiz management                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ML Engine Layer                                          │   │
│  │ └── RecommendationEngine - AI suggestions               │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Utils Layer                                              │   │
│  │ ├── Security - JWT, hashing                             │   │
│  │ └── Database - MongoDB connection                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────────────────────┘
                 │ TCP Connection
┌────────────────▼────────────────────────────────────────────────┐
│                    MongoDB Database                              │
│  ├── users                                                       │
│  ├── study_sessions                                              │
│  ├── quizzes                                                     │
│  └── test_results                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 Frontend Architecture

### Directory Structure
```
frontend/src/
├── components/           # Reusable UI components
│   ├── Navbar.jsx       # Top navigation
│   ├── Charts.jsx       # Data visualizations
│   ├── RecommendationCard.jsx
│   ├── StatCard.jsx
│   ├── Card.jsx
│   ├── Button.jsx
│   ├── ProtectedRoute.jsx
│   └── LoadingSkeleton.jsx
│
├── pages/               # Full page components
│   ├── Landing.jsx      # Landing page
│   ├── Login.jsx        # Login page
│   ├── Signup.jsx       # Signup page
│   ├── Dashboard.jsx    # Main dashboard
│   ├── Quiz.jsx         # Quiz taking interface
│   └── Study.jsx        # Study logging
│
├── context/            # React Context
│   └── AuthContext.jsx  # Authentication state
│
├── utils/              # Utility functions
│   ├── api.js         # API client & endpoints
│   └── helpers.js     # Helper functions
│
├── App.jsx            # Main app component with routing
├── main.jsx           # Entry point
└── index.css          # Global styles
```

### Component Hierarchy
```
App
├── AuthProvider (Context)
│   ├── Landing (Public)
│   ├── Login (Public)
│   ├── Signup (Public)
│   ├── Dashboard (Protected)
│   │   ├── Navbar
│   │   ├── StatCard (x3)
│   │   ├── Charts
│   │   │   ├── LineChart
│   │   │   ├── BarChart
│   │   │   └── PieChart
│   │   └── RecommendationCard
│   ├── Quiz (Protected)
│   │   ├── Navbar
│   │   └── QuizInterface
│   └── Study (Protected)
│       ├── Navbar
│       └── StudyForm
```

### State Management
- **AuthContext**: User authentication & token management
- **Local State**: Form inputs, loading states
- **API State**: Data fetched from backend (study sessions, quizzes)

---

## 🐍 Backend Architecture

### Directory Structure
```
backend/app/
├── routes/             # API endpoints
│   ├── auth.py        # /auth endpoints
│   ├── study.py       # /study endpoints
│   └── quiz.py        # /quiz endpoints
│
├── services/          # Business logic
│   └── __init__.py    # Service classes
│
├── models/            # Database models
│   ├── __init__.py    # Data classes
│   └── schemas.py     # Database schemas
│
├── schemas/           # Pydantic schemas
│   └── __init__.py    # Request/Response schemas
│
├── ml_engine/         # AI & recommendations
│   └── recommendation.py
│
├── utils/             # Utilities
│   └── security.py    # JWT, password hashing
│
├── config.py          # Configuration
├── database.py        # MongoDB connection
└── main.py           # FastAPI app
```

### Database Schema

#### Users Collection
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "hashed_password": "bcrypt_hash",
  "full_name": "John Doe",
  "created_at": ISODate
}
```

#### Study Sessions Collection
```json
{
  "_id": ObjectId,
  "user_id": "user_object_id",
  "subject": "DSA",
  "topic": "Binary Search",
  "time_spent": 30,  // in minutes
  "notes": "Learned about time complexity",
  "created_at": ISODate
}
```

#### Quizzes Collection
```json
{
  "_id": ObjectId,
  "subject": "DSA",
  "questions": [...],
  "time_limit": 30,  // in minutes
  "created_at": ISODate
}
```

#### Test Results Collection
```json
{
  "_id": ObjectId,
  "user_id": "user_object_id",
  "quiz_id": "quiz_object_id",
  "subject": "DSA",
  "score": 4,
  "percentage": 80,
  "correct_count": 4,
  "total_count": 5,
  "time_taken": 1200,  // in seconds
  "created_at": ISODate
}
```

---

## 🔐 Authentication Flow

```
1. User Signup
   ├── POST /auth/signup (email, password, name)
   ├── Hash password with bcrypt
   ├── Store in MongoDB
   ├── Generate JWT token
   └── Return token + user_id

2. User Login
   ├── POST /auth/login (email, password)
   ├── Find user by email
   ├── Verify password
   ├── Generate JWT token
   └── Return token + user_id

3. Protected Route Access
   ├── Client includes: Authorization: Bearer <token>
   ├── Decode JWT
   ├── Extract user_id
   ├── Verify token validity
   └── Grant access if valid

4. Token Expiration
   ├── Token expires after 30 minutes
   ├── User must login again
   └── Future: Implement refresh tokens
```

---

## 🤖 AI Recommendation Engine

### Algorithm Flow
```
Input: User's test results & study sessions

1. Analyze Test Results
   ├── Calculate subject-wise average scores
   ├── Identify weak subjects (< 60%)
   ├── Identify strong subjects (≥ 80%)
   └── Calculate overall average

2. Analyze Study Patterns
   ├── Count study sessions last 7 days
   ├── Calculate consistency score
   └── Determine study frequency

3. Generate Recommendations
   ├── For weak subjects: Suggest revision
   ├── For strong subjects: Suggest advanced topics
   ├── Suggest personalized topics
   └── Select motivational message

Output: Recommendations object with:
- recommendation: Main suggestion
- weak_subjects: Areas needing improvement
- strong_subjects: Areas of strength
- suggested_topics: Actionable next steps
- motivation_message: Personalized encouragement
- consistency_score: Days studied in last 7 days
- overall_average: Weighted average performance
```

---

## 📡 API Endpoints Reference

### Authentication
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /auth/signup | No | Register new user |
| POST | /auth/login | No | User login |
| GET | /auth/me | Yes | Get current user |

### Study Sessions
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /study/session | Yes | Log study session |
| GET | /study/sessions | Yes | Get all sessions |
| GET | /study/dashboard | Yes | Dashboard analytics |

### Quiz
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | /quiz/subjects | Yes | Available subjects |
| GET | /quiz/quiz/{subject} | Yes | Get quiz questions |
| POST | /quiz/submit | Yes | Submit answers |
| GET | /quiz/results | Yes | Test results |
| GET | /quiz/recommendations | Yes | AI suggestions |

---

## 🔄 Data Flow Example: Taking a Quiz

```
User clicks "Take Quiz"
    ↓
Quiz page loads
    ↓
API Call: GET /quiz/subjects
    ↓
Display available subjects
    ↓
User selects "DSA"
    ↓
API Call: GET /quiz/quiz/DSA
    ↓
Backend:
  1. Create quiz record in MongoDB
  2. Select 5 questions
  3. Return quiz with 30-min timer
    ↓
User answers questions
    ↓
User clicks "Submit"
    ↓
API Call: POST /quiz/submit {quiz_id, answers, time_taken}
    ↓
Backend:
  1. Verify answers
  2. Calculate score
  3. Save result in MongoDB
  4. Update user statistics
    ↓
Show results: Score, Percentage, Correct/Total
    ↓
Updated dashboard reflects new score
```

---

## 🎨 UI/UX Design System

### Color Palette
- **Primary**: Blue (#0ea5e9) - Main actions, links
- **Secondary**: Indigo (#0369a1) - Emphasis
- **Accent**: Cyan (#06b6d4) - Highlights
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Poppins (Bold, 600-700 weight)
- **Body**: Inter (Regular, 400-500 weight)
- **Mono**: Fira Code (for code snippets)

### Spacing
- Card padding: 24px (1.5rem)
- Gap between cards: 24px
- Section padding: 80px (5rem)
- Mobile padding: 16px (1rem)

### Border Radius
- Small components: 8px (0.5rem)
- Medium components: 12px (0.75rem)
- Large components: 16px (1rem)

### Shadows
```css
card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
hover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
```

---

## 🚀 Performance Optimization

### Frontend Optimizations
- Lazy loading with React.lazy()
- Code splitting by route
- Image optimization
- Memoization of expensive components
- Debounced API calls

### Backend Optimizations
- Database indexing on frequently queried fields
- Pagination for list endpoints
- Response caching for static data
- Async operations for long-running tasks

---

## 🧪 Testing Strategy

### Frontend Testing
- Component tests with Vitest
- Integration tests for user flows
- E2E tests with Cypress

### Backend Testing
- Unit tests for services
- Integration tests for APIs
- Database tests with pytest

---

## 📚 Key Dependencies

### Frontend
- **react**: UI framework
- **react-router-dom**: Routing
- **framer-motion**: Animations
- **recharts**: Charts
- **axios**: HTTP client
- **tailwindcss**: Styling

### Backend
- **fastapi**: Web framework
- **pymongo**: MongoDB driver
- **python-jose**: JWT handling
- **passlib**: Password hashing
- **scikit-learn**: ML algorithms

---

## 🔗 Integration Points

### Frontend ↔ Backend
1. API calls via Axios
2. JWT token in Authorization header
3. JSON request/response format
4. CORS enabled on backend

### Backend ↔ Database
1. PyMongo connection pooling
2. Aggregation pipelines for analytics
3. Transactions for data consistency

---

## 🛠️ Development Workflow

### Setup
```bash
# Backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd frontend && npm install
```

### Development
```bash
# Terminal 1: Backend
python -m uvicorn app.main:app --reload

# Terminal 2: Frontend
npm run dev
```

### Debugging
- Use FastAPI docs at http://localhost:8000/docs
- Browser DevTools for frontend
- MongoDB Compass for database

---

## 🎓 Learning Resources

- FastAPI docs: https://fastapi.tiangolo.com
- React docs: https://react.dev
- MongoDB docs: https://docs.mongodb.com
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion

---

**Architecture designed for scalability, maintainability, and performance.** 🚀
