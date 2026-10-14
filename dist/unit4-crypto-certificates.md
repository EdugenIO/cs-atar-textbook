# Fictional certificate fact cards
Requested host: bookings.example.test. Assessment time: 14 October 2026 UTC. No real certificates or cryptographic validation.
Baseline C1: hostname matches; validity includes assessment time; issuer chain reaches trusted anchor and signatures valid; server-auth use permitted; handshake private-key possession proof valid; status handling meets the scenario policy. All are supplied assumptions.
C2: as C1 except hostname is other.example.test.
C3: as C1 except expiry was 13 October 2026 UTC.
C4: as C1 except chain ends at an untrusted issuer.
C5: as C1 except handshake possession proof fails.
C6: as C1 except key use does not permit server authentication.
State which supplied checks fail and why date/name alone are insufficient. Passing C1 only establishes consistency with supplied facts, not actual certificate validation or business trustworthiness.
