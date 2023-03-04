from fastapi import Depends, FastAPI, HTTPException, status
from fastapi import FastAPI
from utils import create_token, decode_token, get_hashed_password, verify_hashed_password
from pydantic import BaseModel
from typing import Optional
import uvicorn
from db import users
from models.user import UserModel, LoginModel

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/register")
def register(data: UserModel):
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
    if user == None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail={"msg": "User doesn't exists", "ok": True})

    # The user is exists, so verify the password. If correct then return a JWT token containing
    # 1. email
    # 2. full_name
    # 3. role
    if (verify_hashed_password(data.password, user['password'])):
        return create_token(dict({"email": user["email"], "full_name": user["full_name"], "role": user["role"]}))

    # If the password is incorrect, raise a error
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={
        "msg": "Password Incorrect",
        "ok": False
    })


@app.get("/protected")
def protected(data: dict = Depends(decode_token)):
    return data


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, log_level="info", reload=True)