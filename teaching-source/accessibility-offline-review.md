# Home, accessibility and offline review — 31 October 2026

The home page links the general textbook, lesson resources, five activity packs, SQL pathway, revision, teacher planning and offline downloads. The specialist companion remains separate. The 2026 foundation and 2027 revisions are retained.

## Checks performed

- Browser checks at desktop, 375 px and 320 px. The home page, resources, activity index, SQL, revision, teacher planning, offline index and a dense Unit 4 chapter fit without horizontal document overflow. Wide tables/code/diagrams scroll inside labelled regions. The standalone Unit 4 reader also fits at 320 px.
- Keyboard activation of the mobile native disclosure menu, diagram text disclosure and reader chapter links. Existing skip-link and chapter-focus regression tests retained.
- Shared text, input boundaries and focus colour contrast checks. Primary dark text/green controls are retained; reduced-motion and forced-colour styles added.
- Three missing SVG descriptions supplied. Fourteen root SVGs have a text-description catalogue; textbook SVG figures offer a full-size link and native text disclosure. Dense model labels are reproduced in the text alternative.
- Existing chapter print tests retained. New reader print tests cover student/answer selection, expansion, restoration after cancellation and restoration on print failure. Print styles expand explanatory material, omit answer bodies for student copies and fit diagrams to paper.
- Four generated single-file readers include all 50 chapters, chapter text, worked examples, public answers, embedded images, unique identifiers and checked internal anchors. No external assets are required to read them. Non-reading links are explicitly described as online.
- Complete ZIP integrity, unique members, licences, navigation adapter, download paths, exact byte counts and SHA-256 hashes are checked. The library is rebuilt after deployment asset versioning. Its own ZIP is excluded to avoid recursive packaging; the copy inside the archive links online for a new full-library download.

## Rebuilding

Run `node scripts/build-offline-readers.mjs`, then `python scripts/build-offline-library.py`. Run the latter again after `node scripts/prepare-pages.mjs` when preparing deployment. CI performs these steps and validates the archive again before upload.

Reader print controls and local URL handling have automated regression checks. Browser file policies differ: progress storage, script permissions and execution tools are not guaranteed by a download. Instructions describe those boundaries and provide the static reader/PDF fallback. External official sources require internet. This is a targeted accessibility improvement, not a WCAG certification or a completed screen-reader/device-lab audit.
