# Unit4 week6 — analysis workbook

Start the log analysis with one exact observation: the server records an allowed export of 500 rows. Write a possible misuse explanation, a legitimate alternative and the next evidence that could distinguish them. Do not turn an account name into a claim about the human actor.
Two security lessons plus two separate database workshops. Original draft: 14 October 2026.

A: Distinguish assets, weaknesses, threats, risks and controls. Apply confidentiality, integrity and availability to the export, incorrect attendance and outage cases; explain overlaps. Apply authentication, authorisation and accounting to each logged action. Explain why an account label does not identify a person.

B: Use the twelve scenario cards and sixteen-category reference. Classify each mechanism with a justification, an alternative explanation and specific next evidence. Include internal credential, device and misuse risks and external threats. Categories may overlap.

C: Put the eight CSV events into a timeline manually. The baseline is 20 requests/minute and a 200 ms response time; the observations are 400 requests/minute and 2500 ms. Calculate the factors of 20 and 12.5 respectively. Do not infer causality or a statistical trend from these snapshots. Count authentication and permission events; explain why a recorded export of 500 rows does not identify its recipients. Compare the offline helper after counting manually.

D: Write three case responses covering observation, asset, CIA, AAA, hypothesis, alternative, evidence, authorised response and control limits. Preserve original logs and timestamps. Paper analysis does not authorise operational actions.

E: Transfer case: a shared account performs an accepted attendance update and export from another device. Explain the attribution limits and two checks that could distinguish explanations. Record what remains unknown and connect the next chapter's controls to the risks.
