"""FastAPI entry point for CascadeGuard AI."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .analysis import analyze_topology

app = FastAPI(
    title="CascadeGuard AI API",
    description="Prototype API for simulated service-failure impact analysis.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "name": "CascadeGuard AI API",
        "message": "Backend is running. Visit /docs to explore the API.",
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/topology")
def get_topology():
    """Return simulated service topology and failure analysis."""
    return analyze_topology()
