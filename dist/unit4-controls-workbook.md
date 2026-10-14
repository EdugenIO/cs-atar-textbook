# Unit4 week7 — controls/response workbook
Two security lessons plus two separate database workshops. Original draft14October2026.
A: for previous export/attendance/outage cases, select two controls, map CIA/AAA purpose, implementation/evidence, limitation and service impact. Cover logging,anti-malware,firewall,ACL,IPS,VPN,training,conduct and physical protection.
B: manually predict VisitorsInternetTCP443;VisitorsInternalTCP443;StaffAppTCP443;StaffPrinterTCP631;VisitorsInternetUDP443;StaffInternalTCP22. Add an early Visitor-any allow and explain which deny is shadowed. No real deployment.
C: predict Guestviewpublic,Learnerviewown,Learnerexportall,Facilitatorupdate_attendanceassigned,Facilitatorupdate_attendanceall,Registrarexportall. Explain why trustedidentity/scope must be established outside the model. Define server-side ownership/assignment checks conceptually.
D: use response cards. Give evidence,alternative,hypothesis,authorisedcontainment,remediation,recoverycheck and residualrisk. Compare blanketblock vs narrowpolicy. Do not perform operational actions.
E: complete positive/negative testrecord; statefalsepositive/falsenegative example and independentnextevidence. Link certificates/encryption to nextchapter withoutassumingport443 provesTLS.
