from fastapi import APIRouter, Depends, HTTPException, status, Header
from datetime import timedelta
from app.database import get_db
from app.schemas import SignupRequest, LoginRequest, TokenResponse, UserResponse
from app.utils.security import hash_password, verify_password, create_access_token, decode_token, get_token_from_header
from typing import Optional

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/signup", response_model=TokenResponse)
async def signup(request: SignupRequest):
    """Register a new user"""
    db = get_db()
    users_collection = db["users"]
    
    # Check if user already exists
    existing_user = users_collection.find_one({"email": request.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password and create user
    hashed_password = hash_password(request.password)
    user_data = {
        "email": request.email,
        "hashed_password": hashed_password,
        "full_name": request.full_name,
        "created_at": __import__('datetime').datetime.utcnow(),
    }
    
    result = users_collection.insert_one(user_data)
    user_id = str(result.inserted_id)
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user_id, "email": request.email}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user_id
    }

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """Login user"""
    db = get_db()
    users_collection = db["users"]
    
    user = users_collection.find_one({"email": request.email})
    if not user or not verify_password(request.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    user_id = str(user["_id"])
    access_token = create_access_token(
        data={"sub": user_id, "email": request.email}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user_id
    }

@router.get("/me", response_model=UserResponse)
async def get_current_user(token: str = Depends(get_token_from_header)):
    """Get current user info"""
    db = get_db()
    users_collection = db["users"]
    
    payload = decode_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    user_id = payload.get("sub")
    from bson import ObjectId
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user
