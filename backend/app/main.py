
"""FastAPI endpoints for the CascadeGuard AI demo."""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .analysis import analyze_topology


app = FastAPI(
    title="CascadeGuard AI API",
    description="Explainable, rule-based analysis of a simulated microservice failure.",
    version="1.0.0",
)


# Local development frontend URLs
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Deployed Vercel frontend URL, configured in Render
frontend_url = os.getenv("FRONTEND_URL", "").strip().rstrip("/")

if frontend_url:
    allowed_origins.append(frontend_url)


# Configure Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Return basic API information."""
    return {
        "name": "CascadeGuard AI API",
        "message": "Backend is running. Visit /docs for API documentation.",
    }


@app.get("/health")
def health_check():
    """Check whether the backend is running."""
    return {"status": "ok"}


@app.get("/api/topology")
def get_topology():
    """Return the topology and computed impact analysis."""
    result = analyze_topology()

    return {
        "services": result["services"],
        "edges": result["dependencies"],
        "analysis": result["analysis"],
    }
    
