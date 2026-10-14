# Classroom cipher workbook

Conventions: uppercase A–Z, A=0 ... Z=25; remove spaces/punctuation. Positive shifts move forward and wrap modulo 26. Subtract to decrypt. Historical teaching ciphers are not production security.

1. Encrypt LOAN with rotation shift 3; show each number. Decrypt ORDQ using 3.
2. Encrypt RETURN with shift 5, including wrap-around. Decrypt WJYZWS using 5.
3. Random substitution mapping:
Plain:  ABCDEFGHIJKLMNOPQRSTUVWXYZ
Cipher: QWERTYUIOPASDFGHJKLZXCVBNM
Encrypt LOAN, then decrypt SGQF by reversing the mapping.
4. Vigenère: encrypt LOAN with KEY (repeat KEYK). Use the key letter numbers as forward shifts. Decrypt VSYX with KEY.
5. Encrypt DATA with KEY (repeat KEYK); show the four additions modulo 26, then reverse them.
6. Explain brute force for a rotation cipher (26 possible shifts including zero).
7. Explain frequency analysis for a fixed substitution, and why the most frequent symbol is not always E.
8. Explain why Vigenère changes mappings across positions yet is still unsuitable for real records.
