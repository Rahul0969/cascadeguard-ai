// API utility for Commit 3. Not used by the dashboard yet, so the UI
// renders even when the backend is not running.
const API_BASE = "http://127.0.0.1:8000";

// Backend response shape (GET /api/topology):
// {
//   services: [{ id, name, status: "healthy" | "at-risk" | "failed" }],
//   dependencies: [{ source, target }],   // source depends on target
//   analysis: { status, root_cause: { id, name, status } | null, severity,
//               affected_services: [{ id, name }], explanation,
//               recommended_action }
// }
export async function fetchTopology() {
  const res = await fetch(`${API_BASE}/api/topology`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
