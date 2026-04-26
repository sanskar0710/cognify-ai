from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import connect_db, close_db
from app.routes import auth, study, quiz

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    connect_db()
    print("[OK] Cognify AI Backend Started")
    yield
    # Shutdown
    close_db()

app = FastAPI(
    title="Cognify AI",
    description="Your Personalized AI Study Companion API",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:5173",
        "https://cognify-ai-ruddy.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth.router)
app.include_router(study.router)
app.include_router(quiz.router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Cognify AI API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
