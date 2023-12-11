from src.core.fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorClient
import uvicorn

from src.core.config import settings
from src.core.router_manager import inlcude_all_routers
from src.core.database import connect_to_mongo_client, close_mongo_connection


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load Mongo Client
    app.state.mongodb_client = connect_to_mongo_client(settings)
    app.state.db = app.state.mongodb_client["BlogApp"]
    app.state.user_collection = app.state.db["user"]
    app.state.blog_collection = app.state.db["blog"]
    yield
    # Clean up Connection
    close_mongo_connection(app.state.mongodb_client)


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


inlcude_all_routers(app)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
