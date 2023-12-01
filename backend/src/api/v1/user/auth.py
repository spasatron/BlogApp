from datetime import datetime, timedelta


from ....core.fastapi import APIRouter, OAuth2PasswordBearer, Depends, Request, HTTPException 
from ....core.fastapi import OAuth2PasswordRequestForm
from ....core.config import settings
from ....services.user import get_user_by_email
from ....services.authentication import verify_password, create_access_token, get_current_active_user
from ....models.user import User


router = APIRouter()
oauth2 = OAuth2PasswordBearer(tokenUrl="token")



@router.post("/token")
async def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    user = await get_user_by_email(form_data.username, request.app.state.user_collection)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect Username or Password")

    access_token_expires = timedelta(minutes=settings.access_token_expires_minutes)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/protected-test")
async def get_protected_data(current_active_user: User = Depends(get_current_active_user)):
    return {"This route is protected": "The Meaning of life is 42", "User is": current_active_user.email}