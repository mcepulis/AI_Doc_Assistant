from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db
import bcrypt
from datetime import timedelta
from .auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

@router.post("/login")
def login_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not existing_user or not bcrypt.checkpw(user.password.encode('utf-8'), existing_user.password_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
    data={
        "sub": str(existing_user.id),
        "username": existing_user.username

    },
    expires_delta=access_token_expires
)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60  
    }