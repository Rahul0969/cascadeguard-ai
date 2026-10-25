export default function EventLog({ events }) {
  return (
    <section className="panel log-panel">
      <h2 className="panel-title">
        Event Log <span className="sim-tag">simulated</span>
      </h2>
      <ul className="log">
        {events.map((e) => (
          <li key={e.time + e.text}>
            <span className="log-time">{e.time}</span>
            <span className={"dot " + e.status} />
            <span className="log-text">{e.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
