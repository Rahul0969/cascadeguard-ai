"""FastAPI endpoints for the CascadeGuard AI demo."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .analysis import analyze_topology

app = FastAPI(
    title="CascadeGuard AI API",
    description="Explainable, rule-based analysis of a simulated microservice failure.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"name": "CascadeGuard AI API", "message": "Backend is running. Visit /docs for API documentation."}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/topology")
def get_topology():
    """Return the topology and computed impact analysis used by the dashboard."""
    result = analyze_topology()
    return {
        "services": result["services"],
        "edges": result["dependencies"],
        "analysis": result["analysis"],
    }
