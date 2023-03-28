from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ExamModel(BaseModel):
    title: str
    start_time: datetime
    end_time: datetime
    total_marks: int = 0
    # Status can contain this options: creating, scheduled, ongoing, completed
    status: Optional[str] = "creating"


class QuestionModel(BaseModel):
    exam_ref: str
    questions: list