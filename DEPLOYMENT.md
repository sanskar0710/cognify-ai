# Cognify AI - Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- GitHub repository
- MongoDB Atlas account (free tier: mongodb.com/cloud/atlas)
- Vercel account (for frontend)
- Render.com or Railway.app account (for backend)

---

## 📦 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
```bash
cd frontend
npm run build
```

### Step 2: Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Step 3: Configure Environment
In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-api-domain.com
   ```

### Step 4: Deploy
```bash
vercel --prod
```

---

## 🐍 Backend Deployment (Render)

### Step 1: Push to GitHub
```bash
cd backend
git add .
git commit -m "Deploy to Render"
git push origin main
```

### Step 2: Create Render Service
1. Go to render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repository
5. Fill in details:
   - **Name**: cognify-ai-backend
   - **Runtime**: Python 3.9
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python -m uvicorn app.main:app --host 0.0.0.0 --port 8000`

### Step 3: Add Environment Variables
In Render dashboard:
```
MONGODB_URL=your_mongodb_atlas_uri
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=production
DEBUG=False
```

### Step 4: Deploy
Click "Create Web Service"

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create Account
1. Go to mongodb.com/cloud/atlas
2. Create free account
3. Create new project

### Step 2: Create Cluster
1. Click "Build a Cluster"
2. Select "M0 Free" tier
3. Choose region (preferably close to your users)
4. Click "Create Cluster"

### Step 3: Create Database
1. Click "Collections"
2. Click "Add My Own Data"
3. Create database: `cognify_ai`
4. Create collections:
   - `users`
   - `study_sessions`
   - `quizzes`
   - `test_results`

### Step 4: Get Connection String
1. Click "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` and `<database>` placeholders
5. Add to `.env` files

---

## 🔒 Environment Variables Checklist

### Frontend (.env)
```
VITE_API_URL=https://your-api-domain.com
```

### Backend (.env)
```
MONGODB_URL=mongodb+srv://user:password@cluster.mongodb.net/cognify_ai?retryWrites=true&w=majority
JWT_SECRET_KEY=your-very-secure-secret-key-min-32-chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=production
DEBUG=False
```

---

## 🔗 Configure CORS

Update `backend/app/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-domain.com",
        "https://www.your-frontend-domain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend API responds at deployed URL
- [ ] Frontend connects to backend API
- [ ] Login/Signup works
- [ ] Dashboard loads
- [ ] Quiz system works
- [ ] Study tracker saves data
- [ ] MongoDB collections have data
- [ ] No console errors in browser
- [ ] HTTPS is enabled
- [ ] Email verification works (if applicable)

---

## 📊 Monitoring & Logs

### View Backend Logs (Render)
1. Dashboard → Service → Logs
2. Real-time logs visible here

### View Frontend Logs (Vercel)
1. Dashboard → Deployments
2. Click on deployment
3. View build and deployment logs

### Monitor MongoDB
1. Atlas Dashboard
2. Performance Advisor
3. Query Profiler

---

## 🆘 Troubleshooting Deployment

### Backend won't start
- Check Python version: `python --version` (should be 3.9+)
- Verify requirements.txt is installed
- Check MONGODB_URL is valid
- View Render logs for errors

### Frontend can't connect to API
- Verify VITE_API_URL is correct
- Check CORS settings on backend
- Ensure backend is running
- Check browser console for errors

### Database connection failed
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Confirm database `cognify_ai` exists
- Ensure user credentials are correct

### 502 Bad Gateway
- Backend service might be down
- Check Render logs
- Restart the service
- Verify dependencies are installed

---

## 🔄 Continuous Deployment

### Automatic Deploy on Push

**Render**: Automatically deploys on push to main

**Vercel**: Automatically deploys on push to main

To disable:
- Go to service settings
- Disable "Auto-Deploy"

---

## 💾 Database Backup

### MongoDB Atlas Backup
1. Dashboard → Backup
2. Click "Backup Now"
3. Keep backups for recovery

### Manual Export
```bash
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/cognify_ai"
```

---

## 🎯 Performance Optimization

### Frontend
- [ ] Enable Gzip compression
- [ ] Optimize images
- [ ] Code splitting
- [ ] Lazy loading components
- [ ] CDN for static assets

### Backend
- [ ] Database indexing
- [ ] API response caching
- [ ] Pagination for large datasets
- [ ] Query optimization

---

## 📞 Support & Issues

- Check deployment logs first
- Review environment variables
- Verify MongoDB connectivity
- Test API endpoints with Postman
- Check browser console for errors

---

**Deployment complete! Your Cognify AI app is live!** 🎉
