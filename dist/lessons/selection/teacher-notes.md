# Selection lesson — public teacher guidance

Use Boolean conditions and test selection at its boundaries.

Suggested phases: 5/10/20/12/8 minutes; untrialled. Use the existing allocation, not an added assessment.

Worked outputs: [[-1,"Invalid age"],[0,"Junior"],[11,"Junior"],[12,"Standard"],[13,"Standard"]]

Independent solution:
quantity = 0
if quantity < 0:
    message = "Invalid quantity"
elif quantity == 0:
    message = "Empty basket"
else:
    message = "Process order"
print(message)

Cases: [[-1,"Invalid quantity"],[0,"Empty basket"],[1,"Process order"],[2,"Process order"]]

Changed retry:
balance = -2
if balance < 0:
    status = "Overdrawn"
elif balance == 0:
    status = "Zero balance"
else:
    status = "In credit"
print(status)

Cases: [[-2,"Overdrawn"],[0,"Zero balance"],[3,"In credit"]]

Exit guidance: if quantity < 0; elif quantity == 0; else; only one branch executes.
Next step: If all branches run, trace -1, 0 and 2 through the chain.

Observe branch order, equality versus assignment, colons and indentation. Paper tracing supports reasoning but does not establish practical execution.
Original text CC BY 4.0; code MIT.
