

from pydantic import EmailStr

from ..core.fastapi import HTTPException, Depends
from ..models.user import User
from ..core.database import get_user_collection

from motor.motor_asyncio import AsyncIOMotorCollection


async def create_user(user: User, user_collection: AsyncIOMotorCollection) -> User:
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    await user_collection.insert_one(user.model_dump())

    return user

async def get_user_by_email(user_email: EmailStr, user_collection: AsyncIOMotorCollection) -> User:
    result = await user_collection.find_one({"email": user_email})

    return User(**result) if result else None