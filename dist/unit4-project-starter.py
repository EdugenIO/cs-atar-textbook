"""Student design scaffold. Use your own six-table schema in a disposable DB."""
def book(db, member_id, session_id, booked_on):
    # Validate date and known pair; begin write transaction; reject duplicate/full.
    # Insert only after checks; commit success; rollback rejection/error.
    raise NotImplementedError("Implement requirement R3")

def import_members(db, rows):
    # Normalise agreed fields; validate whole batch; parameterise inserts.
    # Reject invalid/duplicate rows and rollback any failed batch.
    raise NotImplementedError("Implement requirement R5")

def set_attendance(db, member_id, session_id, present):
    raise NotImplementedError("Implement requirement R4")
