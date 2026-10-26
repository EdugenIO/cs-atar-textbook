"""Generate the common, bounded Pygame programming assessment resources."""
import json
from pathlib import Path

def build_game_resources(root,write,csvtext):
 data=json.loads((root/'assessment-source/game-projects.json').read_text(encoding='utf-8'))
 cat=json.loads((root/'assessment-source/catalogue.json').read_text(encoding='utf-8'))
 packs={}
 write('games/asset-policy.md','''# Game assets and AI use

Decorative graphics, backgrounds, audio and non-assessed flavour text may be original, AI-generated or replaced entirely with pygame.draw rectangles/circles/lines and font-rendered text. All routes can earn full marks. Art quality, animation, audio production, paid assets and extra mechanics do not earn additional marks.

Keep collision geometry and assessed behaviour identical when changing skins. Supply a shapes/text fallback so missing decorative files cannot prevent play. Optional sound must have a mute option or may be omitted entirely. Test the game without audio and without colour-only signals.

Record asset filename, purpose, creator/tool, source or prompt summary, date, permission/terms checked, edits and whether it is assessed. Generating an asset does not automatically establish all third-party rights. Avoid identifiable student images, real personal data or private uploads. A primitive made in the student's own code can be logged as original.

Permission to generate assets does not decide whether AI may write assessed game logic, algorithms, tests or explanations. The teacher must state those assistance rules under school policy before issue. Keep source/assistance records and evidence of individual understanding. Do not present supplied or generated logic as independently authored work.
''')
 write('games/asset-log.csv',csvtext([['Filename / primitive','Purpose','Creator / AI tool','URL or prompt summary','Date','Terms / permission checked','Edits','Assessed or decorative','Fallback']] ))
 audit='''# Programming-project scope audit and revision

Reviewed 26 October 2026 for the 2027 program. Original editorial review, not SCSA approval or evidence from a classroom trial.

## Findings and changes
| Finding | Revision |
|---|---|
| Queue/habitat experiments, timetable optimisation and warehouse/VR replay contexts implied different domain and implementation demands. | Replace the ten Task 1 choices with five cosmetic game themes per year and one binding contract per year. |
| Optional console/GUI/web delivery made projects hard to compare. | Require a small interactive Python/Pygame game; document this as the teacher's context choice, not a syllabus GUI mandate. |
| Requirements lacked measurable quality checks and consistent acceptance evidence. | Add FR/NFR IDs, common fixtures, explicit outcomes and one year-level marking guide shared by all themes. |
| Year-level distinctions were broad and allowed inappropriate scope growth. | Year 11 uses functions, a one-dimensional list and score-file processing. Year 12 adds two small tile maps, dictionary use and a small inherited actor hierarchy; a bounded search/sort task supplies algorithm evidence. |
| Asset creation could dominate class time or make hardware/art access affect marks. | Permit AI decorative assets or primitives equally, require a fallback, and allocate no marks to visual polish. |
| Pygame foundations were absent from the stated prerequisites. | Require prior event/draw/timing/collision teaching and a launchable display-only shell before issue. Retain the 10/12 workshop budgets; re-plan before release if preparation is missing. |

## Syllabus references and limits
Year 11 current syllabus, printed pp. 8–11: programming structures, functions, one-dimensional arrays, file processing and testing; pp. 20–22: assessment. Year 12 syllabus for teaching from 2027, printed pp. 8–13: data/algorithms, testing and OOP; pp. 21–23: assessment. The game contracts identify the project evidence selected from those areas. NFR response targets, map sizes and game rules are original task-design choices, not SCSA numerical requirements. The GUI is a chosen context; the syllabus does not require one. Other content remains sampled elsewhere in the assessment outline.

This audit reviews assessment Task 1 for both years. Textbook club-order examples and their lesson slides remain ungraded practice contexts, not these game task briefs. Task 6 remains a database project; standard tests and exams retain one blueprint per slot. Annual category weights and task splits are preserved.

## Outstanding release checks
Independently moderate the item-level guide, trial the workload with the class prerequisites, benchmark the response target on the named school PC and check current syllabus/WACE/school conditions before issue. No classroom timing, actual performance or complete annual bullet-by-bullet compliance sign-off is claimed.

Sources:
'''+f"\n- Year 11 syllabus: {cat['sources']['y11']}\n- Year 12 2027 syllabus: {cat['sources']['y12']}\n- Current course page: {cat['sources']['course']}\n- Pygame APIs: {cat['sources']['pygame']}\n"
 write('games/scope-audit-2027.md',audit)
 for y in data['years']:
  yr=y['year'];base=f'games/year{yr}'; task=next(x for x in cat['years'] if x['year']==yr)['tasks'][0]
  intro=f"# {y['title']}\n\nProgramming project Task 1 · {task['weight']}% of annual school mark · 2027 draft · reviewed {data['reviewed']}.\n\nAll five themes use this contract and the same marking guide. Choose the setting and design a usable presentation; retain the shared rules, fixtures and assessed behaviour. This is original assessment planning for teacher moderation, not an official SCSA task.\n\n## Scope and preparation\n\n{y['scope']}\n\n{y['prerequisites']}\n\nWorkshop allocation ({y['budget']} lessons): {y['schedule'][0]}. Checkpoints belong to this one project, not extra weighted tasks. A complete shapes/text version is sufficient.\n"
  contract=intro
  for title,items in [('Functional requirements',y['functional']),('Non-functional requirements',y['nonFunctional'])]:
   contract+='\n## '+title+'\n\n'
   for r in items:contract+=f"### {r['id']}\n{r['text']}\n\nAcceptance evidence: {r['acceptance']}\n\nCurriculum connection: {r['mapping']}.\n\n"
  contract+='## Scope ceiling\n\n'+'\n'.join('- '+x for x in y['excluded'])
  contract+='\n\n## Design decisions left to the student\n\nChoose the layout of menus/HUD, names and interfaces of functions/classes, collision implementation, representation of collected state, feedback wording and theme assets. Justify these decisions. Do not replace the core rules with a larger game or add mechanics to gain marks. Use the deterministic fixture mode for comparison even if you also design a small alternative layout.\n\n## Submission\n\nSubmit code, resource files, launch README, requirement-linked design/pseudocode, schedule, test log, peer trial, evaluation/retrospective and source/AI-asset log. Declare supplied code and all permitted assistance. The supplied display shell is infrastructure; it does not evidence student movement, collisions, scoring, timers, data algorithms or game-state logic.\n\nThe teacher issues the final dates, permitted code assistance and access arrangements, then moderates the common guide. School release review and workload trial remain outstanding. Read asset-policy.md and the year-level marking guide.\n'
  write(base+'-requirements.md',contract)
  rubric=f"# Year {yr} common game marking guide\n\nTask 1 · raw total 100 · contributes {task['weight']}% to the annual school mark. Apply identically to all five themes. Original draft for moderation.\n\n"
  for criterion in y['rubric']:
   rubric+=f"## {criterion['name']} ({criterion['marks']})\n\n| Item | Marks | Observable evidence |\n|---|---:|---|\n"
   for item in criterion['items']:rubric+=f"| {item['id']} | {item['marks']} | {item['description']} |\n"
  rubric+='\n## Applying the guide\n\nFor each item allocate marks in proportion to demonstrated accurate/relevant evidence, from zero for no relevant evidence to the full item mark for complete, correct evidence; record the reason for partial credit. Moderate example evidence and item boundaries before issue. Avoid double-counting a single feature across implementation items. Testing/evaluation marks assess evidence and reasoning, not simply whether the product works.\n\nNo bonus marks for extra levels, mechanics, AI artwork, animation, paid assets or audio production. A primitive-shape submission has the same maximum. A function/class count alone earns no marks; judge responsibilities and behaviour. Assess Year 11 data evidence under FR7–FR8 and Year 12 data/OOP evidence under FR7–FR10. Use NFR checks for quality rather than aesthetic taste.\n\nAttach the final teacher-approved interpretation to the issued task; raw percentage thresholds are not automatic syllabus grades.\n'
  write(base+'-marking-guide.md',rubric)
  cases=[['Test ID','Requirement','Setup / action','Expected'],['G01','FR1','Pause for 95 wall-clock seconds','Active-play timer and positions unchanged'],['G02','FR1','Restart after collecting and taking a hit','Score 0, lives 3, timer 90 and original objects'],['G03','FR2','Move outward at each boundary','No out-of-bounds position'],['G04','FR3','Collect one item then overlap its former position','Score 10; second overlap adds nothing'],['G05','FR4','Hazard collisions at ticks 1000,1500,2000','Lives 2,2,1 with 1000 ms protection'],['G06','FR5','Exit and final item with time reaching zero','Loss takes precedence'],['G07','NFR5','Launch from a different working directory; remove decoration','Relative resources resolve; shapes/text game works'],['G08','NFR3','Pause key five times on declared reference PC','Visible pause within 250 ms; record actual observations']]
  if yr==11:cases += [['Y11-01','FR8','History [20,0,50,50]','Count 4, total 120, first maximum index 2'],['Y11-02','FR8','Missing or empty history','Clear empty history; game still playable'],['Y11-03','FR8','Scores text: 20, bad, -1, 50','Warn and retain valid scores [20,50]'],['Y11-04','FR9','Normal then challenge menu selection','1000 ms then 750 ms hazard interval']]
  else:cases += [['Y12-01','FR7','Complete map 1 normally','Map 2 starts with fresh 90 seconds; lives/score retained'],['Y12-02','FR7','Attempt wall and outside-map moves','Position unchanged'],['Y12-03','FR7/FR10','Bad dimensions, tile 9 or duplicate start','Useful error; invalid map does not start'],['Y12-04','FR9','Search [A,B,C] for B and Z','Index 1; documented not-found result'],['Y12-05','FR9','Sort [30,10,20,10], [], [20]','[10,10,20,30], [], [20]'],['Y12-06','FR7','Change map 1 in a test copy','Map 2 remains unchanged']]
  write(base+'-acceptance.csv',csvtext(cases))
  mapping=f'# Year {yr} game evidence map\n\nOriginal project-level allocation, not a complete course audit.\n\n| Evidence | Syllabus location | Contract | Marking |\n|---|---|---|---|\n'
  if yr==11:
   mapping+='| Functions, control/data structures | Unit 1, printed pp. 8–10 | FR1–FR7, FR9 | D1, D3, C1–C4 |\n| One-dimensional array processing | Unit 1, pp. 9–10 | FR7–FR8 | D2, C4, T1 |\n| Sequential text files and error responses | Unit 1, p. 11 | FR8 | C5, T2 |\n| Development, testing and evaluation | Unit 1, pp. 9–11 | All FR; NFR1–NFR7 | I1–I3, T1–T3, E1–E3 |\n'
  else:
   mapping+='| Control/data structures, dictionaries | Unit 3, pp. 8–9 | FR1–FR7, FR9 | D2, C1–C4 |\n| Development and common algorithms | Unit 3, pp. 9–11 | FR9–FR10 | I1–I3, D3, C4–C5 |\n| OOP and inheritance | Unit 3, p. 12 | FR8 | D1, C4, T1 |\n| Testing, debugging and validation | Unit 3, pp. 11–12 | All FR; NFR1–NFR7 | T1–T3 |\n| Development issues and evaluation | Unit 3, pp. 9–10,13 | NFR6–NFR7; evaluation | E1–E3 |\n'
  mapping+='\nMap sizes, rules and numerical quality thresholds are local design choices. Remaining syllabus knowledge/skills, including other algorithms and networking, need sampling elsewhere. Asset quality is outside this task’s mark.\n'
  write(base+'-syllabus-map.md',mapping)
  shell='''"""Display-only Pygame infrastructure. No assessed game behaviour is implemented.
Run: python display_shell.py. Run headless infrastructure check: --smoke.
"""
from pathlib import Path
import json
import sys
import pygame

def main():
    folder = Path(__file__).resolve().parent
    theme = json.loads((folder / "theme.json").read_text(encoding="utf-8"))
    pygame.init()
    screen = pygame.display.set_mode((800, 600))
    pygame.display.set_caption(theme["title"] + " - display shell")
    font = pygame.font.Font(None, 28)
    clock = pygame.time.Clock()
    frames = 0
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                running = False
        screen.fill((20, 35, 45))
        pygame.draw.rect(screen, (240, 210, 90), (60, 160, 32, 32), 2)
        pygame.draw.circle(screen, (90, 210, 180), (150, 176), 16, 2)
        screen.blit(font.render(theme["title"], True, (255, 255, 255)), (40, 40))
        screen.blit(font.render("Display shell only. Implement your game separately.", True, (255, 255, 255)), (40, 90))
        pygame.display.flip()
        clock.tick(60)
        frames += 1
        if "--smoke" in sys.argv and frames >= 3:
            running = False
    pygame.quit()

if __name__ == "__main__":
    main()
'''
  todo='''"""Unfinished suggested interfaces. Adapt your design and implement your own code.
The display shell supplies only infrastructure. These stubs deliberately fail.
"""
def new_run(difficulty):
    raise NotImplementedError("Design/reset state")
def update_game(state, commands, active_elapsed_ms):
    raise NotImplementedError("Movement, collisions, scoring and terminal rules")
def read_history(path):
    raise NotImplementedError("Read/validate scores with the documented policy")
def save_result(path, score):
    raise NotImplementedError("Append once and report failures")
def run_game():
    raise NotImplementedError("Implement the interactive game")

'''
  if yr==12:todo+='''
class Actor:
    def move(self, row_delta, column_delta, tiles):
        raise NotImplementedError("Shared bounds/wall behaviour")
class Player(Actor):
    def update(self, commands, elapsed_ms, tiles):
        raise NotImplementedError("Player update")
class Hazard(Actor):
    def update(self, commands, elapsed_ms, tiles):
        raise NotImplementedError("Predictable patrol update")
def find_item(items, item_id):
    raise NotImplementedError("Student-written linear search")
def order_scores(scores):
    raise NotImplementedError("Student-written taught sorting algorithm")
'''
  todo+='\nif __name__ == "__main__":\n    run_game()\n'
  for op in task['options']:
   key=f"y{yr}-t1-{op['id']}"
   files={'display_shell.py':shell,'student_game.py':todo,'theme.json':json.dumps({'title':op['title'],'setting':op['pitch']},indent=2)+'\n','acceptance-cases.csv':csvtext(cases),'history-valid.txt':'20\n0\n50\n50\n','history-invalid.txt':'20\nbad\n-1\n50\n','requirements.txt':'pygame==2.6.1\n'}
   files['setup.md']='''# Setup and ownership
Use the school-approved Python 3 environment. The requirements file records the proposed Pygame version; teacher/IT must validate compatibility and the school installation before issue. Do not install software during a controlled assessment.
Run display_shell.py to check the window, event loop, primitives and font. It is not a working game. student_game.py raises NotImplementedError until implemented. Mark supplied infrastructure in the source log; do not claim it as assessed work. Use the common requirements, marking guide, fixtures and scope ceiling. No external images or audio are needed.
'''
   files['runtime-config.json']=json.dumps({'window':[800,600],'lives':3,'seconds_per_map':90,'points_per_item':10,'collectibles_per_map':5,'hazards_per_map':3,'hit_protection_ms':1000},indent=2)+'\n'
   if yr==11:
    files['arena.csv']=csvtext([['kind','id','x','y','width','height'],['start','P',40,60,24,24],['exit','E',720,500,40,40],*[["item",f'I{i+1}',x,y,20,20] for i,(x,y) in enumerate([(140,120),(280,160),(460,220),(580,340),(240,440)])],*[["hazard",f'H{i+1}',x,y,24,24] for i,(x,y) in enumerate([(180,280),(400,380),(600,160)])]])
    files['patrols.csv']=csvtext([['hazard_id','axis','minimum','maximum','normal_interval_ms','challenge_interval_ms'],['H1','x',180,260,1000,750],['H2','x',400,480,1000,750],['H3','x',600,680,1000,750]])
    files['fixture-rules.md']='# Fixture conventions\nAll positions are top-left pixels. Start (40,60) is safe. On each patrol tick move 20 pixels in the current direction, reversing before crossing the configured endpoints. Use 1000/750 ms according to difficulty. Player movement speed is a student design constant; validate boundaries for the player rectangle. A fully deterministic test may supply movement commands directly to the state-update function.'
   else:
    for n in [1,2]:
     grid=[[1 if r in (0,7) or c in (0,9) else 0 for c in range(10)] for r in range(8)]
     grid[1][1]=2;grid[6][8]=3;grid[3][4 if n==1 else 5]=1
     files[f'map{n}.csv']=csvtext(grid)
    files['entities.csv']=csvtext([['map','kind','id','row','column'],*[[m,'item',f'M{m}I{i+1}',r,c] for m in [1,2] for i,(r,c) in enumerate([(1,3),(2,7),(4,2),(5,6),(6,4)])],*[[m,'hazard',f'M{m}H{i+1}',r,c] for m in [1,2] for i,(r,c) in enumerate([(2,2),(4,6),(5,3)])]])
    files['fixture-rules.md']='# Fixture conventions\nTile positions are zero-based row/column indices. Use 40-pixel tiles, offset at (40,100) in the 800x600 window. Player moves one cell per directional KEYDOWN. Hazards patrol one adjacent column cell per 1000 active ms, reversing at a wall or map edge; no pathfinding. Each map has independent entity instances. Load item metadata into a dictionary keyed by ID. Validate map dimensions/codes and start/exit counts. Use the shared runtime configuration and loss-before-completion rule.'
   files['asset-policy.md']=(root/'dist/assessments/games/asset-policy.md').read_text(encoding='utf-8')
   files['asset-log.csv']=(root/'dist/assessments/games/asset-log.csv').read_text(encoding='utf-8')
   files['common-requirements.md']=contract;files['common-marking-guide.md']=rubric;files['syllabus-map.md']=mapping
   packs[key]=files
 return packs
