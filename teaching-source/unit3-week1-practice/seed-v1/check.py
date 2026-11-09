"""Run from the version folder. Code MIT."""
import rules

expected = 2
actual = rules.count_ready([4, 5, 7])
print("Source:", rules.__file__)
print("Version:", rules.VERSION, "Minimum:", rules.MINIMUM)
print("Expected:", expected, "Actual:", actual)
print("PASS" if actual == expected else "FAIL: investigate the version and rule")
if actual != expected:
    raise SystemExit(1)
