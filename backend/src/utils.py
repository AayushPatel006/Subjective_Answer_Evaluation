from passlib.context import CryptContext
from fastapi import HTTPException, status
import jwt

password_context_instance = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_hashed_password(password: str) -> str:
    try:
        return password_context_instance.hash(password)
    except Exception as e:
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
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Unauthorized")
