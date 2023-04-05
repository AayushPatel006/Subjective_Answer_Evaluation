import datetime
import json

from bson.objectid import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from db import exams, questions, users
# from main import scheduler
from models.faculty import ExamModel, QuestionModel
from utils import decode_token

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
        duration = (data.end_time - data.start_time) / 60_000

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
            # utc_date = datetime.datetime.utcfromtimestamp(data.end_time / 1000)
            # job_id = scheduler.add_job(func, 
            #                            'date', 
            #                            run_date=utc_date, 
            #                            name=f'Exam {data.title} with id {str(res.inserted_id)} = {datetime.datetime.fromtimestamp(data.end_time/1000).strftime("%d / %m / %Y - %H-%M-%S")} ',
            #                            args=(str(res.inserted_id)))
            
            return {
                "msg": "Exam created successfully",
                "exam_id": str(res.inserted_id),
                # "job_id":job_id.id,
                "ok": True
            }
        except Exception:
            raise HTTPException(status.HTTP_400_BAD_REQUEST,
                                detail="Problem occured while creating a exam")

    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")


@router.post("/add_questions/{index}")
async def add_questions(index: int, data: QuestionModel, auth_obj: dict = Depends(decode_token)):
    user = users.find_one({"email": auth_obj["email"]})
    exam_obj = exams.find_one({"_id": ObjectId(data.exam_ref)})
    if auth_obj['role'] == "teacher" and exam_obj != None and  user["_id"] == exam_obj["created_by"]:
        # Getting the exam object
        if exam_obj == None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Exam does not exists")

        if exam_obj["question_ref"] is None:
            # Creating questions object
            payload = {
                "exam_ref": data.exam_ref,
                "questions": [{
                    "index": index,
                    "question": data.question,
                    "model_answer": data.model_answer,
                    "max_marks": data.max_marks
                }]
            }

            try:
                res = questions.insert_one(payload)
                exams.update_one({
                    "_id": ObjectId(data.exam_ref)
                },
                    {
                    "$set": {
                        "question_ref": res.inserted_id
                    }
                })
                return {
                    "msg": "Questions added successfully with index: " + str(index),
                    "question_id": str(res.inserted_id),
                    "ok": True
                }
            except Exception:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED, detail="Question addition unsuccessfull")
        else:
            questions_obj = questions.find_one(
                {"_id": ObjectId(exam_obj["question_ref"])})
            questions_arr = questions_obj["questions"]
            payload = {
                "index": index,
                "question": data.question,
                "model_answer": data.model_answer,
                "max_marks": data.max_marks
            }
            questions_arr.append(payload)
            try:
                questions_obj["questions"] = questions_arr
                questions.update_one(
                    {
                        "_id": ObjectId(questions_obj["_id"])
                    },
                    {
                        "$set": {
                            "questions": questions_arr
                        }
                    }
                )
                return {
                    "msg": "Questions added successfully with index: " + str(index),
                    "question_id": str(questions_obj["_id"]),
                    "ok": True
                }
            except Exception:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED, detail="Question addition unsuccessfull")

    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Questions can only be added by the teacher who created the exam")

@router.get("/exams")
async def get_exams(auth_obj: dict = Depends(decode_token)):
    try:
        user = users.find_one({"email": auth_obj["email"]})
        exam_obj = list(exams.find({"created_by": user["_id"]}, { "created_by": 0 }))
        return json.loads(json.dumps(exam_obj, default=str))
    except Exception as e:
        print(e)
        print("Excepiton occured")