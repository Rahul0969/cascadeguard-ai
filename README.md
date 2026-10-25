# CascadeGuard AI — Commit 2

Initial backend foundation for the CascadeGuard AI hackathon prototype.

## Included
- FastAPI backend
- Simulated microservice topology with 8 services
- Dependency traversal to identify downstream services at risk
- Root-cause analysis response with severity and recovery recommendation
- Health endpoint and CORS setup for the React frontend

## Project structure
```text
cascadeguard_commit1/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── analysis.py
│   │   └── data.py
│   └── requirements.txt
├── frontend/                 # React + Vite dashboard (Commit 2)
└── README.md
```

## Run the backend (Windows / VS Code)
Open a terminal in the project folder:

```powershell
cd backend
py -m venv .venv
.venv\Scripts\activate
py -m pip install -r requirements.txt
py -m uvicorn app.main:app --reload
```

If `py` is not recognized, try `python` in its place.

API URLs:
- Health check: http://127.0.0.1:8000/health
- Topology and analysis: http://127.0.0.1:8000/api/topology
- Interactive API docs: http://127.0.0.1:8000/docs

## Test the API
Open `/docs`, select `GET /api/topology`, click **Try it out**, then **Execute**.

The demo data intentionally simulates one failed service (`payment-service`) and downstream impact. This is a prototype using transparent rule-based graph analysis, not a trained ML model or live production monitoring.

## Run the frontend (Windows / VS Code)
Open a second terminal (the backend is optional in Commit 2):

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser. Press `Ctrl + C` in the terminal to stop the server.

The dashboard currently shows static demo data (`frontend/src/data.js`). `frontend/src/api.js` is ready for live API integration.

## Next commit
Commit 3: connect the dashboard to `GET /api/topology` and test the failure analysis.
