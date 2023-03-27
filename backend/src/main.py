from fastapi import Depends, FastAPI, HTTPException, status
from fastapi import FastAPI
from utils import create_token, decode_token, get_hashed_password, verify_hashed_password
import uvicorn
from db import users, exams
from models.user import UserModel, LoginModel
from models.exam import ExamModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/faculty/create_exam")
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


@app.post("/register")
def register(data: UserModel):

    print(data)

    # Checking if a user with the same email already exists
    existing_user = users.find_one({"email": data.email})

    # If a user already exist, then raise a error
    if existing_user != None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    # Payload to insert into the database
    payload = {
        "full_name": data.full_name,
        "email": data.email,
        "password": get_hashed_password(data.password),
        "role": data.role
    }

    try:
        users.insert_one(payload)
    except Exception:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail="Problem occured while creating a user")

    return {
        "msg": "User register successfully",
        "ok": True
    }


@app.post("/login")
def login(data: LoginModel):
    try:
        # Checking if a user with the same email already exists
        user = users.find_one({"email": data.email})

        # If user not found, then raise a error
        if user == None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="User doesn't exists")

        # The user is exists, so verify the password. If correct then return a JWT token containing
        # 1. email
        # 2. full_name
        # 3. role
        if (verify_hashed_password(data.password, user['password'])):
            return {
                "token": create_token(dict({"email": user["email"], "full_name": user["full_name"], "role": user["role"]}))
            }

        # If the password is incorrect, raise a error
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Password Incorrect")
    except Exception as e:
        print(e)
        print("Exception occured: " + str(e))
        raise HTTPException(
            status_code=status.HTTP__INTERNA500L_SERVER_ERROR, detail="Internal Server Error")


@app.get("/protected")
def protected(data: dict = Depends(decode_token)):
    return data


@app.get("/verify")
def verify(token: str):
    return decode_token(token=token)


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, log_level="info", reload=True)
