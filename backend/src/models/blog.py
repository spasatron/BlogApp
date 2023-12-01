from typing import Annotated
from .bson import ObjectId
from bson import ObjectId as ObjectIdFactory
from datetime import datetime
from pydantic import BaseModel, Field, field_serializer
from pydantic_mongo import ObjectIdField

from .draftjs import RawDraftContentState


class PostBase(BaseModel):
    title: str
    content: RawDraftContentState


class Post(PostBase):
    id: ObjectId = Field(default_factory=ObjectIdFactory, alias="_id")
    author: str
    user_email: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    class Config:
        arbitrary_types_allowed=True


class PostCreate(PostBase):
    pass


class PostSchema(PostBase):

    id: ObjectId
    author: str
    created_at: datetime

    class Config:
        from_attribute = True
        arbitrary_types_allowed=True


    