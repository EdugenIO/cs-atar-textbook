# Simplified TLS 1.3 ordering cards
Shuffle before distribution. Normal certificate-authenticated ephemeral-agreement flow; no resumption, early data or client certificates.
T3: Server sends protected authentication messages, including certificate and handshake signature.
T5: Derived symmetric traffic keys protect application records with authenticated encryption.
T1: Client and server exchange supported parameters and public ephemeral key shares.
T4: Client checks trusted name/key binding and server proof; Finished messages confirm handshake. This card compresses details.
T2: Both derive handshake secret/key material from agreement and the protocol key schedule; secrets are not sent directly.
Explain where hostname, trust, integrity and confidentiality evidence arise. Do not use these cards as a packet capture or full protocol specification.
