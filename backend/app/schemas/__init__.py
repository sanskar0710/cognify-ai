from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# Auth Schemas
class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str = Field(..., min_length=2)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: str

class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    full_name: str
    created_at: datetime

    class Config:
        populate_by_name = True

# Study Session Schema
class StudySessionRequest(BaseModel):
    subject: str
    topic: str
    time_spent: int  # in minutes
    notes: Optional[str] = None

class StudySessionResponse(BaseModel):
    id: str = Field(alias="_id")
    user_id: str
    subject: str
    topic: str
    time_spent: int
    notes: Optional[str]
    created_at: datetime

    class Config:
        populate_by_name = True

# Quiz/Test Schema
class QuizQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    correct_answer: int
    explanation: str

class QuizResponse(BaseModel):
    id: str = Field(alias="_id")
    user_id: str
    subject: str
    questions: List[QuizQuestion]
    time_limit: int  # in minutes
    created_at: datetime

    class Config:
        populate_by_name = True

class SubmitTestRequest(BaseModel):
    quiz_id: str
    answers: List[int]  # indices of selected options
    time_taken: int  # in seconds

class TestResultResponse(BaseModel):
    id: str = Field(alias="_id")
    user_id: str
    quiz_id: str
    score: float
    percentage: float
    correct_count: int
    total_count: int
    created_at: datetime

    class Config:
        populate_by_name = True

# Recommendation Schema
class RecommendationResponse(BaseModel):
    recommendation: str
    weak_subjects: List[str]
    strong_subjects: List[str]
    suggested_topics: List[str]
    motivation_message: str

# Dashboard Data Schema
class DashboardDataResponse(BaseModel):
    user_name: str
    total_study_hours: float
    topics_completed: int
    average_score: float
    subject_stats: dict
    recent_sessions: list
    test_results: list
