"""Rule-based failure impact analysis over the simulated dependency graph."""
from collections import deque
from copy import deepcopy

from .data import DEPENDENCIES, SERVICES

RECOVERY_ACTIONS = {
    "payment-service": (
        "Inspect Payment Service health checks and logs, restore availability, "
        "then safely retry dependent requests."
    ),
    "database": "Check database connectivity, capacity, connection-pool usage, and recent errors.",
}


def analyze_topology():
    """Return fresh service data, the graph, and an explainable failure analysis."""
    services = deepcopy(SERVICES)
    failed = [service for service in services if service["status"] == "failed"]

    # source depends on target, so reverse each edge to find dependents of a failure.
    dependents = {}
    for edge in DEPENDENCIES:
        dependents.setdefault(edge["target"], []).append(edge["source"])

    affected_ids = set()
    queue = deque(service["id"] for service in failed)
    visited = set(queue)
    while queue:
        current = queue.popleft()
        for dependent_id in dependents.get(current, []):
            if dependent_id not in visited:
                visited.add(dependent_id)
                affected_ids.add(dependent_id)
                queue.append(dependent_id)

    for service in services:
        if service["id"] in affected_ids and service["status"] != "failed":
            service["status"] = "at-risk"

    by_id = {service["id"]: service for service in services}
    affected = [
        {"id": service_id, "name": by_id[service_id]["name"]}
        for service_id in sorted(affected_ids)
    ]

    if not failed:
        analysis = {
            "status": "no-failure-detected",
            "root_cause": None,
            "severity": "LOW",
            "affected_services": [],
            "explanation": "No failed services are present in the simulated dataset.",
            "recommended_action": "Continue monitoring service health.",
        }
    else:
        primary = failed[0]
        analysis = {
            "status": "analysis-complete",
            "root_cause": {"id": primary["id"], "name": primary["name"], "status": "failed"},
            "severity": "HIGH" if affected else "MEDIUM",
            "affected_services": affected,
            "explanation": (
                f"{primary['name']} is marked failed in the simulated dataset. "
                "Affected services are traced through the configured dependency graph; "
                "this is a rule-based estimate, not live production telemetry."
            ),
            "recommended_action": RECOVERY_ACTIONS.get(
                primary["id"],
                f"Inspect {primary['name']} health checks and logs, then restore availability.",
            ),
        }

    return {"services": services, "dependencies": deepcopy(DEPENDENCIES), "analysis": analysis}
