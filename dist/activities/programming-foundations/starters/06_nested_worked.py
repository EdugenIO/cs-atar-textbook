# This only prints messages. It controls no device or service.
command = "START"
authorised = False
if command == "START":
    if authorised:
        print("ready")
    else:
        print("not authorised")
else:
    print("not a start request")
