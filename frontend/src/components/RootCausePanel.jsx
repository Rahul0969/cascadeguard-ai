export default function RootCausePanel({ analysis }) {
  return (
    <aside className="panel rc-panel">
      <h2 className="panel-title">Root Cause Analysis</h2>
      <div className="rc-body">
        <div className="rc-field">
          <span className="rc-label">Suspected root cause:</span>
          <span>{analysis.rootCause}</span>
        </div>
        <div className="rc-field">
          <span className="rc-label">
            Severity: <strong className="sev">{analysis.severity}</strong>
          </span>
        </div>
        <div className="rc-field">
          <span className="rc-label">Affected services:</span>
          <ul className="rc-list">
            {analysis.affected.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="rc-field">
          <span className="rc-label">Explanation:</span>
          <span className="rc-text">{analysis.explanation}</span>
        </div>
        <div className="rc-action">
          <span className="rc-label">Recommended action:</span>
          <span>{analysis.recommendedAction}</span>
        </div>
      </div>
    </aside>
  );
}
