"""LEGACY CONSOLE PRACTICE: not the current Pygame Task 1.
Use https://edugenio.github.io/cs-atar-textbook/#unit3-project
Retained for optional practice and compatibility.
"""
"""Run python project_console_starter.py in the extracted teacher-reference folder."""
from project_starter import demo_system

def main():
    system = demo_system()
    print("Synthetic classroom demo: changes are lost when you quit.")
    while True:
        print("1 Catalogue | 2 Search | 3 Borrow | 4 Return | 5 Outstanding | 0 Quit")
        choice = input("Choice: ").strip()
        try:
            if choice == "0":
                return
            elif choice == "1":
                for row in system.catalogue():
                    print(row)
            elif choice == "2":
                item = system.find_equipment(input("Equipment ID: "))
                print("Not found" if item is None else
                      f"{item.get_name()}: {item.available()} available")
            elif choice == "3":
                loan_id = input("New loan ID: ")
                borrower_id = input("Borrower ID (B001/B002/B003): ")
                equipment_id = input("Equipment ID: ")
                quantity = int(input("Quantity: "))
                ok = system.borrow(loan_id, borrower_id, equipment_id, quantity)
                print("Issued" if ok else "Rejected: duplicate/unknown ID or insufficient stock")
            elif choice == "4":
                ok = system.return_loan(input("Loan ID: "))
                print("Returned" if ok else "No active loan with that ID")
            elif choice == "5":
                rows = system.outstanding()
                if not rows:
                    print("No outstanding loans")
                for row in rows:
                    print(row)
            else:
                print("Choose one of the listed options")
        except ValueError as error:
            print("Invalid request:", error)
        except EOFError:
            return

if __name__ == "__main__":
    main()
