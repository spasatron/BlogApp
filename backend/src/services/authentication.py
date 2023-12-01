from typing import Annotated
from passlib.context import CryptContext
from passlib.hash import bcrypt
from jose import JWTError, jwt
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorCollection
from ..core.config import settings
from ..core.fastapi import Depends, OAuth2PasswordBearer, HTTPException, status
from .user import get_user_by_email
from ..models.user import User
from ..core.database import get_user_collection

crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password",
    headers={"WWW-Authenticate": "Bearer"}
)

def verify_password(plain_password, hashed_password):
    return crypt_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return crypt_context.hash(password)

def create_access_token(data:dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta if expires_delta else datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.algorithm)
    return encoded_jwt


async def get_current_user(
        token: str = Depends(oauth2_scheme), 
        user_collection: AsyncIOMotorCollection = Depends(get_user_collection)
    ):

    try:
        payload = jwt.decode(token, settings.SECRET_KEY)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = await get_user_by_email(username, user_collection)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    """ Method to validate User with Token"""
    if current_user.is_disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User Not Active")
    return current_user








