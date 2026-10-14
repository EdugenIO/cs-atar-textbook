# Teacher explained checkpoints — separate,notaccess-protected
C1: Phishing is possible; credentials and confidentiality are at risk, but compromise is not proven.
C2: Compromised credentials and a legitimate correction/export are alternatives; verify identity and context.
C3: Authentication was accepted; authorisation differs by action; accounting records both actions.
C4: Integrity depends on whether the change was correct and authorised; logs show an action, not factual accuracy.
C5: Availability is affected; DoS competes with legitimate demand and faults as a hypothesis.
C6: Physical and credential risks depend on encryption, access and session state.
C7: XSS is the mechanism if untrusted content executes in the browser; SQL parameterisation is a different defence.
C8: SQL injection is a risk; bind values and constrain privileges rather than merely hiding errors.
C9: An undocumented access path creates a back-door/control-bypass risk; review inventory and authorisation.
C10: IP spoofing is possible; an address alone does not establish an authenticated person.
C11: Ransomware is possible; confidentiality, integrity and availability risks require evidence about scope.
C12: Trojan/spyware behaviour is possible; verify provenance and behaviour rather than inferring them from the name.

The eight events comprise two denied authentications, one accepted authentication, one allowed export, one denied deletion, one allowed update and two monitoring observations. Outcome totals are three allowed, three denied and two monitoring observations. Recorded row counts are 500 exported and one updated; do not add request counts or milliseconds to record counts.

The request-rate ratio is 400/20 = 20; the response-time ratio is 2500/200 = 12.5. These are not proof of DDoS or a server-side cause; check whether the snapshots are comparable. Two denied logins are insufficient to classify an attack. Account labels, session labels and documentation IP addresses are fictional, not usable credentials or targets.

CIA: export creates potential confidentiality risk; incorrect attendance affects integrity; service unavailability affects availability. AAA: authentication acceptance, action permissions and activity records answer different questions. A01's export may be legitimate or involve credential misuse. Seek role approval, established user confirmation and session, device and export context. A denied deletion is one control result, not proof that the whole policy is adequate.

Transfer: a shared account weakens attribution. Verify the authorised workflow and device/session records; do not accuse a person from an account name. SQL injection and XSS affect different interpreters; bound values and context-appropriate safe output address them respectively. No attack payloads or real tests are required. Review independent reasoning rather than memorised labels.
