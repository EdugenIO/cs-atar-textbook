"""Independent finite-domain, arithmetic and relational oracles; no answer-file oracle."""
from pathlib import Path
from collections import Counter
from contextlib import redirect_stdout
from decimal import Decimal, ROUND_HALF_UP
import ast,contextlib,html,io,itertools,json,math,os,re,runpy,sqlite3,subprocess,tempfile
ROOT=Path(__file__).resolve().parents[1];D=ROOT/'dist'
content=json.loads(subprocess.check_output(['node',str(ROOT/'tests/helpers/technical-content.mjs')],cwd=ROOT))
chapters={c['id']:c for c in content['chapters']}
counts=Counter()
def check(condition,label):
 assert condition,label
 counts[label.split(':')[0]]+=1

def load(name):
 with redirect_stdout(io.StringIO()):return runpy.run_path(str(D/name),run_name='technical_audit')

def execute(code,inputs=()):
 values=iter(inputs);stream=io.StringIO();namespace={'__name__':'__main__','input':lambda prompt='':next(values)}
 with redirect_stdout(stream):exec(compile(code,'<chapter>','exec'),namespace)
 return stream.getvalue(),namespace

# Actual chapter listings, including user input, file append and empty-file behaviour.
cases={'start':(['6'],'Total: $18\n'),'values':([],'Full bags: 4\nRemaining badges: 1\n'),'representation':([],'65\n0b1000001\n0x41\nA\n'),'loops':(['5','7','3'],'Total donations: $15\n'),'functions':(['4'],'Total: $12\n'),'arrays':([],'Total: 57\nFirst maximum index: 2\nMaximum value: 19\n'),'files':(['bad','-1','0'],'Enter a whole number.\nQuantity cannot be negative.\nQuantity saved.\n')}
with tempfile.TemporaryDirectory(dir=ROOT) as tmp:
 previous=Path.cwd();os.chdir(tmp)
 try:
  for name,c in chapters.items():
   if not c.get('code'):continue
   ast.parse(c['code']);ast.parse(c['solution']);check(True,'chapter-listings: '+name)
   if name in cases:
    inputs,want=cases[name];actual,_=execute(c['code'],inputs);check(actual==want,'chapter-output: '+name)
   else:execute(c['code']);check(True,'chapter-output: '+name)
  check(Path('quantities.txt').read_text()=='0\n','chapter-files: valid append only')
  for records,want in [('2\n0\n5\n','Total: 7\n'),('','Total: 0\n')]:
   Path('quantities.txt').write_text(records);check(execute(chapters['files']['solution'])[0]==want,'chapter-files: total and empty')
 finally:os.chdir(previous)

# The special selection chapter has a separate downloadable worked listing.
for amount,charge in [(49.99,5),(50,0),(50.01,0)]:
 actual,_=execute((D/'resources/examples/selection.py').read_text(),[str(amount)])
 check(actual==f"Delivery charge: ${charge:.2f}\n",'selection-boundary: below/at/above')

# Search/sort expectations come from membership/index/sorted, including all small lists.
search=load('unit3-search-solution.py');sorts=load('unit3-sort-solution.py')
for length in range(7):
 for values in itertools.product([-1,0,1],repeat=length):
  original=list(values)
  for name in ['bubble_sort','insertion_sort','selection_sort']:
   work=original[:];n=sorts[name](work);check(work==sorted(original),'sort-oracle: '+name);check(type(n) is int and n>=0,'sort-count: '+name)
  for target in [-2,-1,0,1,2]:
   want=original.index(target) if target in original else None
   check(search['linear_search'](original,target)==want,'linear-oracle: first occurrence')
   ordered=sorted(original);result=search['binary_search'](ordered,target)
   check((result is None)==(target not in ordered) and (result is None or ordered[result]==target),'binary-oracle: matching occurrence')
for n in [0,1,2,8,16,32,1024]:
 ordered=list(range(n));worst=0
 for target in range(-1,n+1):
  result,probes=search['probe_count'](ordered,target,True);worst=max(worst,probes)
 check(worst==(n.bit_length() if n else 0),'explained-probes: binary worst case')
 check(search['probe_count'](ordered,n)[1]==n,'explained-probes: linear worst case')
 if n<=32:
  for name in ['bubble_sort','insertion_sort','selection_sort']:
   check(sorts[name](list(range(n-1,-1,-1)))==n*(n-1)//2,'explained-comparisons: reverse')
  check(sorts['bubble_sort'](ordered[:])==max(0,n-1),'explained-comparisons: sorted bubble')
  check(sorts['insertion_sort'](ordered[:])==max(0,n-1),'explained-comparisons: sorted insertion')
check(search['probe_count']([101,104,108,112,117,123,130],117,True)==(4,3),'explained-trace: seven IDs')
# Stable labelled-record reference, nonmutation and rectangular-grid contracts.
consolidation=load('unit3-consolidation-solution.py');grid=load('unit3-structures-solution.py')
for n in range(7):
 records=[(str(i),i%3) for i in range(n)];copy=records[:]
 check(consolidation['insertion_quantity'](records)==sorted(records,key=lambda r:r[1]) and records==copy,'stable-sort: labelled records')
for rows in range(5):
 for columns in range(5):
  data=grid['make_grid'](rows,columns)
  if rows and columns:data[0][0]=7
  check(all(data[r][c]==(7 if (r,c)==(0,0) else 0) for r in range(rows) for c in range(columns)),'grid: independent rows')
  snapshot=[row[:] for row in data]
  check(grid['row_totals'](data)==list(map(sum,data)),'grid: row totals')
  check(grid['day_totals'](data)==[sum(col) for col in zip(*data)] and data==snapshot,'grid: column totals without mutation')
# Stock invariants under successful/failed lending, returns and subclass boundaries.
oo=load('unit3-inheritance-solution.py')
for total in range(5):
 for requests in itertools.product([1,2,5],repeat=3):
  item=oo['Equipment']('E','Demo',total);available=total
  for amount in requests:
   expected=amount<=available;check(item.lend(amount)==expected,'stock: lend result');available-=amount if expected else 0
   check(item.available()==available,'stock: conserved available')
  for amount in requests:
   expected=amount<=total-available;check(item.return_units(amount)==expected,'stock: return result');available+=amount if expected else 0
   check(item.available()==available,'stock: return invariant')
check(oo['Camera']('C','Camera',1,19).preparation()=='Charge the camera','object-boundary: 19')
check(oo['Camera']('C','Camera',1,20).preparation()=='Check the lens','object-boundary: 20')
check(oo['Projector']('P','Projector',1,999).preparation()=='Check the ventilation','object-boundary: 999')
check(oo['Projector']('P','Projector',1,1000).preparation()=='Arrange a projector check','object-boundary: 1000')

# Independent integer masks, not ipaddress (which the teaching calculator uses).
net=load('unit3-addressing-calculator.py');sizes=load('unit3-network-sizing.py');secure=load('unit3-secure-networks-model.py')
def dotted(n):return '.'.join(str((n>>shift)&255) for shift in [24,16,8,0])
for prefix in range(31):
 mask=((1<<32)-1)^((1<<(32-prefix))-1)
 for address in [0,1,0xC0A83246,0xC0000261,0xFFFFFFFF]:
  result=net['lan_details'](dotted(address)+'/'+str(prefix));network=address&mask;broadcast=network|((1<<(32-prefix))-1)
  check(result==dict(network=dotted(network),prefix=prefix,mask=dotted(mask),broadcast=dotted(broadcast),first_host=dotted(network+1),last_host=dotted(broadcast-1),total_addresses=1<<(32-prefix),usable_hosts=(1<<(32-prefix))-2),'subnet-oracle: mask and bounds')
for count in [1,2,3,6,7,14,15,30,31,51,62,63,126,127,254,255,510,511,1022,2**32-2]:
 p=net['smallest_lan_prefix'](count)
 check(2**(32-p)-2>=count and (p==30 or 2**(31-p)-2<count),'subnet-oracle: minimal host capacity')
for gateway,want in [('192.168.50.64',False),('192.168.50.65',True),('192.168.50.70',False),('192.168.50.94',True),('192.168.50.95',False),('192.168.50.1',False)]:check(net['gateway_valid']('192.168.50.70/27',gateway)==want,'gateway-oracle: ordinary LAN')
for protocol,header in [('TCP',20),('UDP',8)]:
 for payload in [0,1,6,18,160,1460 if protocol=='TCP' else 1472]:
  got=sizes['packet_sizes'](payload,protocol);ip=20+header+payload;frame=18+max(46,ip)
  check(got==dict(transport_bytes=header+payload,ip_bytes=ip,padding_bytes=max(0,46-ip),frame_bytes=frame,frame_bits=8*frame),'packet-oracle: headers, padding and bits')
 try:sizes['packet_sizes'](1461 if protocol=='TCP' else 1473,protocol)
 except ValueError:check(True,'packet-oracle: MTU rejection')
 else:raise AssertionError('MTU overflow accepted')
for clients,rate,link in [(20,8,100),(1,0,100),(12,5,60),(12,5,59)]:
 got=secure['capacity'](clients,rate,link);check(got['demand_mbps']==clients*rate and got['fits_capacity']==(clients*rate<=link) and got['ideal_equal_share_mbps']==link/clients,'capacity-oracle: demand/share')
check(secure['ideal_seconds'](400,100)==32,'transfer-oracle: MB to Mbit')
check(int('00101101',2)==45 and int('00111010',2)==58 and int('A6',16)==166 and 'ABé'.encode('utf8')==bytes.fromhex('41 42 C3 A9'),'representation-oracle: binary/hex/UTF8')

# SQL oracles are Python joins/counts at explicit grain, not expected-results JSON.
queries=json.loads((D/'unit4-sql-queries.json').read_text());db=sqlite3.connect(':memory:');db.executescript((D/'unit4-design-schema.sql').read_text())
def reports():
 def rows(table):return [dict(zip([d[0] for d in cur.description],r)) for cur in [db.execute('SELECT * FROM '+table)] for r in cur]
 sessions={r['SessionID']:r for r in rows('Session')};members={r['MemberID']:r for r in rows('Member')};workshops={r['WorkshopID']:r for r in rows('Workshop')};bookings=sorted(rows('Booking'),key=lambda r:(r['SessionID'],r['MemberID']));attendance={(r['MemberID'],r['SessionID']):r['Present'] for r in rows('Attendance')};number=Counter(b['SessionID'] for b in bookings);capacities=[r['Capacity'] for r in sessions.values()]
 want={}
 want['Q1']=[[b['MemberID'],members[b['MemberID']]['DisplayName'],b['SessionID'],workshops[sessions[b['SessionID']]['WorkshopID']]['Title'],sessions[b['SessionID']]['SessionDate']] for b in bookings]
 want['Q2']=[[len(capacities),sum(capacities) if capacities else None,sum(capacities)/len(capacities) if capacities else None,min(capacities) if capacities else None,max(capacities) if capacities else None]]
 want['Q3']=[[sid,number[sid]] for sid in sorted(sessions) if number[sid]]
 want['Q4']=[[sid,number[sid]] for sid in sorted(sessions)]
 want['Q5']=[[sid,sessions[sid]['Capacity'],number[sid],sessions[sid]['Capacity']-number[sid],float((Decimal(100)*number[sid]/sessions[sid]['Capacity']).quantize(Decimal('.1'),rounding=ROUND_HALF_UP))] for sid in sorted(sessions)]
 want['Q6']=[[b['MemberID'],b['SessionID'],members[b['MemberID']]['DisplayName']+' / '+workshops[sessions[b['SessionID']]['WorkshopID']]['Title']] for b in bookings]
 want['Q7']=[[b['MemberID'],b['SessionID'],attendance.get((b['MemberID'],b['SessionID']))] for b in bookings]
 want['Q8']=[[sid,number[sid]] for sid in sorted(sessions) if number[sid]>=2]
 want['Q9']=[[b['MemberID'],b['SessionID']] for b in bookings if attendance.get((b['MemberID'],b['SessionID']))==1]
 want['Q10']=[]
 for sid in sorted(number):
  states=[attendance[(b['MemberID'],b['SessionID'])] for b in bookings if b['SessionID']==sid and (b['MemberID'],b['SessionID']) in attendance]
  want['Q10'].append([sid,number[sid],len(states),sum(states) if states else None])
 for key,q in queries.items():check([list(r) for r in db.execute(q['sql'])]==want[key],'sql-relational-oracle: '+key)
 return want
base=reports();check(base==json.loads((D/'unit4-sql-expected.json').read_text()),'sql-answer-file: independently reconstructed base')
db.executescript("INSERT INTO Member VALUES ('M04','Member A');INSERT INTO Workshop VALUES ('W03','Workshop A');INSERT INTO Session VALUES ('S04','W03','I01','2026-04-11',2);INSERT INTO Booking VALUES ('M03','S03','2026-04-01'),('M02','S02','2026-04-01');INSERT INTO Attendance VALUES ('M01','S02',0),('M02','S02',1);")
reports()
for capacity in [2,3,4,5,7]:db.execute('UPDATE Session SET Capacity=?',(capacity,));reports()
db.executescript('DELETE FROM Attendance;DELETE FROM Booking;DELETE FROM Session;');reports();db.close()

# Demonstrate why mandatory references and booking identity require NOT NULL.
db=sqlite3.connect(':memory:');db.execute('PRAGMA foreign_keys=ON');db.executescript('CREATE TABLE Workshop(WorkshopID INTEGER PRIMARY KEY);INSERT INTO Workshop VALUES(7);CREATE TABLE Weak(BookingID INTEGER PRIMARY KEY,WorkshopID INTEGER REFERENCES Workshop,StudentID INTEGER,UNIQUE(WorkshopID,StudentID));INSERT INTO Weak VALUES(1,NULL,5),(2,7,NULL),(3,7,NULL);')
check(db.execute('SELECT COUNT(*) FROM Weak').fetchone()[0]==3,'constraint-counterexample: NULL bypasses weaker constraints')
db.execute('CREATE TABLE Booking(BookingID INTEGER PRIMARY KEY,WorkshopID INTEGER NOT NULL REFERENCES Workshop,StudentID INTEGER NOT NULL,UNIQUE(WorkshopID,StudentID))');db.execute('INSERT INTO Booking VALUES(1,7,5)')
for row in [(2,7,5),(3,None,5),(4,7,None),(5,999,5)]:
 try:db.execute('INSERT INTO Booking VALUES(?,?,?)',row)
 except sqlite3.IntegrityError:check(True,'constraint-oracle: duplicate/NULL/orphan rejected')
 else:raise AssertionError(('Invalid booking accepted',row))
check(db.execute('SELECT * FROM Booking').fetchall()==[(1,7,5)],'constraint-oracle: original retained')
# Execute the actual formative model SQL against changed/NULL/duplicate fixture rows.
models={q['id']:q for s in content['practiceSets'] for q in s['questions']}
for qid,ddl,want in [
 ('y11-5','CREATE TABLE Loan(LoanID INTEGER,MemberID INTEGER,Returned INTEGER);INSERT INTO Loan VALUES(1,1,0),(2,1,1),(3,2,0),(4,3,NULL);',[(1,),(3,)]),
 ('y11-d7',"CREATE TABLE Book(BookID INTEGER,Title TEXT,Available INTEGER);INSERT INTO Book VALUES(1,'Z',1),(2,'A',1),(3,'B',0),(4,'A',1);",[('A',),('A',),('Z',)]),
 ('y12-6',"CREATE TABLE Member(MemberID INTEGER,Name TEXT);CREATE TABLE Loan(LoanID INTEGER,MemberID INTEGER);INSERT INTO Member VALUES(1,'Same'),(2,'Same'),(3,'None');INSERT INTO Loan VALUES(10,1),(11,1),(12,2);",[('Same',10),('Same',11),('Same',12)]),
 ('y12-d3','CREATE TABLE Booking(BookingID INTEGER,WorkshopID INTEGER,StudentID INTEGER);INSERT INTO Booking VALUES(1,7,1),(2,7,2),(3,8,1);',[(7,2),(8,1)])]:
 con=sqlite3.connect(':memory:');con.executescript(ddl);sql=models[qid]['model'].split(';')[0]+';';got=con.execute(sql).fetchall();check(sorted(got)==sorted(want),'exam-model-oracle: '+qid);con.close()
con=sqlite3.connect(':memory:');con.executescript('CREATE TABLE Workshop(WorkshopID INTEGER,Title TEXT,Capacity INTEGER);INSERT INTO Workshop VALUES(7,"A",3),(8,"B",4);');con.execute(models['y12-d4']['model'].split(';')[0]);check(con.execute('SELECT WorkshopID,Capacity FROM Workshop ORDER BY WorkshopID').fetchall()==[(7,24),(8,4)],'exam-model-oracle: targeted UPDATE')

# Public explanations must retain the constraint distinction established above.
answer=models['y12-10'];check('NOT NULL' in answer['model'] and 'NULL' in answer['mistake'] and 'NOT NULL' in answer['criteria'][1] and 'NOT NULL' in answer['criteria'][2],'published-answer: mandatory booking identity')

# Recalculate the numbers printed in the actual VLSM table, not only the calculator.
section=next(h for title,h in chapters['unit3-addressing']['sections'] if title=='Build and check a variable-length address plan')
blocks=[]
def integer(ip):return sum(int(part)<<(24-8*i) for i,part in enumerate(ip.split('.')))
for row in re.findall(r'<tr[^>]*>(.*?)</tr>',section,re.S):
 cells=[html.unescape(re.sub('<[^>]+>','',v)).strip() for v in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>',row,re.S)]
 if len(cells)!=5 or cells[0] not in ['Media','Staff','Devices','Visitors']:continue
 address,prefix=re.search(r'(\d+\.\d+\.\d+\.\d+)/(\d+)',cells[2]).groups();p=int(prefix);start=integer(address);length=2**(32-p);required=int(re.findall(r'\d+',cells[1])[-1]);usable=int(re.search(r'\((\d+)\)',cells[2]).group(1))
 check(start%length==0 and usable==length-2 and usable>=required and start<=integer(cells[3])<start+length-1 and integer(cells[3])>start and integer(cells[4])==start+length-1,'published-VLSM: alignment/capacity/gateway/broadcast')
 blocks.append((start,start+length-1))
check(len(blocks)==4 and all(b[1]<a[0] for b,a in zip(blocks,blocks[1:])),'published-VLSM: four nonoverlapping blocks')
# Numerical practice answers: derive the trace instead of copying a result file.
_,question,answer=next(row for row in chapters['unit3-sort']['practice'] if row[0]=='TRACE')
actual_lists=[ast.literal_eval(x) for x in re.findall(r'\[[0-9, ]+\]',answer)]
values=ast.literal_eval(re.search(r'\[[0-9, ]+\]',question).group(0));bubble=values[:]
for i in range(3):
 if bubble[i]>bubble[i+1]:bubble[i],bubble[i+1]=bubble[i+1],bubble[i]
insertion=values[:];insertion[:2]=sorted(insertion[:2]);selection=values[:];i=selection.index(min(selection));selection[0],selection[i]=selection[i],selection[0]
check(actual_lists==[bubble,insertion,selection],'published-trace: three first passes')
print(json.dumps({'checks':dict(counts),'total':sum(counts.values())},sort_keys=True))
