"""Unfinished interface contracts. No database operations are implemented."""
def create_booking(connection, borrower_id, device_id, start_slot, end_slot):
    raise NotImplementedError("Validate and use parameterised SQL in a transaction")
def utilisation_report(connection):
    raise NotImplementedError("Query and return a documented report")
def restore_backup(backup_path, disposable_target):
    raise NotImplementedError("Design a safe recovery test on disposable data")
