# CascadeGuard AI — Submission Checklist

## Project completeness

- [ ] The React + Vite dashboard opens at `http://localhost:5173`.
- [ ] FastAPI starts at `http://127.0.0.1:8000`.
- [ ] `/health` returns a successful status.
- [ ] `/api/topology` returns services, dependency edges, and analysis.
- [ ] Run Analysis calls the backend and updates the displayed response.
- [ ] Summary cards, graph, and root-cause panel use the API response.
- [ ] Loading, backend failure, and retry states are visible and usable.
- [ ] Python unit tests pass locally.
- [ ] Frontend production build succeeds locally.

## Before submitting

- [ ] Add screenshots captured from the running application (do not use mock screenshots).
- [ ] Confirm the README's setup instructions on the submission machine.
- [ ] Confirm no `.env`, API key, `.venv`, `node_modules`, or build output is committed.
- [ ] Push the latest code to the intended GitHub repository.
- [ ] Add the correct GitHub repository URL to the submission form.
- [ ] Verify the repository visibility meets the event's requirements.
- [ ] State clearly that this is a simulated, rule-based prototype, not live monitoring or a trained ML system.

## Demo flow (about 60–90 seconds)

1. Introduce CascadeGuard AI as a failure-impact visualization prototype.
2. Show the eight services and their dependency arrows.
3. Point out the simulated Payment Service failure.
4. Run the analysis and explain the at-risk Order Service, Notification Service, and API Gateway.
5. Read the recommended recovery action.
6. Explain that BFS traverses the dependency graph and that the data is simulated.

## Evidence status

Screenshots and event-specific submission links must be added by the project owner after running the app. Do not claim a local test or build passed until it has actually been executed on the target machine.
