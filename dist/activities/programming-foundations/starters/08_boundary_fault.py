# Deliberate logic fault. Requirement: integer ratings 1-5 inclusive.
# Predict, run, preserve the failure, repair and retest.
rating = 3
accepted = rating > 1 and rating < 5
print(accepted)
