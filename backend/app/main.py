from fastapi import FastAPI
from . import models
from .database import engine
from .register import router as register_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(register_router)



