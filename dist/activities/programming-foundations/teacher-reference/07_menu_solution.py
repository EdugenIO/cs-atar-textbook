# Teacher reference: prints only, no device/service action.
raw = input("Command: ")
command = raw.strip().upper()
if command == "START":
    message = "Start requested"
elif command == "STOP":
    message = "Stop requested"
elif command == "STATUS":
    message = "Status requested"
else:
    message = "Unknown command"
print(message)
