from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from database import engine, Base
import db_models

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Senior Assistant API", description="Backend for Senior Assistant Application")

# Health check endpoint for Cloud Run
@app.get("/healthz")
def health_check():
    return {"status": "healthy"}

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

app.include_router(router, prefix="/api")

@app.get("/healthz")
def health_check():
    return {"status": "ok"}

# Serve Static Files (SPA) for Deployment
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Mount static directory if it exists (Docker/Production)
static_dir = "static"
if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

    # Catch-all for SPA routing
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Skip API routes
        if full_path.startswith("api"):
            return {"error": "API endpoint not found"}
        
        # Try to serve specific file
        file_path = os.path.join(static_dir, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        
        # Default to index.html for SPA routes
        index_path = os.path.join(static_dir, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        
        return {"error": "Not found"}

