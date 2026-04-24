# 🎯 NEXT STEPS - Start Using Cognify AI

## 1️⃣ Quick Start (5 minutes)

### Windows Users
```bash
cd "c:\Users\sansk\Desktop\Cognify AI"
.\setup.bat
```

### Mac/Linux Users
```bash
cd ~/Desktop/Cognify\ AI
chmod +x setup.sh
./setup.sh
```

## 2️⃣ Configure MongoDB

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up (free tier available)

2. **Create Database**
   - Create new cluster
   - Choose free tier (M0)
   - Select region close to you
   - Click "Create Cluster"

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` and username

4. **Update .env File**
   ```
   # backend/.env
   MONGODB_URL=mongodb+srv://your-username:your-password@cluster.mongodb.net/cognify_ai?retryWrites=true&w=majority
   ```

## 3️⃣ Start the Application

### Terminal 1 - Backend (MacOS/Linux)
```bash
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload
```

### Terminal 1 - Backend (Windows)
```bash
cd backend
venv\Scripts\activate.bat
python -m uvicorn app.main:app --reload
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

## 4️⃣ Access the Application

- **Frontend**: http://localhost:5173 or http://localhost:3000
- **API Docs**: http://localhost:8000/docs
- **Backend Health**: http://localhost:8000/health

## 5️⃣ Test the Application

### Create Test Account
1. Click "Get Started" on landing page
2. Sign up:
   - Email: `test@example.com`
   - Name: `Test User`
   - Password: `password123`

### Test Features
1. **Dashboard** - View welcome & stats
2. **Log Session** - Add a study session
3. **Take Quiz** - Try DSA quiz
4. **Check Dashboard** - See updated metrics

## 📂 Project Files

All files are organized in: `c:\Users\sansk\Desktop\Cognify AI\`

**Key Locations:**
- Frontend code: `frontend/src/`
- Backend code: `backend/app/`
- Database config: `backend/.env`
- Frontend config: `frontend/.env`

## 📚 Documentation

Read these in order:
1. **README.md** - Overview
2. **QUICKSTART.md** - Getting started
3. **FEATURES.md** - What's included
4. **ARCHITECTURE.md** - How it works

## 🚀 Deployment

When ready to go live:

### Frontend → Vercel
```bash
cd frontend
npm install -g vercel
vercel
```

### Backend → Render
1. Push to GitHub
2. Connect at render.com
3. Set environment variables
4. Deploy!

See **DEPLOYMENT.md** for detailed steps

## ⚠️ Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8000 (Mac/Linux)
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Windows: Use Task Manager to kill node/python processes
```

### MongoDB Connection Error
- [ ] Check .env file has MONGODB_URL
- [ ] Verify password is correct
- [ ] Check IP whitelist in MongoDB Atlas
- [ ] Ensure cluster is running

### CORS Error
- Backend should be on port 8000
- Frontend should be on port 5173 or 3000
- Check CORS config in `backend/app/main.py`

## 💡 Development Tips

### Hot Reload
- Frontend changes reload automatically ✅
- Backend changes reload automatically ✅
- No manual restart needed!

### API Testing
- Go to http://localhost:8000/docs
- Test endpoints with Swagger UI
- See request/response format

### Database Viewing
- Use MongoDB Compass (free GUI)
- Or use MongoDB Atlas web UI
- View collections and data

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```js
colors: {
  primary: {
    500: '#your-color',
  }
}
```

### Add Quiz Topics
Edit `backend/app/routes/quiz.py`:
```python
SAMPLE_QUIZZES = {
    "Your Subject": { ... }
}
```

### Change Logo
Replace in `frontend/src/components/Navbar.jsx`

## 📱 Mobile Testing

### Test on Phone
```bash
# Find your computer's IP
# Then visit: http://YOUR_IP:5173
```

### Chrome DevTools
- Press F12 or Cmd+Option+I
- Click device toggle (top-left)
- Select device type to test

## 🔄 Git Setup

```bash
# Initialize git (one time)
cd Cognify\ AI
git init

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/cognify-ai.git
git push -u origin main
```

## 📞 Support Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev
- **MongoDB Guide**: https://docs.mongodb.com/
- **Tailwind CSS**: https://tailwindcss.com/

## ✅ Verification Checklist

Before considering it "done":

- [ ] Backend running without errors
- [ ] Frontend loads in browser
- [ ] Can signup & login
- [ ] Can log study session
- [ ] Can take a quiz
- [ ] Dashboard shows data
- [ ] Recommendations display
- [ ] No console errors
- [ ] Database has entries

## 🎉 You're Ready!

Your full-stack AI study companion app is ready to use!

### Next Steps:
1. ✅ Follow setup above
2. ✅ Test all features
3. ✅ Customize styling
4. ✅ Add more quiz questions
5. ✅ Deploy to production

---

**Need help?** Check the documentation files or see TROUBLESHOOTING section above.

**Questions?** Review the code files - they're well commented!

**Ready to deploy?** Follow DEPLOYMENT.md

---

**Welcome to Cognify AI! Let's build something amazing! 🚀**
