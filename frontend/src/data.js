
export const services = [
  { id: "api-gateway", name: "API Gateway", status: "healthy", x: 90, y: 260 },
  { id: "auth-service", name: "Auth Service", status: "healthy", x: 300, y: 90 },
  { id: "user-service", name: "User Service", status: "healthy", x: 300, y: 215 },
  { id: "notification-service", name: "Notification Service", status: "at-risk", x: 300, y: 340 },
  { id: "order-service", name: "Order Service", status: "at-risk", x: 300, y: 455 },
  { id: "payment-service", name: "Payment Service", status: "failed", x: 590, y: 300 },
  { id: "inventory-service", name: "Inventory Service", status: "healthy", x: 590, y: 455 },
  { id: "database", name: "Database", status: "healthy", x: 850, y: 215 },
];

// source depends on target
export const dependencies = [
  { source: "api-gateway", target: "auth-service" },
  { source: "api-gateway", target: "user-service" },
  { source: "api-gateway", target: "order-service" },
  { source: "auth-service", target: "database" },
  { source: "user-service", target: "database" },
  { source: "order-service", target: "payment-service" },
  { source: "order-service", target: "inventory-service" },
  { source: "payment-service", target: "database" },
  { source: "notification-service", target: "payment-service" },
];

export const analysis = {
  rootCause: "Payment Service unavailable",
  severity: "HIGH",
  affected: ["Order Service", "Notification Service"],
  explanation:
    "Order Service and Notification Service both depend on Payment Service. While it is unavailable, their requests cannot complete. (Placeholder text, not a live analysis.)",
  recommendedAction:
    "Inspect payment-service health and restore availability before retrying dependent requests.",
};

// Simulated demo events.
export const events = [
  { time: "10:58:12", text: "Payment Service unavailable: health check failed", status: "failed" },
  { time: "10:57:40", text: "Order Service: payment requests timing out", status: "at-risk" },
  { time: "10:55:04", text: "Notification Service: delivery queue backing up", status: "at-risk" },
  { time: "10:48:30", text: "Auth Service: all health checks passing", status: "healthy" },
  { time: "10:42:18", text: "Database: connection pool normal", status: "healthy" },
];

export function countByStatus(list) {
  return {
    total: list.length,
    healthy: list.filter((s) => s.status === "healthy").length,
    failed: list.filter((s) => s.status === "failed").length,
    atRisk: list.filter((s) => s.status === "at-risk").length,
  };
}
