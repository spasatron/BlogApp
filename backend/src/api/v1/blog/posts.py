from motor.motor_asyncio import AsyncIOMotorCollection
from typing import List, Optional

from ....core.fastapi import APIRouter, Depends

from ....models.user import User
from ....models.blog import Post, PostCreate, PostSchema
from ....services.user import create_user
from ....services.authentication import get_current_active_user
from ....services.blog import create_post_from_user, get_recent_posts
from ....core.database import get_blog_collection




router = APIRouter()

@router.post("/create-post", response_model=PostSchema)
async def create_post_endpoint(
        post_in: PostCreate,
        user: User = Depends(get_current_active_user),
        blog_collection: AsyncIOMotorCollection = Depends(get_blog_collection)
    ):

    post = Post(**post_in.model_dump(), user_email=user.email, author=user.username)

    return await create_post_from_user(post, blog_collection)



@router.get("/get-recent-posts", response_model=List[PostSchema])
async def create_user_endpoint(
        blog_collection: AsyncIOMotorCollection = Depends(get_blog_collection),
        limit: Optional[int] = 5
    ):
    return await get_recent_posts(blog_collection, limit)

