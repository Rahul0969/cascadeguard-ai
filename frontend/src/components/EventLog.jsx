export default function EventLog({ events = [] }) {
  return (
    <section className="panel log-panel">
      <h2 className="panel-title">Simulated Event Log <span className="sim-tag">sample events</span></h2>
      {events.length ? <ul className="log">{events.map((event) => (
        <li key={`${event.time}-${event.text}`}><span className="log-time">{event.time}</span><span className={`dot ${event.status}`} />
          <span className="log-text">{event.text}</span></li>
      ))}</ul> : <p className="empty-log">No sample events configured.</p>}
    </section>
  );
}
