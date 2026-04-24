from datetime import datetime
from bson import ObjectId

class User:
    def __init__(self, email, hashed_password, full_name):
        self._id = ObjectId()
        self.email = email
        self.hashed_password = hashed_password
        self.full_name = full_name
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

class StudySession:
    def __init__(self, user_id, subject, topic, time_spent, notes=None):
        self._id = ObjectId()
        self.user_id = user_id
        self.subject = subject
        self.topic = topic
        self.time_spent = time_spent
        self.notes = notes
        self.created_at = datetime.utcnow()

class TestResult:
    def __init__(self, user_id, quiz_id, score, percentage, correct_count, total_count):
        self._id = ObjectId()
        self.user_id = user_id
        self.quiz_id = quiz_id
        self.score = score
        self.percentage = percentage
        self.correct_count = correct_count
        self.total_count = total_count
        self.created_at = datetime.utcnow()

class Quiz:
    def __init__(self, subject, questions, time_limit=30):
        self._id = ObjectId()
        self.subject = subject
        self.questions = questions
        self.time_limit = time_limit
        self.created_at = datetime.utcnow()
