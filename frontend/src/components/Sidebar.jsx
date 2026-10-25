const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const icons = {
  Overview: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  ),
  "Service Topology": (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="9" y="3" width="6" height="5" rx="1" />
      <rect x="2" y="16" width="6" height="5" rx="1" />
      <rect x="16" y="16" width="6" height="5" rx="1" />
      <path d="M12 8v4M5 16v-4h14v4" />
    </svg>
  ),
  "Incident Analysis": (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5v.5" />
    </svg>
  ),
  Settings: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
    </svg>
  ),
};

const items = ["Overview", "Service Topology", "Incident Analysis", "Settings"];

export default function Sidebar({ active }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <svg viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="#5b9dff" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M16 3l11 6v14l-11 6-11-6V9z" />
          <path d="M16 3v26M5 9l11 7 11-7M5 23l11-7 11 7" opacity="0.6" />
        </svg>
        <span>CascadeGuard AI</span>
      </div>
      <nav>
        {items.map((name) => (
          <button
            key={name}
            type="button"
            className={"nav-item" + (name === active ? " active" : "")}
            aria-current={name === active ? "page" : undefined}
          >
            {icons[name]}
            <span>{name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
