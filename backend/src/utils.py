import jwt
from apscheduler.schedulers.background import BackgroundScheduler
from bson.objectid import ObjectId
from fastapi import HTTPException, status
from passlib.context import CryptContext

from db import attempts, users,questions

password_context_instance = CryptContext(schemes=["bcrypt"], deprecated="auto")

scheduler = BackgroundScheduler()

if not scheduler.running: 
    scheduler.start()

def evaluate_attempt(attempt_id:str):
    '''
        This function will be called by the scheduler to evaluate the attempt
        Will be schedule on the end time of the exam
        While creating the exam
    '''
    try:
        print("Evaluating attempt with id: " + attempt_id)

        # Getting all the attempts for the exam
        attempt_obj = attempts.find_one({"_id": ObjectId(attempt_id)})
        question_obj = questions.find_one({"exam_ref": attempt_obj["exam_ref"]})

        question_map = dict()
        answer_map = dict()

        questions_list = question_obj["questions"]
        answers_list = attempt_obj["answers"]

        for question in questions_list:
            question_map[question["index"]] = question
        
        for answer in answers_list:
            answer_map[answer["index"]] = answer
        
        total_marks = 0
        for index in question_map:
            # Here the ml model will be integrated to evaluate the answer
            if question_map[index]["answer"] == answer_map[index]["answer"]:
                answer_map[index]["marks_obtained"] = question_map[index]["marks"]
                total_marks += question_map[index]["marks"]

        attempt_obj["answers"] = list(answer_map.values())
        attempt_obj["total_marks"] = total_marks

        attempts.update_one(
            {
                "_id": ObjectId(attempt_obj["_id"])
            },
            {
                "$set": {
                    "answers": list(answer_map.values()),
                    "total_marks": total_marks
                }
            }
        )
        
    except Exception as e:
        print(e)
    

def evaluate(exam_id:str):
    '''
        This function will be called by the scheduler to evaluate the exam
        Will be schedule on the end time of the exam
        While creating the exam
    '''
    print("Evaluating exam with id: " + exam_id)

    # Getting all the attempts for the exam
    attempts_obj = attempts.find({"exam_ref": exam_id})
    print(list(attempts_obj))
    print()
    print()
    for attempt in list(attempts_obj):
        print(attempt)
        scheduler.add_job(
                    evaluate_attempt,
                    None, 
                    args=(str(attempt["_id"]),),
                    id=str(attempt["_id"]),
                    name="Evaluating attempt with id: " + str(attempt["_id"]),
                )



    


def get_hashed_password(password: str) -> str:
    try:
        return password_context_instance.hash(password)
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Problem Occured while hashing password")


def verify_hashed_password(password: str, hashed: str) -> bool:
    try:
        res = password_context_instance.verify(password, hashed)
        return res
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Password Incorrect")


def create_token(obj: dict) -> str:
    try:
        return jwt.encode(obj, "secret", algorithm="HS256")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Problem occured while creating a token")


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, "secret", algorithms=["HS256"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Unauthorized")
    

async def get_user_obj(email:str) -> dict:
    try:
        return users.find_one({"email":email})
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="User does not exist")
