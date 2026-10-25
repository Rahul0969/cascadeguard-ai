"""Rule-based failure impact analysis over the simulated dependency graph."""
from collections import deque
from .data import DEPENDENCIES, SERVICES

RECOVERY_ACTIONS = {
    "payment-service": (
        "Inspect payment-service health and logs, restore availability, "
        "then safely retry dependent requests."
    ),
    "database": "Check database connectivity, capacity, and recent errors.",
}


def analyze_topology():
    """Return service status, root cause, downstream impact, and recommendation."""
    failed = [service for service in SERVICES if service["status"] == "failed"]
    if not failed:
        return {
            "services": SERVICES,
            "dependencies": DEPENDENCIES,
            "analysis": {
                "status": "no-failure-detected",
                "root_cause": None,
                "severity": "LOW",
                "affected_services": [],
                "explanation": "No failed services are present in the demo dataset.",
                "recommended_action": "Continue monitoring service health.",
            },
        }

    # Reverse dependency edges so a failed dependency can be traced to its dependents.
    dependents = {}
    for edge in DEPENDENCIES:
        dependents.setdefault(edge["target"], []).append(edge["source"])

    affected_ids = set()
    queue = deque([service["id"] for service in failed])
    visited = set(queue)

    while queue:
        failed_or_affected = queue.popleft()
        for dependent_id in dependents.get(failed_or_affected, []):
            if dependent_id not in visited:
                visited.add(dependent_id)
                affected_ids.add(dependent_id)
                queue.append(dependent_id)

    service_by_id = {service["id"]: service for service in SERVICES}
    affected = [
        {"id": service_id, "name": service_by_id[service_id]["name"]}
        for service_id in sorted(affected_ids)
    ]

    primary = failed[0]
    severity = "HIGH" if affected else "MEDIUM"
    return {
        "services": SERVICES,
        "dependencies": DEPENDENCIES,
        "analysis": {
            "status": "analysis-complete",
            "root_cause": {
                "id": primary["id"],
                "name": primary["name"],
                "status": primary["status"],
            },
            "severity": severity,
            "affected_services": affected,
            "explanation": (
                f'{primary["name"]} is marked failed in the simulated dataset. '
                "The listed affected services depend on it directly or through "
                "the configured dependency graph."
            ),
            "recommended_action": RECOVERY_ACTIONS.get(
                primary["id"],
                f'Inspect {primary["name"]} health and logs, then restore availability.',
            ),
        },
    }
