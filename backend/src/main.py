import datetime
from datetime import timedelta

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from db import exams, users
from models.user import LoginModel, UserModel
from routers import faculty, student
from utils import (create_token, decode_token, get_hashed_password, scheduler,
                   verify_hashed_password, evaluate)

app = FastAPI()
# scheduler = BackgroundScheduler()

# if not scheduler.running: 
#     scheduler.start()


origins = [
    "http://localhost:5173"
]

app.include_router(faculty.router)
app.include_router(student.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def func():
    users.insert_one({"name": "New temp user 1"})


@app.get("/")
def read_root():
    # utc_date = datetime.datetime.fromtimestamp(1680875400000 / 1000)
            # job_id = scheduler.add_job(func, 
            #                            'date', 
            #                            run_date=utc_date, 
            #                            name=f'Exam {data.title} with id {str(res.inserted_id)} = {datetime.datetime.fromtimestamp(data.end_time/1000).strftime("%d / %m / %Y - %H-%M-%S")} ',
            #                            args=(str(res.inserted_id)))
    # job = scheduler.add_job(evaluate, "date", run_date=utc_date, 
    #                         name="Exam custom with id 6430194a86287a56949e340e",
    #                         args=("6430194a86287a56949e340e",))
    # d = datetime.datetime.now(tz=datetime.timezone.utc) + timedelta(seconds=1)
    # 642c68f72bfcfe3bf5ddb9c4

    # a = scheduler.add_job(func, 'date', run_date=d,name="Inserting temp user")
    # a = scheduler.add_job(evaluate, "date", run_date=d, name="Evaluating exam", args=("642c684e2bfcfe3bf5ddb9c1",))
    # return {"Hello": job.id, "next_run_time": str(job.trigger)}
    return {"Hello": "World"}


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
    # Checking if a user with the same email already exists
    user = users.find_one({"email": data.email})

    # If user not found, then raise a error
    print(data)
    print(user)
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


@app.get("/protected")
def protected(data: dict = Depends(decode_token)):
    return data


@app.get("/verify")
def verify(token: str):
    return decode_token(token=token)


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, log_level="info", reload=True)
