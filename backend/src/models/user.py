from typing import Annotated

from bson import ObjectId
from .ObjectId import ObjectIdPydanticAnnotation

from pydantic import BaseModel, EmailStr, Field
from pydantic.functional_validators import AfterValidator

# def check_object_id(value: str) -> str:
#     if not _ObjectId.is_valid(value):
#         raise ValueError('Invalid ObjectId')
#     return value


# ObjectId = Annotated[str, AfterValidator(check_object_id)]


class UserBase(BaseModel):
    username: str
    email: EmailStr

class User(UserBase):
    id: Annotated[ObjectId, ObjectIdPydanticAnnotation] = Field(default_factory=ObjectId, alias="_id")
    hashed_password: str
    role: str = "user"
    is_disabled: bool = False

    class Config:
        arbitrary_types_allowed=True


class UserCreate(UserBase):
    password: str

class UserSchema(UserBase):
    role: str
    class Config:
        from_attributes = True