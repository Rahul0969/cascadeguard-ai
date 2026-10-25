"""Simulated service topology for the CascadeGuard AI demo."""

SERVICES = [
    {"id": "api-gateway", "name": "API Gateway", "status": "healthy"},
    {"id": "auth-service", "name": "Auth Service", "status": "healthy"},
    {"id": "user-service", "name": "User Service", "status": "healthy"},
    {"id": "order-service", "name": "Order Service", "status": "at-risk"},
    {"id": "payment-service", "name": "Payment Service", "status": "failed"},
    {"id": "inventory-service", "name": "Inventory Service", "status": "healthy"},
    {"id": "notification-service", "name": "Notification Service", "status": "at-risk"},
    {"id": "database", "name": "Database", "status": "healthy"},
]

# An edge A -> B means service A depends on service B.
DEPENDENCIES = [
    {"source": "api-gateway", "target": "auth-service"},
    {"source": "api-gateway", "target": "user-service"},
    {"source": "api-gateway", "target": "order-service"},
    {"source": "auth-service", "target": "database"},
    {"source": "user-service", "target": "database"},
    {"source": "order-service", "target": "payment-service"},
    {"source": "order-service", "target": "inventory-service"},
    {"source": "payment-service", "target": "database"},
    {"source": "notification-service", "target": "payment-service"},
]
