"""Build the static, evidence-led site audit and editable task CSV."""
from pathlib import Path
from html import escape
from collections import Counter
import csv
import io
import json

ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'audit-source/site-audit-2026-10-30.json').read_text(encoding='utf-8'))
folder=ROOT/'dist/audits'
folder.mkdir(exist_ok=True)
slug=data['slug']
(folder/(slug+'.json')).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
tasks=data['tasks']
ids={t['id'] for t in tasks}
assert len(ids)==len(tasks)==18
assert all(t['priority'] in ['P1','P2','P3'] and t['evidence'] and t['completeWhen'] for t in tasks)
assert all(set(t['dependencies'])<=ids for t in tasks)
assert set(id for p in data['phases'] for id in p['tasks'])==ids
counts=Counter(t['priority'] for t in tasks)
types=Counter(t['kind'] for t in tasks)

rows=[['ID','Priority','Type','Status','Area','Task','Owner','Phase','Dependencies','Evidence','Action','Complete when']]
for t in tasks:
    rows.append([t['id'],t['priority'],t['kind'],t['status'],t['area'],t['title'],t['owner'],t['phase'],', '.join(t['dependencies']),t['evidence'],t['action'],t['completeWhen']])
stream=io.StringIO(newline='')
writer=csv.writer(stream,lineterminator='\n')
writer.writerows(rows)
(folder/(slug+'-tasks.csv')).write_text(stream.getvalue(),encoding='utf-8-sig',newline='')

md=[f"# {data['title']} · {data['date']}", '', data['summary'], '',
    f"Audited site: {data['site']}\n\nAudited source: `{data['sourceCommit']}`. This report is a dated snapshot, not automatic teacher/curriculum sign-off.", '',
    f"**18 open tasks: {counts['P1']} P1, {counts['P2']} P2, {counts['P3']} P3.** P1 = address before formal project issue; P2 = next delivery/usability/reliability work; P3 = later maintenance/discovery. Types: {types['Confirmed finding']} confirmed findings, {types['Review required']} reviews required and {types['Planned improvement']} planned improvements.", '',
    '## What passed', '']
md += ['- '+text for text in data['passed']]
md += ['', '## Recommended order', '']
for phase in data['phases']:
    md += ['### '+phase['name'], '', ', '.join(phase['tasks']), '']
md += ['## Task summary', '', '| ID | Priority | Type | Task |', '| --- | --- | --- | --- |']
md += [f"| {t['id']} | {t['priority']} | {t['kind']} | {t['title']} |" for t in tasks]
md += ['', '## Evidence and completion checks', '']
for t in tasks:
    md += [f"### {t['id']} · {t['priority']} — {t['title']}", '',
           f"Type: {t['kind']} · Status: {t['status']} · Suggested owner: {t['owner']} · Dependencies: {', '.join(t['dependencies']) or 'none'}", '',
           '**Evidence:** '+t['evidence'], '', '**Action:** '+t['action'], '', '**Complete when:** '+t['completeWhen'], '']
md += ['## Scope and limits', '']+['- '+text for text in data['limits']]
md += ['', '## References', '']+[f"- [{s['label']}]({s['url']})" for s in data['sources']]
md += ['', 'Original audit text CC BY 4.0. Software MIT. This audit records evidence and next steps; it does not mark the open tasks complete.','']
(folder/(slug+'.md')).write_text('\n'.join(md),encoding='utf-8')

e=lambda value:escape(str(value),quote=True)
def links(items):
    return ' · '.join(f'<a href="#{e(id)}">{e(id)}</a>' for id in items)
summary=''.join(f'<tr><td><a href="#{e(t["id"])}">{e(t["id"])}</a></td><td>{e(t["priority"])}</td><td>{e(t["kind"])}</td><td><a href="#{e(t["id"])}">{e(t["title"])}</a></td></tr>' for t in tasks)
details=''.join(f'''<section class="audit-task" id="{e(t['id'])}"><p class="eyebrow">{e(t['priority'])} · {e(t['kind'])} · {e(t['status'])}</p><h2>{e(t['id'])} · {e(t['title'])}</h2><p><strong>Suggested owner:</strong> {e(t['owner'])}<br><strong>Dependencies:</strong> {links(t['dependencies']) or 'None'}</p><p><strong>Evidence:</strong> {e(t['evidence'])}</p><p><strong>Action:</strong> {e(t['action'])}</p><div class="notice"><strong>Complete when:</strong> {e(t['completeWhen'])}</div><p><a href="#task-summary">Back to task list ↑</a></p></section>''' for t in tasks)
html=f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Site audit and next steps · 30 October 2026 · CS ATAR</title><link rel="stylesheet" href="../style.css"><style>main{{margin:auto;max-width:1160px}}.audit-task{{border-top:1px solid var(--line);padding-top:24px;margin-top:45px;scroll-margin-top:20px}}.audit-facts{{display:flex;flex-wrap:wrap;gap:12px}}.audit-facts span{{padding:12px 18px;border:1px solid var(--line);border-radius:8px}}.audit-actions{{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}}.audit-actions .secondary{{margin-left:0}}.audit-table{{overflow-x:auto}}.audit-table table{{min-width:620px}}.audit-table th,.audit-table td{{vertical-align:top}}code{{overflow-wrap:anywhere}}@media print{{.audit-actions,.audit-back{{display:none}}.audit-task{{break-before:auto}}.audit-table{{overflow:visible}}.audit-table table{{min-width:0}}}}</style></head><body><a class="skip" href="#audit-main">Skip to audit</a><main id="audit-main" tabindex="-1"><p class="audit-back"><a href="../#audits">← Coverage &amp; audits</a></p><p class="eyebrow">CURRENT SITE REVIEW · {e(data['date'])}</p><h1>Site audit.<br>Practical next steps.</h1><p class="lede">{e(data['summary'])}</p><p>Audited source: <a href="https://github.com/EdugenIO/cs-atar-textbook/tree/{e(data['sourceCommit'])}"><code>{e(data['sourceCommit'][:7])}</code></a>. These are open actions, not completed repairs.</p><div class="audit-facts"><span><strong>{counts['P1']}</strong> P1 tasks</span><span><strong>{counts['P2']}</strong> P2 tasks</span><span><strong>{counts['P3']}</strong> P3 tasks</span><span><strong>405</strong> live URLs checked</span></div><p>P1: address before formal project issue. P2: next delivery, usability and reliability work. P3: later maintenance and discovery. Findings distinguish confirmed evidence from required reviews and planned improvements.</p><div class="audit-actions"><a class="button" href="{slug}-tasks.csv" download>Download editable task list</a><a class="button secondary" href="{slug}.md" download>Download full Markdown report</a></div><h2>What passed</h2><ul>{''.join('<li>'+e(p)+'</li>' for p in data['passed'])}</ul><h2>Recommended order</h2><ol>{''.join('<li><strong>'+e(p['name'])+'</strong><br>'+links(p['tasks'])+'</li>' for p in data['phases'])}</ol><h2 id="task-summary">All 18 next steps</h2><div class="audit-table"><table><thead><tr><th scope="col">ID</th><th scope="col">Priority</th><th scope="col">Type</th><th scope="col">Task</th></tr></thead><tbody>{summary}</tbody></table></div>{details}<h2>Scope and limits</h2><ul>{''.join('<li>'+e(p)+'</li>' for p in data['limits'])}</ul><h2>References</h2><ul>{''.join('<li><a href="'+e(s['url'])+'">'+e(s['label'])+'</a></li>' for s in data['sources'])}</ul><p class="footer">Original audit text CC BY 4.0 · Software MIT · Historical coverage maps retain their original dates and status.</p></main></body></html>'''
(folder/(slug+'.html')).write_text(html+'\n',encoding='utf-8')
print('Built audit HTML, Markdown and CSV:',dict(counts),dict(types))
