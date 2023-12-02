from pydantic_settings import BaseSettings


#TODO Update Stuff Here

class EnvironmentSettings(BaseSettings):
    ENVIRONMENT: str = "DEVELOPMENT" # Can be DEVELOPMENT or PRODUCTION

env_config = EnvironmentSettings()

class Settings(BaseSettings):
    app_name: str = "BlogApp"
    algorithm: str = "HS256"
    access_token_expires_minutes: int = 15
    SECRET_KEY: str
    DATABASE_URL: str
    TLS_CERT_KEY: str
    class Config:
        env_file = "development.env" if env_config.ENVIRONMENT == "DEVELOPMENT" else "production.env"
        env_file_encoding = 'utf-8'

settings = Settings()