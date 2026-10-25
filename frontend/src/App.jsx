import { useCallback, useEffect, useState } from "react";
import { getTopologyAnalysis } from "./api.js";
import { events, countByStatus } from "./data.js";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import ServiceGraph from "./components/ServiceGraph.jsx";
import RootCausePanel from "./components/RootCausePanel.jsx";
import EventLog from "./components/EventLog.jsx";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getTopologyAnalysis();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not connect to the API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runAnalysis();
  }, [runAnalysis]);

  const counts = data ? countByStatus(data.services) : null;

  return (
    <div className="app">
      <Sidebar active="Service Topology" />
      <main className="main">
        <Header running={loading} onRun={runAnalysis} />
        <div className="source-note">Rule-based demo · Simulated service data · No live production monitoring</div>
        {error && (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button type="button" onClick={runAnalysis} disabled={loading}>Retry</button>
          </div>
        )}
        {data && counts ? (
          <>
            <SummaryCards counts={counts} />
            <section className="row">
              <div>
                <div className="section-heading">
                  <div><h2>Service Dependency Map</h2><p>Trace the services that may be affected by a failure.</p></div>
                  <span className="sim-tag">API connected</span>
                </div>
                <ServiceGraph services={data.services} dependencies={data.edges} />
              </div>
              <RootCausePanel analysis={data.analysis} />
            </section>
            <EventLog events={events} />
          </>
        ) : (
          <div className="loading-state" role="status">
            {loading ? "Connecting to the CascadeGuard API…" : "No analysis data available. Check the backend and retry."}
          </div>
        )}
      </main>
    </div>
  );
}
