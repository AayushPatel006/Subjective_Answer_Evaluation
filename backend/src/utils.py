import jwt
import numpy as np
from apscheduler.schedulers.background import BackgroundScheduler
from bson.objectid import ObjectId
from fastapi import HTTPException, status
from passlib.context import CryptContext
from sentence_transformers import SentenceTransformer, util
from summarizer import Summarizer, TransformerSummarizer

from db import attempts, exams, questions, users

password_context_instance = CryptContext(schemes=["bcrypt"], deprecated="auto")

scheduler = BackgroundScheduler()
attempt_scheduler = BackgroundScheduler()
bert_model = Summarizer()
model = SentenceTransformer('multi-qa-mpnet-base-dot-v1')

if not scheduler.running:
    scheduler.start()
    attempt_scheduler.start()


def evaluate_attempt(attempt_id: str):
    '''
        This function will be called by the scheduler to evaluate the attempt
        Will be schedule on the end time of the exam
        While creating the exam
    '''
    try:
        print("Evaluating attempt with id: " + attempt_id)

        # Getting all the attempts for the exam
        attempt_obj = attempts.find_one({"_id": ObjectId(attempt_id)})
        question_obj = questions.find_one(
            {"exam_ref": attempt_obj["exam_ref"]})
        print(attempt_obj)
        print()
        print(question_obj)
        question_map = dict()
        answer_map = dict()

        questions_list = question_obj["questions"]
        answers_list = attempt_obj["answers"]

        for question in questions_list:
            question_map[question["index"]] = question

        for answer in answers_list:
            answer_map[answer["index"]] = answer

        print("Question map", question_map)
        print("Answer map", answer_map)
        total_marks = 0
        for index in question_map:

            # Here the ml model will be integrated to evaluate the answer
            summary1 = ''.join(bert_model(
                question_map[index]["model_answer"], min_length=100))
            summary2 = ''.join(bert_model(
                answer_map[index]["answer"], min_length=100))

            # encode sentences to get their embeddings
            # embedding1 = model.encode(summary1, convert_to_tensor=True)
            # embedding2 = model.encode(summary2, convert_to_tensor=True)

            embedding1 = model.encode(
                question_map[index]["model_answer"], convert_to_tensor=True)
            embedding2 = model.encode(
                answer_map[index]["answer"], convert_to_tensor=True)

            # compute similarity scores of two embeddings
            cosine_scores = util.pytorch_cos_sim(embedding1, embedding2)

            # cosine_scores = util.pytorch_cos_sim(
            #     question_map[index]["model_answer"], answer_map[index]["answer"])
            print(cosine_scores.item())
            probablity = cosine_scores.item()
            if (probablity <= 0.5):
                probablity = 0
            elif (probablity <= 0.625):
                probablity = 0.25
            elif (probablity <= 0.75):
                probablity = 0.5
            elif (probablity <= 0.875):
                probablity = 0.75
            else:
                probablity = 1
            score = probablity * question_map[index]["max_marks"]
            total_marks += score
            answer_map[index]["marks_obtained"] = score

        print()
        print(answer_map.values())
        print()
        print(total_marks)
        print()
        attempt_obj["answers"] = list(answer_map.values())
        attempt_obj["total_marks"] = total_marks
        print("asd")
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
        print("Error occured", e)


def evaluate(exam_id: str):
    '''
        This function will be called by the scheduler to evaluate the exam
        Will be schedule on the end time of the exam
        While creating the exam
    '''
    print("Evaluating exam with id: " + exam_id)

    # Getting all the attempts for the exam
    attempts_obj = list(attempts.find({"exam_ref": exam_id}))

    for i in attempts_obj:
        print(i)
        attempt_scheduler.add_job(
            evaluate_attempt,
            None,
            args=(str(i["_id"]),),
            id=str(i["_id"]),
            name="Evaluating attempt with id: " + str(i["_id"]),
        )

    exam_obj = exams.find_one({"_id": ObjectId(exam_id)})
    exam_obj["status"] = "completed"
    exams.update_one(
        {
            "_id": ObjectId(exam_id)
        },
        {
            "$set": {
                "status": "completed"
            }
        }
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


async def get_user_obj(email: str) -> dict:
    try:
        return users.find_one({"email": email})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User does not exist")
