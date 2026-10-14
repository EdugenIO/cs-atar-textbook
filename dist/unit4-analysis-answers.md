# Teacher explained checkpoints — separate,notaccess-protected
C1: Phishing possibility; credentials/confidentiality at risk, not proven compromise
C2: Compromised credential or legitimate correction/export; verify identity/context
C3: Authentication accepted; authorisation differs by action; accounting records both
C4: Integrity depends on whether change was correct/authorised; logs show action not accuracy
C5: Availability affected; DoS hypothesis competes with legitimate demand/fault
C6: Physical/credential risk; encryption/access/session state determines exposure
C7: XSS mechanism if browser-active content; SQL parameterisation is a different defence
C8: SQL injection risk; bind values and constrain privileges, not just hide errors
C9: Back-door/control-bypass risk; inventory and authorisation review
C10: IP spoofing possible; address alone does not establish authenticated person
C11: Ransomware possibility; availability/confidentiality/integrity risks require scope evidence
C12: Trojan/spyware possibility; verify provenance/behaviour rather than infer from name
Log:8events;authdeny2,authallow1,exportallow1,delete deny1,updateallow1,monitorobserved2. Outcome totals:allow3,deny3,monitorobserved2,total8. Recordedexport500/update1; don'tsumrequestcount/mswithrecordcounts.
Baseline400/20=20;2500/200=12.5. NotproofDDoSorservercause; snapshotcomparabilitymustbechecked. Twologindenialsarenotsufficientforattackclassification. Account/sessionlabelsanddocumentationIPsarefictional,notcredentials/targets.
CIA:exportpotentialconfidentiality;wrongattendanceintegrity;serviceunavailabilityavailability. AAA:authaccepted,actionrightsseparate,accountingtrace. A01exportmaylegitimateorcredentialmisuse;seekroleapproval,establisheduserconfirmation,session/device/exportcontext. Deletiondeniedisonecontrolresult,notproofentirepolicyadequate.
Transfer:sharedaccountweakensattribution;verifyauthorisedworkflowanddevice/sessionrecords,notaccusefromaccountname. SQLinjectionandXSSdifferentinterpreters;boundvalues/contextsafeoutputrespectively. Noattackpayloadsorrealtestsrequired. Teacherchecksindependentreasoningratherthanmemorisedlabels.
