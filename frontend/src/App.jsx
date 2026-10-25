import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import ServiceGraph from "./components/ServiceGraph.jsx";
import RootCausePanel from "./components/RootCausePanel.jsx";
import EventLog from "./components/EventLog.jsx";
import { services, dependencies, analysis, events, countByStatus } from "./data.js";

export default function App() {
  const [running, setRunning] = useState(false);

  
  function handleRun() {
    if (running) return;
    setRunning(true);
    setTimeout(() => setRunning(false), 1200);
  }

  return (
    <div className="app">
      <Sidebar active="Service Topology" />
      <main className="main">
        <Header running={running} onRun={handleRun} />
        <SummaryCards counts={countByStatus(services)} />
        <section className="row">
          <ServiceGraph services={services} dependencies={dependencies} />
          <RootCausePanel analysis={analysis} />
        </section>
        <EventLog events={events} />
      </main>
    </div>
  );
}
