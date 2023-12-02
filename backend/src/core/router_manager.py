from .fastapi import FastAPI


from ..api.v1.user.create import router as create_user_router
from ..api.v1.user.auth import router as auth_router
from ..api.v1.blog.posts import router as blog_router


def inlcude_all_routers(app: FastAPI):
    app.include_router(create_user_router, prefix="/api/v1/user")
    app.include_router(auth_router)
    app.include_router(blog_router, prefix="/api/v1/blog")
