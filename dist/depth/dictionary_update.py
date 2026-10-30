scores = {"Ari": 10, "Bo": 0}
scores["Ari"] += 5
new_name = "Ari"
if new_name in scores:
    print("duplicate rejected")
else:
    scores[new_name] = 0
print(scores["Ari"], scores["Bo"])
print("Eli" in scores)
