from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from datetime import datetime
from app.database import get_db
from app.utils.security import decode_token, get_token_from_header
from app.schemas import StudySessionRequest, StudySessionResponse

router = APIRouter(prefix="/study", tags=["Study Tracker"])

def get_current_user_id(token: str = Depends(get_token_from_header)) -> str:
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return payload.get("sub")

@router.post("/session", response_model=StudySessionResponse)
async def add_study_session(request: StudySessionRequest, user_id: str = Depends(get_current_user_id)):
    """Log a study session"""
    db = get_db()
    sessions_collection = db["study_sessions"]
    
    session_data = {
        "user_id": user_id,
        "subject": request.subject,
        "topic": request.topic,
        "time_spent": request.time_spent,
        "notes": request.notes,
        "created_at": datetime.utcnow(),
    }
    
    result = sessions_collection.insert_one(session_data)
    session_data["_id"] = result.inserted_id
    return session_data

@router.get("/sessions")
async def get_study_sessions(user_id: str = Depends(get_current_user_id)):
    """Get all study sessions for user"""
    db = get_db()
    sessions_collection = db["study_sessions"]
    
    sessions = list(sessions_collection.find({"user_id": user_id}).sort("created_at", -1))
    return sessions

@router.get("/dashboard")
async def get_dashboard_data(user_id: str = Depends(get_current_user_id)):
    """Get dashboard analytics"""
    db = get_db()
    sessions_collection = db["study_sessions"]
    tests_collection = db["test_results"]
    users_collection = db["users"]
    
    # Get user info
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    
    # Calculate totals
    sessions = list(sessions_collection.find({"user_id": user_id}))
    total_study_hours = sum([s.get("time_spent", 0) for s in sessions]) / 60
    
    # Subject-wise data
    subject_stats = {}
    for session in sessions:
        subject = session.get("subject", "Other")
        if subject not in subject_stats:
            subject_stats[subject] = {"sessions": 0, "time": 0}
        subject_stats[subject]["sessions"] += 1
        subject_stats[subject]["time"] += session.get("time_spent", 0)
    
    # Test statistics
    test_results = list(tests_collection.find({"user_id": user_id}))
    avg_score = sum([t.get("percentage", 0) for t in test_results]) / len(test_results) if test_results else 0
    
    # Calculate Daily Streak
    daily_streak = 0
    if sessions:
        session_dates = sorted(list(set(s.get("created_at").date() for s in sessions if s.get("created_at"))), reverse=True)
        if session_dates:
            today = datetime.utcnow().date()
            current_date = session_dates[0]
            if (today - current_date).days <= 1:
                daily_streak = 1
                for i in range(1, len(session_dates)):
                    if (session_dates[i-1] - session_dates[i]).days == 1:
                        daily_streak += 1
                    else:
                        break
    
    return {
        "user_name": user.get("full_name", "User") if user else "User",
        "total_study_hours": round(total_study_hours, 2),
        "topics_completed": len(set([s.get("topic") for s in sessions])),
        "average_score": round(avg_score, 2),
        "subject_stats": subject_stats,
        "recent_sessions": sessions[:5],
        "test_results": test_results[:5],
        "daily_streak": daily_streak,
    }
