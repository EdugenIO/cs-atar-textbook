# Unit4 week7 — controls/response workbook

Before B, trace Visitors → Internet TCP/443, Visitors → Internal TCP/443 and Visitors → Internet UDP/443 through R1–R4. Record the first match or default deny. Repeat after placing a Visitor-to-any allow first, then explain which restriction is lost.
Two security lessons plus two separate database workshops. Original draft: 14 October 2026.

A: For the earlier export, attendance and outage cases, choose two controls. Explain CIA/AAA purpose, implementation, evidence, limits and service impact. Cover logging, anti-malware, firewalls, ACLs, IPS, VPN, training, codes of conduct and physical protection.

B: Predict these flows manually: Visitors → Internet TCP/443; Visitors → Internal TCP/443; Staff → App TCP/443; Staff → Printer TCP/631; Visitors → Internet UDP/443; Staff → Internal TCP/22. Add an early Visitor-to-any allow and explain which deny is shadowed. Do not deploy the rules.

C: Predict Guest/view/public, Learner/view/own, Learner/export/all, Facilitator/update_attendance/assigned, Facilitator/update_attendance/all and Registrar/export/all. Explain why trusted identity and scope must be established outside the model. Describe server-side ownership and assignment checks conceptually.

D: Use the response cards. Give evidence, an alternative, a hypothesis, authorised containment, remediation, a recovery check and residual risk. Compare blanket blocking with a narrow policy. Do not perform operational actions.

E: Complete the permitted/prohibited test record. Give false-positive and false-negative examples and the next independent evidence needed. Connect certificates and encryption to the next chapter without assuming that port 443 proves TLS.
