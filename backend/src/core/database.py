from unittest import result
from .fastapi import Request
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorClient, AsyncIOMotorCollection
from .config import Settings, settings


def connect_to_mongo_client(settings: Settings) -> AsyncIOMotorDatabase:

    ssl_config = {
        "tls": True,
        "tlsCertificateKeyFile": settings.TLS_CERT_KEY
    }

    client = AsyncIOMotorClient(settings.DATABASE_URL, **ssl_config)
    return client

def close_mongo_connection(db : AsyncIOMotorClient):
    db.close()

def get_user_collection(request: Request):
    return request.app.state.user_collection

def get_blog_collection(request: Request):
    return request.app.state.blog_collection



# async def get_user_collection() -> AsyncIOMotorCollection:
#     db = get_db()
#     return db.get_collection("user")

# async def get_blog_collection(db: AsyncIOMotorDatabase = Depends(get_db)) -> AsyncIOMotorCollection:
#     return db.get_collection("blog")