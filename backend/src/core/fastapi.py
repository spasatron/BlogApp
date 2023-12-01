from fastapi import FastAPI as FastAPIDefault, Request as RequestDefault, APIRouter as APIRouterDefault
from fastapi import *
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorCollection



class CustomAppState(BaseModel):
    mongodb_client: AsyncIOMotorClient
    db: AsyncIOMotorDatabase
    user_collection: AsyncIOMotorCollection
    blog_collection: AsyncIOMotorCollection
    class Config:
        arbitrary_types_allowed = True


class FastAPI(FastAPIDefault):
    """Custom FastAPI class with MongoDB integration."""

    def __init__(self, **kwargs):

        # Call the constructor of the parent class (FastAPIDefault)
        super().__init__(**kwargs)
        # MongoDB client instance
        self.state: CustomAppState
    

class Request(RequestDefault):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.app.state: CustomAppState

    @property
    def app(self) -> FastAPI:
        return self.scope["app"]



class APIRouter(APIRouterDefault):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)



