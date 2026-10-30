# Small isolated demonstrations: these are not a policy of hiding every error.
def local_error():
    amount = amount + 1
cases = [
    ("syntax", lambda: compile("if True print(1)", "demo", "exec")),
    ("indentation", lambda: compile("if True:\nprint(1)", "demo", "exec")),
    ("name", lambda: missing_name),
    ("local", local_error),
    ("type", lambda: "2" + 1),
    ("value", lambda: int("two")),
    ("zero", lambda: 4 / 0),
    ("index", lambda: [10][1]),
    ("key", lambda: {"A": 10}["B"]),
]
for label, operation in cases:
    try:
        operation()
    except (SyntaxError, NameError, TypeError, ValueError,
            ZeroDivisionError, IndexError, KeyError) as error:
        print(label, type(error).__name__)
