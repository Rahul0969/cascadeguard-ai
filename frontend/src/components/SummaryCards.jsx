export default function SummaryCards({ counts }) {
  const cards = [
    { key: "total", label: "Total Services", value: counts.total, cls: "total" },
    { key: "healthy", label: "Healthy Services", value: counts.healthy, cls: "healthy" },
    { key: "failed", label: "Failed Services", value: counts.failed, cls: "failed" },
    { key: "atRisk", label: "At-Risk Services", value: counts.atRisk, cls: "atrisk" },
  ];
  return (
    <section className="cards">
      {cards.map((c) => (
        <div key={c.key} className={"card " + c.cls}>
          {c.label}: <strong>{c.value}</strong>
        </div>
      ))}
    </section>
  );
}
