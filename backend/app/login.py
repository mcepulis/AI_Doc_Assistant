from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db
import bcrypt

router = APIRouter()

@router.post("/login")
def login_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not existing_user or not bcrypt.checkpw(user.password.encode('utf-8'), existing_user.password_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return f'User {user.username} logged in successfully'