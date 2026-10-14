"""Run python test_booking_reliability.py -v beside project_reference.py.
These tests sample R1-R8; user acceptance/evaluation still need evidence.
"""
import unittest
from project_reference import demo_system

class BookingTests(unittest.TestCase):
    def setUp(self):
        self.system = demo_system()

    def state(self):
        return self.system.catalogue(), self.system.history()

    def test_initial_catalogue(self):
        self.assertEqual([row["available"] for row in self.system.catalogue()], [2, 1, 3])
        self.assertEqual(self.system.outstanding(), [])

    def test_known_and_missing_search(self):
        before = self.state()
        self.assertEqual(self.system.find_equipment("E01").get_name(), "Camera")
        self.assertIsNone(self.system.find_equipment("E99"))
        self.assertEqual(self.state(), before)

    def test_issue_changes_stock_and_history(self):
        self.assertTrue(self.system.borrow("L001", "B001", "E01", 1))
        self.assertEqual(self.system.find_equipment("E01").available(), 1)
        self.assertEqual(self.system.history(), [{"loan_id": "L001", "borrower_id": "B001",
            "equipment_id": "E01", "quantity": 1, "active": True}])

    def test_invalid_quantity_no_mutation(self):
        for quantity in [0, -1, True, "1", 1.5, None]:
            with self.subTest(quantity=quantity):
                before = self.state()
                with self.assertRaises(ValueError):
                    self.system.borrow("L001", "B001", "E01", quantity)
                self.assertEqual(self.state(), before)

    def test_duplicate_and_closed_id_not_reused(self):
        self.assertTrue(self.system.borrow("L001", "B001", "E01", 1))
        before = self.state()
        self.assertFalse(self.system.borrow("L001", "B002", "E01", 1))
        self.assertEqual(self.state(), before)
        self.assertTrue(self.system.return_loan("L001"))
        before = self.state()
        self.assertFalse(self.system.borrow("L001", "B002", "E01", 1))
        self.assertEqual(self.state(), before)

    def test_unknown_ids_no_mutation(self):
        before = self.state()
        self.assertFalse(self.system.borrow("L001", "B999", "E01", 1))
        self.assertFalse(self.system.borrow("L001", "B001", "E99", 1))
        self.assertFalse(self.system.return_loan("L999"))
        self.assertEqual(self.state(), before)

    def test_exact_then_insufficient_stock(self):
        self.assertTrue(self.system.borrow("L001", "B001", "E01", 2))
        self.assertEqual(self.system.find_equipment("E01").available(), 0)
        before = self.state()
        self.assertFalse(self.system.borrow("L002", "B002", "E01", 1))
        self.assertEqual(self.state(), before)

    def test_full_return_once(self):
        self.assertTrue(self.system.borrow("L001", "B001", "E01", 2))
        self.assertTrue(self.system.return_loan("L001"))
        self.assertEqual(self.system.find_equipment("E01").available(), 2)
        before = self.state()
        self.assertFalse(self.system.return_loan("L001"))
        self.assertEqual(self.state(), before)

    def test_report_order_preserves_history(self):
        self.system.borrow("L002", "B001", "E01", 1)
        self.system.borrow("L001", "B002", "E02", 1)
        before = self.system.history()
        self.assertEqual([r["loan_id"] for r in self.system.outstanding()], ["L001", "L002"])
        self.assertEqual(self.system.history(), before)
        self.assertEqual([r["loan_id"] for r in before], ["L002", "L001"])

    def test_snapshots_are_not_live_records(self):
        self.system.borrow("L001", "B001", "E01", 1)
        before = self.state()
        report = self.system.outstanding()
        report[0]["quantity"] = 999
        catalogue = self.system.catalogue()
        catalogue[0]["available"] = 999
        self.assertEqual(self.state(), before)

    def test_polymorphic_queries_do_not_mutate(self):
        before = self.state()
        self.assertEqual([r["preparation"] for r in self.system.catalogue()],
            ["Check the lens", "Check the ventilation", "Check the item before use"])
        self.assertEqual(self.state(), before)

    def test_id_normalisation_and_empty_input(self):
        self.assertTrue(self.system.borrow(" l001 ", " b001 ", " e01 ", 1))
        self.assertEqual(self.system.history()[0]["loan_id"], "L001")
        before = self.state()
        with self.assertRaises(ValueError):
            self.system.return_loan("  ")
        self.assertEqual(self.state(), before)

if __name__ == "__main__":
    unittest.main()
