from app.database import get_db
from datetime import datetime, timedelta
from typing import List, Dict

class UserService:
    @staticmethod
    def get_user_by_email(email: str):
        db = get_db()
        return db["users"].find_one({"email": email})

    @staticmethod
    def create_user(email: str, hashed_password: str, full_name: str):
        db = get_db()
        user_data = {
            "email": email,
            "hashed_password": hashed_password,
            "full_name": full_name,
            "created_at": datetime.utcnow(),
        }
        result = db["users"].insert_one(user_data)
        return result.inserted_id

class StudyService:
    @staticmethod
    def add_session(user_id: str, subject: str, topic: str, time_spent: int, notes: str = None):
        db = get_db()
        session_data = {
            "user_id": user_id,
            "subject": subject,
            "topic": topic,
            "time_spent": time_spent,
            "notes": notes,
            "created_at": datetime.utcnow(),
        }
        result = db["study_sessions"].insert_one(session_data)
        return result.inserted_id

    @staticmethod
    def get_sessions(user_id: str, days: int = 30):
        db = get_db()
        start_date = datetime.utcnow() - timedelta(days=days)
        return list(db["study_sessions"].find({
            "user_id": user_id,
            "created_at": {"$gte": start_date}
        }).sort("created_at", -1))

class QuizService:
    @staticmethod
    def save_result(user_id: str, quiz_id: str, subject: str, score: int, 
                   percentage: float, correct_count: int, total_count: int, time_taken: int):
        db = get_db()
        result_data = {
            "user_id": user_id,
            "quiz_id": quiz_id,
            "subject": subject,
            "score": score,
            "percentage": percentage,
            "correct_count": correct_count,
            "total_count": total_count,
            "time_taken": time_taken,
            "created_at": datetime.utcnow(),
        }
        result = db["test_results"].insert_one(result_data)
        return result.inserted_id

    @staticmethod
    def get_results(user_id: str, limit: int = 50):
        db = get_db()
        return list(db["test_results"].find({"user_id": user_id}).sort("created_at", -1).limit(limit))
