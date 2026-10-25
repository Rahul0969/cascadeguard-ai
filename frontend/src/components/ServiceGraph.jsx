const COLORS = {
  healthy: "#2ecc71",
  failed: "#ff3b4e",
  "at-risk": "#e8922b",
};
const W = 960;
const H = 520;
const R = 20;

// Shorten a line so the arrow stops at the edge of the target circle.
function trim(a, b, rA, rB) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x1: a.x + (dx / len) * rA,
    y1: a.y + (dy / len) * rA,
    x2: b.x - (dx / len) * rB,
    y2: b.y - (dy / len) * rB,
  };
}

export default function ServiceGraph({ services, dependencies }) {
  const byId = Object.fromEntries(services.map((s) => [s.id, s]));

  return (
    <div className="panel graph-panel">
      <div className="graph-scroll">
        <svg viewBox={`0 0 ${W} ${H}`} className="graph" role="img" aria-label="Service dependency graph">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#1b2a4a" strokeWidth="1" />
            </pattern>
            {Object.entries({ neutral: "#6b7a99", failed: COLORS.failed, "at-risk": COLORS["at-risk"] }).map(
              ([k, color]) => (
                <marker key={k} id={`arrow-${k}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0L10 5L0 10z" fill={color} />
                </marker>
              )
            )}
          </defs>
          <rect width={W} height={H} fill="url(#grid)" />

          {dependencies.map((d) => {
            const a = byId[d.source];
            const b = byId[d.target];
            if (!a || !b) return null;
            const kind = b.status === "failed" ? "failed" : a.status === "at-risk" ? "at-risk" : "neutral";
            const stroke = kind === "neutral" ? "#6b7a99" : COLORS[kind];
            const l = trim(a, b, R, R + 4);
            return (
              <line
                key={`${d.source}-${d.target}`}
                {...l}
                stroke={stroke}
                strokeWidth="1.6"
                strokeOpacity="0.9"
                markerEnd={`url(#arrow-${kind})`}
              />
            );
          })}

          {services.map((s) => {
            const color = COLORS[s.status];
            const labelW = s.name.length * 8 + 20;
            const labelBelow = s.status === "failed";
            const lx = labelBelow ? s.x - labelW / 2 : s.x + R + 8;
            const ly = labelBelow ? s.y + R + 10 : s.y - 12;
            return (
              <g key={s.id}>
                {s.status === "failed" && <circle cx={s.x} cy={s.y} r={R + 10} fill={color} opacity="0.18" />}
                <circle cx={s.x} cy={s.y} r={R} fill={color} stroke="#0b1530" strokeWidth="3" />
                <rect
                  x={lx}
                  y={ly}
                  width={labelW}
                  height="24"
                  rx="5"
                  fill={s.status === "healthy" ? "#13203d" : color}
                  fillOpacity={s.status === "healthy" ? 0.9 : 0.25}
                  stroke={s.status === "healthy" ? "#2a3c63" : color}
                />
                <text x={lx + labelW / 2} y={ly + 16} textAnchor="middle" fontSize="13" fill="#e6edf7">
                  {s.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="graph-caption">Arrows point from a service to the dependency it relies on.</p>
    </div>
  );
}
