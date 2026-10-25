export default function Header({ running, onRun }) {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">CASCADEGUARD / OBSERVABILITY</p>
        <h1>Failure Intelligence</h1>
        <p className="subtitle">Understand failures. Trace their impact.</p>
      </div>
      <div className="header-actions">
        <div className="env-badge"><span className="env-dot" />Demo Environment</div>
        <button type="button" className="run-btn" onClick={onRun} disabled={running}>
          {running ? "Analyzing…" : "Run Analysis"}
        </button>
      </div>
    </header>
  );
}
