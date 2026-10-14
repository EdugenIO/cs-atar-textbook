# Original pseudocode convention clinic
Checked against the currently linked SCSA support booklet, printed pp1–4 and7–10,14October2026. Its syntax guidance is not a mandatory single grammar. These original examples use its assignment/comparison style and explicit blocks; contracts may differ from official examples.

## Row totals
```text
FUNCTION RowTotals(grid)
    totals = []
    total = 0
    FOR row IN grid
        total = 0
        FOR value IN row
            total = total + value
        END FOR
        totals.append(total)
    END FOR
    RETURN totals
END RowTotals
```
Contract: numeric grid, including empty rows; return a new totals array. [[2,0],[1,4],[]] ->[2,5,0]; empty grid ->[].
## Dictionary traversal
```text
FUNCTION TotalStock(stock)
    total = 0
    FOR key IN stock.keys
        total = total + stock[key]
    END FOR
    RETURN total
END TotalStock
```
Contract: mapping of unique IDs to nonnegative integer quantities. {A01:2,A02:0} ->2.
## Binary ID search
```text
FUNCTION FindID(records, target)
    low = 0
    high = records.length - 1
    middle = 0
    WHILE low <= high
        middle = (low + high) DIV 2
        IF records[middle][0] == target THEN
            RETURN middle
        ELSE IF records[middle][0] < target THEN
            low = middle + 1
        ELSE
            high = middle - 1
        END IF
    END WHILE
    RETURN -1
END FindID
```
Contract: ascending unique string IDs; return index or-1. Empty/absent ->-1; one matching row ->0. DIV keeps midpoint integral.

## Student task
Write a fresh row-column calculation and dictionary update; identify every assignment/comparison. Trace search for first/last/absent; implement insertion sort using explicit initialisation, indentation and block endings. Preserve the earlier Python examples’ documented return contracts rather than changing None to-1 silently.

Source: https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF
