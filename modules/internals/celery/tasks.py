from celery import Celery
from dnsenum_wrapper import run_dnsenum
from pymongo import MongoClient
from config import BROKER_URL, RESULT_BACKEND, MONGO_URI, DB_NAME

app = Celery("tasks", broker=BROKER_URL, backend=RESULT_BACKEND)
mongo = MongoClient(MONGO_URI)[DB_NAME]

@app.task
def run_dnsenum_task(domain, options):
    result = run_dnsenum(domain, options)
    result["domain"] = domain
    mongo.dnsenum.insert_one(result)
    return result
