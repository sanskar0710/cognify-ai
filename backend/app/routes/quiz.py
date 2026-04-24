from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from datetime import datetime
from app.database import get_db
from app.utils.security import decode_token, get_token_from_header
from app.schemas import SubmitTestRequest, TestResultResponse
from app.ml_engine.recommendation import RecommendationEngine

router = APIRouter(prefix="/quiz", tags=["Quiz/Tests"])

def get_current_user_id(token: str = Depends(get_token_from_header)) -> str:
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return payload.get("sub")

# Sample quiz questions
SAMPLE_QUIZZES = {
    "DSA": {
        "subject": "DSA",
        "time_limit": 30,
        "questions": [
            {
                "id": "1",
                "question": "What is the time complexity of binary search?",
                "options": ["O(n)", "O(log n)", "O(n²)", "O(2ⁿ)"],
                "correct_answer": 1,
                "explanation": "Binary search divides the array in half each time, resulting in O(log n) complexity."
            },
            {
                "id": "2",
                "question": "Which data structure uses LIFO principle?",
                "options": ["Queue", "Stack", "Tree", "Graph"],
                "correct_answer": 1,
                "explanation": "Stack uses Last In First Out (LIFO) principle."
            },
            {
                "id": "3",
                "question": "What is the space complexity of merge sort?",
                "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                "correct_answer": 2,
                "explanation": "Merge sort requires O(n) auxiliary space for merging."
            },
            {
                "id": "4",
                "question": "Which sorting algorithm is stable?",
                "options": ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
                "correct_answer": 2,
                "explanation": "Merge Sort maintains the relative order of equal elements (stable)."
            },
            {
                "id": "5",
                "question": "What is the worst-case time complexity of quicksort?",
                "options": ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
                "correct_answer": 2,
                "explanation": "Quicksort has O(n²) worst-case when the pivot is always the smallest or largest element."
            },
        ]
    },
    "DBMS": {
        "subject": "DBMS",
        "time_limit": 30,
        "questions": [
            {
                "id": "1",
                "question": "What does ACID stand for?",
                "options": ["Atomicity, Consistency, Isolation, Durability", "Array, Cache, Index, Data", "All, Creation, Insertion, Deletion", "Authentication, Confidentiality, Integrity, Determination"],
                "correct_answer": 0,
                "explanation": "ACID are the properties that guarantee reliable database transactions."
            },
            {
                "id": "2",
                "question": "Which normal form eliminates transitive dependencies?",
                "options": ["1NF", "2NF", "3NF", "BCNF"],
                "correct_answer": 2,
                "explanation": "Third Normal Form (3NF) eliminates transitive dependencies."
            },
        ]
    },
    "OS": {
        "subject": "OS",
        "time_limit": 30,
        "questions": [
            {
                "id": "1",
                "question": "What is a deadlock?",
                "options": ["A system crash", "A state where processes wait indefinitely for resources", "A type of virus", "A memory leak"],
                "correct_answer": 1,
                "explanation": "A deadlock occurs when processes are waiting for resources held by other processes, creating a circular wait."
            },
        ]
    },
}

@router.get("/subjects")
async def get_subjects():
    """Get list of available quiz subjects"""
    return {"subjects": list(SAMPLE_QUIZZES.keys())}

@router.get("/quiz/{subject}")
async def get_quiz(subject: str, user_id: str = Depends(get_current_user_id)):
    """Get quiz for a subject"""
    if subject not in SAMPLE_QUIZZES:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    db = get_db()
    quizzes_collection = db["quizzes"]
    
    quiz_data = SAMPLE_QUIZZES[subject].copy()
    quiz_data["user_id"] = user_id
    quiz_data["created_at"] = datetime.utcnow()
    
    result = quizzes_collection.insert_one(quiz_data)
    quiz_data["_id"] = str(result.inserted_id)
    
    return quiz_data

@router.post("/submit", response_model=TestResultResponse)
async def submit_test(request: SubmitTestRequest, user_id: str = Depends(get_current_user_id)):
    """Submit test answers and get results"""
    db = get_db()
    quizzes_collection = db["quizzes"]
    results_collection = db["test_results"]
    
    quiz = quizzes_collection.find_one({"_id": ObjectId(request.quiz_id)})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    # Calculate score
    questions = quiz["questions"]
    correct_count = 0
    
    for i, answer_idx in enumerate(request.answers):
        if i < len(questions) and answer_idx == questions[i]["correct_answer"]:
            correct_count += 1
    
    total_count = len(questions)
    percentage = (correct_count / total_count * 100) if total_count > 0 else 0
    
    # Store result
    result_data = {
        "user_id": user_id,
        "quiz_id": request.quiz_id,
        "subject": quiz.get("subject"),
        "score": correct_count,
        "percentage": round(percentage, 2),
        "correct_count": correct_count,
        "total_count": total_count,
        "time_taken": request.time_taken,
        "created_at": datetime.utcnow(),
    }
    
    result = results_collection.insert_one(result_data)
    result_data["_id"] = str(result.inserted_id)
    
    return result_data

@router.get("/results")
async def get_test_results(user_id: str = Depends(get_current_user_id)):
    """Get all test results for user"""
    db = get_db()
    results_collection = db["test_results"]
    
    results = list(results_collection.find({"user_id": user_id}).sort("created_at", -1))
    return results

@router.get("/recommendations")
async def get_recommendations(user_id: str = Depends(get_current_user_id)):
    """Get AI-powered study recommendations"""
    db = get_db()
    results_collection = db["test_results"]
    sessions_collection = db["study_sessions"]
    
    test_results = list(results_collection.find({"user_id": user_id}))
    sessions = list(sessions_collection.find({"user_id": user_id}))
    
    engine = RecommendationEngine()
    recommendations = engine.generate_recommendations(test_results, sessions)
    
    return recommendations
