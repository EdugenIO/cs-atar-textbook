# Imports, standard-library helpers and main guards
# Expected output:
# 5.0
import math

def distance(x, y):
    return math.sqrt(x * x + y * y)

if __name__ == "__main__":
    print(distance(3, 4))
