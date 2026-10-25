"""Simulated microservice topology for the CascadeGuard AI demo.

An edge A -> B means A depends on B.
"""

SERVICES = [
    {"id": "api-gateway", "name": "API Gateway", "status": "healthy", "x": 90, "y": 260},
    {"id": "auth-service", "name": "Auth Service", "status": "healthy", "x": 300, "y": 90},
    {"id": "user-service", "name": "User Service", "status": "healthy", "x": 300, "y": 215},
    {"id": "notification-service", "name": "Notification Service", "status": "healthy", "x": 300, "y": 340},
    {"id": "order-service", "name": "Order Service", "status": "healthy", "x": 300, "y": 455},
    {"id": "payment-service", "name": "Payment Service", "status": "failed", "x": 590, "y": 300},
    {"id": "inventory-service", "name": "Inventory Service", "status": "healthy", "x": 590, "y": 455},
    {"id": "database", "name": "Database", "status": "healthy", "x": 850, "y": 215},
]

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
