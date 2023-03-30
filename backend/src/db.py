from pymongo import MongoClient
from dotenv import load_dotenv
import os
load_dotenv()


print("Env " + os.getenv("MONGO_URI"))
client = MongoClient(os.getenv("MONGO_URI"))
db = client["mini_project"]
users = db["users"]
exams = db["exams"]
questions = db["questions"]
registrations = db["registrations"]
attempts = db["attempts"]

# print(users)
