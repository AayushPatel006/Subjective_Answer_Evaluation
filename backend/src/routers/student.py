from fastapi import APIRouter, Depends,HTTPException,status
from utils import decode_token
from db import registrations,users,exams
import time
from bson.objectid import ObjectId

router = APIRouter(
    prefix="/student",
    tags=["student"],
    responses={404: {"description": "Not found"}},
)

@router.post("/register")
def register(exam_id:str,user_obj:str=Depends(decode_token)):
    # Fetching the user id from the email
    user = users.find_one({"email":user_obj["email"]})

    if user == None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="User does not exist")
    

    # Checking if the exam with provided id exists
    exam = exams.find_one({"_id":ObjectId(exam_id)})

    # If exam does not exist, then raise a error
    if exam == None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Exam does not exist")
    
    # Checking if the user has already registered for the exam
    existing_registration = registrations.find_one({"student_id":user["_id"],"exam_id":exam["_id"]})

    # If the user has already registered for the exam, then raise a error
    if existing_registration != None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="User has already registered for the exam")
    
    # Payload to insert into the database
    payload = {
        "student_id":user["_id"],
        "exam_id":exam["_id"],
        "attempts_id":None,
        "registration_date":time.time(),
    }

    try:
        registrations.insert_one(payload)
        return {
            "ok":True,
            "msg":"Registered to exam successfully",
        }
    except Exception:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,detail="Problem occured while registering the student")
    
    
