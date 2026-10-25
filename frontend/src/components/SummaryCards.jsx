export default function SummaryCards({ counts }) {
  const cards = [
    { key: "total", label: "Total Services", value: counts.total, cls: "total" },
    { key: "healthy", label: "Healthy Services", value: counts.healthy, cls: "healthy" },
    { key: "failed", label: "Failed Services", value: counts.failed, cls: "failed" },
    { key: "atRisk", label: "At-Risk Services", value: counts.atRisk, cls: "atrisk" },
  ];
  return <section className="cards" aria-label="Service status summary">{cards.map((card) => (
    <div key={card.key} className={`card ${card.cls}`}><span>{card.label}</span><strong>{card.value}</strong></div>
  ))}</section>;
}
