# Cognify AI - Quick Start Guide

## 🎯 Getting Started

### Prerequisites
- Node.js v16+
- Python 3.9+
- MongoDB (free tier at mongodb.com/cloud/atlas)

### Windows Setup

1. **Run the setup script**
   ```bash
   .\setup.bat
   ```

2. **Configure MongoDB**
   - Edit `backend\.env`
   - Add your MongoDB connection string
   ```
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/cognify_ai
   ```

3. **Start Backend**
   ```bash
   cd backend
   venv\Scripts\activate.bat
   python -m uvicorn app.main:app --reload
   ```

4. **Start Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

### Mac/Linux Setup

1. **Run the setup script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Configure MongoDB**
   - Edit `backend/.env`
   - Add your MongoDB connection string

3. **Start Backend**
   ```bash
   cd backend
   source venv/bin/activate
   python -m uvicorn app.main:app --reload
   ```

4. **Start Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

## 📚 Usage Guide

### 1. Create Account
- Click "Get Started" on landing page
- Enter email, name, and password
- Confirm signup

### 2. Log Study Sessions
- Go to "Log Study Session"
- Select subject and topic
- Enter time spent (in minutes)
- Add optional notes
- Submit

### 3. Take a Quiz
- Click "Take a Quiz"
- Select a subject
- Answer quiz questions
- Submit to see results

### 4. View Dashboard
- See your study statistics
- Check performance charts
- Get AI recommendations
- View study history

## 🔌 API Documentation

### Base URL
```
http://localhost:8000
```

### Authentication
All requests (except signup/login) need:
```
Authorization: Bearer <access_token>
```

### Example: Get Dashboard Data
```bash
curl -H "Authorization: Bearer your_token" \
  http://localhost:8000/study/dashboard
```

## 📊 Available Quiz Subjects

1. **DSA** - Data Structures & Algorithms
2. **DBMS** - Database Management Systems
3. **OS** - Operating Systems

*More subjects can be added in `backend/app/routes/quiz.py`*

## 🧪 Test Accounts

For testing purposes, you can create accounts with:
- Email: `test@example.com`
- Password: `password123`
- Name: `Test User`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify connection string in `.env`
- Check if MongoDB Atlas cluster is running
- Ensure IP address is whitelisted in Atlas

### CORS Error
- Backend should be running on port 8000
- Frontend should be running on port 3000 or 5173
- Check CORS configuration in `backend/app/main.py`

### Port Already in Use
- Backend: Kill process on port 8000
  ```bash
  # Mac/Linux
  lsof -ti:8000 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :8000
  taskkill /PID <PID> /F
  ```
- Frontend: Kill process on port 3000/5173

## 📦 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
# Development
python -m uvicorn app.main:app --reload

# Production
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 🚀 Deployment

### Deploy Frontend to Vercel
```bash
npm i -g vercel
cd frontend
vercel
```

### Deploy Backend to Render
1. Push code to GitHub
2. Connect repository at render.com
3. Set environment variables
4. Deploy

## 🎨 Customization

### Change Primary Color
Edit `frontend/tailwind.config.js`:
```js
colors: {
  primary: {
    500: '#your-color',
  }
}
```

### Add New Subjects
Edit `backend/app/routes/quiz.py`:
```python
SAMPLE_QUIZZES = {
    "Your Subject": {
        "questions": [...],
        ...
    }
}
```

## 📞 Need Help?

- Check the main README.md for more info
- Review API endpoints in `backend/app/routes/`
- Check frontend components in `frontend/src/components/`

## ✨ Features to Add

- [ ] Dark mode
- [ ] Notifications
- [ ] Performance reports (PDF)
- [ ] Study groups
- [ ] Progress sharing
- [ ] Mobile app
- [ ] Advanced analytics

---

**Happy studying with Cognify AI!** 🚀
