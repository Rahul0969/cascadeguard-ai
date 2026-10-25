"""Small dependency-free tests for the rule-based analysis engine."""
import unittest

from app.analysis import analyze_topology


class AnalysisTests(unittest.TestCase):
    def test_failed_payment_marks_transitive_dependents_at_risk(self):
        result = analyze_topology()
        services = {service["id"]: service for service in result["services"]}
        self.assertEqual(services["payment-service"]["status"], "failed")
        self.assertEqual(services["order-service"]["status"], "at-risk")
        self.assertEqual(services["notification-service"]["status"], "at-risk")
        self.assertEqual(services["api-gateway"]["status"], "at-risk")
        self.assertEqual(services["auth-service"]["status"], "healthy")

    def test_analysis_explains_root_cause_and_recovery(self):
        result = analyze_topology()
        analysis = result["analysis"]
        self.assertEqual(analysis["root_cause"]["id"], "payment-service")
        self.assertEqual(analysis["severity"], "HIGH")
        self.assertTrue(analysis["affected_services"])
        self.assertTrue(analysis["recommended_action"])

    def test_calls_do_not_mutate_global_demo_data(self):
        first = analyze_topology()
        second = analyze_topology()
        self.assertEqual(first, second)
        self.assertEqual(
            next(s["status"] for s in first["services"] if s["id"] == "payment-service"),
            "failed",
        )


if __name__ == "__main__":
    unittest.main()
