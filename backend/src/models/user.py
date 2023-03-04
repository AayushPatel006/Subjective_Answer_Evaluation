from pydantic import BaseModel
from typing import Optional


class UserModel(BaseModel):
    email: str
    password: str
    full_name: str
    role: Optional[str] = "student"


class LoginModel(BaseModel):
    email: str
    password: str
