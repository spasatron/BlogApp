from motor.motor_asyncio import AsyncIOMotorCollection

from ....core.fastapi import APIRouter, Depends

from ....models.user import UserCreate, UserSchema, User
from ....services.user import create_user
from ....services.authentication import get_password_hash
from ....core.database import get_user_collection



router = APIRouter()

@router.post("/create-user", response_model=UserSchema)
async def create_user_endpoint(user_in: UserCreate, user_collection: AsyncIOMotorCollection = Depends(get_user_collection)):

    user = User(**user_in.model_dump(), hashed_password=get_password_hash(user_in.password))

    created_user = await create_user(user, user_collection)
    return created_user

