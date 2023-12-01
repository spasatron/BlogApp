from typing import List
from ..models.blog import Post
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo import ASCENDING, DESCENDING

async def create_post_from_user(post: Post, blog_collection: AsyncIOMotorCollection):
    await blog_collection.insert_one(post.model_dump())
    return post


async def get_recent_posts(blog_collection: AsyncIOMotorCollection, max_posts: int = 5) -> List[Post]:

    cursor = blog_collection.find().sort({"created_at": DESCENDING}).limit(max_posts)
    results = await cursor.to_list(length=max_posts)
    recent_posts : List[Post] = []
    for post in results:
        recent_posts.append(Post(**post))
    return recent_posts