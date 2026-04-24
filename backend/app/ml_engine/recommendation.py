import numpy as np
from sklearn.cluster import KMeans
from typing import List, Dict, Any
from datetime import datetime, timedelta
import random

class RecommendationEngine:
    def __init__(self):
        self.motivational_messages = [
            "🚀 Keep pushing! You're on the right track!",
            "💪 Great progress! Let's build on this momentum!",
            "🎯 Focus on weak areas and watch your score improve!",
            "⭐ You're getting better every day!",
            "🔥 Amazing consistency! Don't stop now!",
        ]
        
        self.suggestions = {
            "weak": [
                "Review fundamentals in {subject}",
                "Practice more problems in {subject}",
                "Watch tutorials on {subject} concepts",
                "Join study groups for {subject}",
                "Revise {subject} daily for 30 minutes",
            ],
            "strong": [
                "Challenge yourself with advanced {subject} problems",
                "Teach {subject} to others to deepen understanding",
                "Explore real-world applications of {subject}",
                "Move on to related advanced topics",
                "Build projects using {subject} concepts",
            ]
        }
    
    def generate_recommendations(self, test_results: List[Dict[str, Any]], study_sessions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate ML-based study recommendations using Scikit-learn (Phase 2)"""
        
        subject_stats = {}
        
        # Aggregate Test Results (Accuracy)
        for result in test_results:
            subject = result.get("subject", "Unknown")
            percentage = result.get("percentage", 0)
            if subject not in subject_stats:
                subject_stats[subject] = {"scores": [], "time_spent": 0}
            subject_stats[subject]["scores"].append(percentage)
            
        # Aggregate Study Sessions (Time Spent)
        for session in study_sessions:
            subject = session.get("subject", "Unknown")
            duration = session.get("duration_minutes", 0)
            if subject not in subject_stats:
                subject_stats[subject] = {"scores": [], "time_spent": 0}
            subject_stats[subject]["time_spent"] += duration
            
        # Prepare Data for ML Model
        subjects = []
        features = []
        
        for subject, data in subject_stats.items():
            avg_score = sum(data["scores"]) / len(data["scores"]) if data["scores"] else 0
            time_spent = data["time_spent"]
            
            subjects.append(subject)
            # Normalizing features simply for clustering: score (0-100), time (assumed 0-600 mins roughly scaled)
            features.append([avg_score, min(time_spent / 10.0, 100.0)])
            
        weak_subjects = []
        strong_subjects = []
        overall_average = 0
        
        if len(subjects) >= 3:
            # Use KMeans Clustering if we have enough subjects
            X = np.array(features)
            kmeans = KMeans(n_clusters=min(3, len(subjects)), random_state=42, n_init=10)
            kmeans.fit(X)
            labels = kmeans.labels_
            
            # Identify which cluster represents "weak" (lowest avg score) and "strong" (highest avg score)
            cluster_centers = kmeans.cluster_centers_
            weak_cluster_idx = np.argmin(cluster_centers[:, 0])
            strong_cluster_idx = np.argmax(cluster_centers[:, 0])
            
            for i, label in enumerate(labels):
                if label == weak_cluster_idx:
                    weak_subjects.append(subjects[i])
                elif label == strong_cluster_idx:
                    strong_subjects.append(subjects[i])
        else:
            # Fallback for very few subjects
            for i, subj in enumerate(subjects):
                score = features[i][0]
                if score < 60:
                    weak_subjects.append(subj)
                elif score >= 80:
                    strong_subjects.append(subj)
        
        if features:
            overall_average = round(sum(f[0] for f in features) / len(features), 2)
            
        # Generate Suggestions
        suggestions = []
        for subject in weak_subjects[:2]:
            suggestion = random.choice(self.suggestions["weak"])
            suggestions.append(suggestion.format(subject=subject))
            
        for subject in strong_subjects[:1]:
            suggestion = random.choice(self.suggestions["strong"])
            suggestions.append(suggestion.format(subject=subject))
            
        if not suggestions and subjects:
            suggestions.append(f"Keep balancing your time across {', '.join(subjects[:2])}!")

        # Calculate Study Consistency (Last 7 days)
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        recent_sessions = [s for s in study_sessions if s.get("created_at", datetime.utcnow()) > seven_days_ago]
        consistency_days = len(set([s.get("created_at").date() for s in recent_sessions if s.get("created_at")]))
        
        # Select motivational message
        if consistency_days >= 5:
            motivation = "🔥 Great consistency this week! Keep it up 🔥"
        elif weak_subjects:
            motivation = f"Hey! I noticed you're struggling with {weak_subjects[0]}. Let's revise it today 🚀"
        else:
            motivation = random.choice(self.motivational_messages)
            
        return {
            "motivation_message": motivation,
            "weak_subjects": weak_subjects,
            "strong_subjects": strong_subjects,
            "suggested_topics": suggestions,
            "consistency_score": consistency_days,
            "overall_average": overall_average,
            "recommendation": f"Focus on {', '.join(weak_subjects[:2]) if weak_subjects else 'practicing'}. Your strengths are in {', '.join(strong_subjects) if strong_subjects else 'general studies'}.",
        }
