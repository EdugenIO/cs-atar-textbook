"""Run explicitly: python fault_probe.py -v.
Both tests intentionally fail against the supplied faulty ReturnLab.
Repair its return_loan method, then rerun; do not change the expected contract.
"""
import unittest
from fault_return_lab import ReturnLab

class ReturnRegression(unittest.TestCase):
    def test_second_return_rejected(self):
        item = ReturnLab()
        self.assertTrue(item.return_loan())
        self.assertFalse(item.return_loan())

    def test_second_return_preserves_state(self):
        item = ReturnLab()
        item.return_loan()
        before = (item.available, item.active)
        item.return_loan()
        self.assertEqual((item.available, item.active), before)

if __name__ == "__main__":
    unittest.main()
