from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ExamModel(BaseModel):
    title: str
    start_time: int
    end_time: int
    total_marks: int = 0
    # Status can contain this options: creating, scheduled, ongoing, completed
    status: Optional[str] = "scheduled"


class QuestionModel(BaseModel):
    exam_ref: str
    question: str
    model_answer: str
    max_marks: int
