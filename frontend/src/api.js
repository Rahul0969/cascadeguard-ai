const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function request(path) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new Error("Cannot reach the backend. Start FastAPI on http://127.0.0.1:8000 and retry.");
  }
  if (!response.ok) {
    throw new Error(`Backend request failed (${response.status}). Check the API and retry.`);
  }
  return response.json();
}

export const checkHealth = () => request("/health");
export const getTopologyAnalysis = () => request("/api/topology");
