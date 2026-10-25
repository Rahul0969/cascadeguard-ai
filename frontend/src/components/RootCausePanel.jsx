export default function RootCausePanel({ analysis }) {
  const rootCause = analysis.root_cause?.name || "No failure detected";
  const affected = analysis.affected_services || [];
  return (
    <aside className="panel rc-panel">
      <h2 className="panel-title">Root Cause Analysis</h2>
      <div className="rc-body">
        <div className="rc-field"><span className="rc-label">Suspected root cause</span><strong>{rootCause}</strong></div>
        <div className="rc-field"><span className="rc-label">Severity</span><strong className={`sev sev-${(analysis.severity || "low").toLowerCase()}`}>{analysis.severity || "LOW"}</strong></div>
        <div className="rc-field"><span className="rc-label">Affected services ({affected.length})</span>
          {affected.length ? <ul className="rc-list">{affected.map((service) => <li key={service.id}>{service.name}</li>)}</ul> : <p className="rc-text">No affected services reported.</p>}
        </div>
        <div className="rc-field"><span className="rc-label">Explanation</span><p className="rc-text">{analysis.explanation}</p></div>
        <div className="rc-action"><span className="rc-label">Recommended recovery action</span><span>{analysis.recommended_action}</span></div>
      </div>
    </aside>
  );
}
