from fastapi import APIRouter, Depends,HTTPException,status
from utils import decode_token
from db import registrations,users,exams,questions
import time
from bson.objectid import ObjectId
from utils import get_user_obj
import json

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

@router.get("/get_questions/{exam_id}")
async def get_questions(exam_id:str,user_obj:str=Depends(decode_token)):
    # Fetching the user id from the email
    user = await get_user_obj(user_obj["email"])

 
    # Checking if the exam with provided id exists
    exam = exams.find_one({"_id":ObjectId(exam_id)})

    # If exam does not exist, then raise a error
    if exam == None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Exam does not exist")
    
    # Checking if the user has already registered for the exam
    existing_registration = registrations.find_one({"student_id":user["_id"],"exam_id":exam["_id"]})

    # If the user has already registered for the exam, then raise a error
    if existing_registration == None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="User has not registered for the exam")
    
    # Checking if the user has already attempted the exam
    if existing_registration["attempts_id"] != None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="User has already attempted the exam")
    
    # Checking if the exam has started
    if exam["start_time"]/1000 > time.time():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Exam has not started yet")
    
    # Checking if the exam has ended
    if exam["end_time"]/1000 <= time.time():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Exam has ended")
    
    
        
    # Fetching the questions from the exam
    all_questions =  questions.find_one({"_id":exam["question_ref"]},{"questions.model_answer":0,"_id":0})
    

    return {
        "ok":True,
        "questions":all_questions["questions"],
        "exam_ref":exam_id
    }

async def get_attempted_exams(user_id:str):
    '''
        Will return all the exams that the student has attempted
    '''
    attempted_exams = registrations.find({"student_id":user_id,"attempts_id":{"$ne":None}})

    return attempted_exams  

async def get_upcoming_exams(user_id:str):
    '''
        Will return all the exams that the student has registered for
        But the exams has not started yet
    '''

    not_attempted_exams = registrations.find({"student_id":user_id,"attempts_id":None})

    exam_ids = [exam["exam_id"] for exam in not_attempted_exams]

    upcoming_exams = exams.find({"_id":{"$in":exam_ids},"start_time":{"$gt":time.time()}})

    return list(not_attempted_exams),list(upcoming_exams)

async def get_not_attempted_exams(not_attempted_exams):
    '''
        Will return all the exams that the student has not attempted
    '''
    exam_ids = [exam["exam_id"] for exam in not_attempted_exams]

    not_attempted_exams = exams.find({"_id":{"$in":exam_ids},"end_time":{"$lt":time.time()}})

    return list(not_attempted_exams)

async def get_ongoing_exams(user_id:str):
    '''
        Will return all the exams that the student has registered for
        and the exams is ongoing
    '''

    registered_exams = list(registrations.find({"student_id":user_id}))

    exam_ids = [exam["exam_id"] for exam in registered_exams]

    ongoing_exams = exams.find({"_id":{"$in":exam_ids},"start_time":{"$lt":time.time()},"end_time":{"$gt":time.time()}})

    return list(ongoing_exams)

@router.get("/dashboard")
async def dashboard(user_obj:str=Depends(decode_token)):
    '''
        Will return all the required data for the student dashboard
        Required data:
            1. List of exams registered and which are not started (viz. upcoming exams)
            2. List of exams that are ongoing (viz. ongoing exams)
            3. List of exams attempted and if evaluated the result (viz. Previous exams section)
            4. List of exams not attempted (Exams that the student did not attempt)
    '''

    # Fetching the user id from the email
    user = await get_user_obj(user_obj["email"])

    try:
        # Fetching all the exams that the student has registered for
        not_attempted_exams,upcoming_exams = await get_upcoming_exams(user["_id"])

        # Fetching all the exams that the student has attempted
        attempted_exams = await get_attempted_exams(user["_id"])

        # Fetching all the ongoing exams that student has registered for
        ongoing_exams = await get_ongoing_exams(user["_id"])

        # Fetching all the exams that the student has not attempted
        not_attempted_exams = await get_not_attempted_exams(not_attempted_exams)

        
        print(list(upcoming_exams))
        print(list(ongoing_exams))
        print(list(attempted_exams))
        print(list(not_attempted_exams))

        print()
        payload = json.dumps({
            "ok":True,
            "upcoming_exams":list(upcoming_exams),
            "ongoing_exams":list(ongoing_exams),
            "attempted_exams":list(attempted_exams),
            "not_attempted_exams":list(not_attempted_exams),
        },default=str)
        
        return json.loads(payload)
    except Exception as e:
        print(e)
        raise HTTPException(status.HTTP_400_BAD_REQUEST,detail="Problem occured while fetching data for dashboard")
