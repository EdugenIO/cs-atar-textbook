# Teacher reference: message-only nested selection.
command = "SHOW"
staff = False
if command == "SHOW":
    if staff:
        print("full report")
    else:
        print("summary")
else:
    print("unknown")
