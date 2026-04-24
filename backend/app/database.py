from pymongo import MongoClient
from app.config import settings

class MongoDB:
    client: MongoClient = None
    db = None

db = MongoDB()

def connect_db():
    db.client = MongoClient(settings.MONGODB_URL)
    db.db = db.client[settings.DATABASE_NAME]
    print("[OK] Connected to MongoDB")

def close_db():
    if db.client:
        db.client.close()
        print("[OK] Disconnected from MongoDB")

def get_db():
    return db.db
