from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from database import engine, Base
import db_models

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Senior Assistant API", description="Backend for Senior Assistant Application")

# CORS Setup
origins = [
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Senior Assistant API"}
