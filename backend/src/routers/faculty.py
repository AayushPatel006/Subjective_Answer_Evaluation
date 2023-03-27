from fastapi import APIRouter, Depends
from utils import decode_token
from db import users, exams
from models.faculty import ExamModel, QuestionModel
from fastapi import HTTPException, status


router = APIRouter(
    prefix="/faculty",
    tags=["faculty"],
    responses={404: {"description": "Not found"}},
)


@router.post("/create_exam")
async def create_exam(data: ExamModel, auth_obj: dict = Depends(decode_token)):
    if auth_obj['role'] == "teacher":
        # Get the object of the user from the email, to use the obj_id in the created_by field
        user = users.find_one({"email": auth_obj["email"]})

        # Checking if a exam with same name already exists or not
        prev_exam = exams.find_one({"title": data.title})
        if prev_exam != None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Exam with same name already exists")

        # Checking if the end time is greater than start time
        if data.end_time <= data.start_time:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="End time should be greater than start time")

        # Get the duration of the exam in minutes
        duration = (data.end_time - data.start_time).total_seconds() / 60

        # Payload to insert into the database
        payload = {
            "title": data.title,
            "created_by": user["_id"],
            "duration": duration,
            "start_time": data.start_time,
            "end_time": data.end_time,
            "total_marks": data.total_marks,
            "status": data.status,
            "question_ref": None
        }

        try:
            res = exams.insert_one(payload)
            return {
                "msg": "Exam created successfully",
                "exam_id": str(res.inserted_id),
                "ok": True
            }
        except Exception:
            raise HTTPException(status.HTTP_400_BAD_REQUEST,
                                detail="Problem occured while creating a user")

    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")


@router.post("/add_questions")
async def add_questions(data: QuestionModel, auth_obj: dict = Depends(decode_token)):
    print(data)
    return None
