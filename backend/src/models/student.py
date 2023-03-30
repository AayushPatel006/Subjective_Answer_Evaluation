from pydantic import BaseModel
from typing import Optional

class AttemptModel(BaseModel):
    index:int
    answer:str