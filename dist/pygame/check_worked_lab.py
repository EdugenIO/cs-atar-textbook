"""Meaningful rule, adapter, file-failure and actual Pygame rendering checks."""
from pathlib import Path
import os, sys, tempfile, unittest, subprocess, copy, json
ROOT=Path(__file__).resolve().parent
# Use real Pygame/SDL without requiring a display or audio device in CI.
os.environ['SDL_VIDEODRIVER']='dummy'
os.environ['SDL_AUDIODRIVER']='dummy'
os.environ['PYGAME_HIDE_SUPPORT_PROMPT']='1'
sys.path.insert(0,str(ROOT))
import pygame
import lab_rules as r
from lab_runner import frame, draw
from extension12 import Indicator, Pulse, make_board, find_label, ordered_copy

class Rules(unittest.TestCase):
 def setUp(self):
  self.s=r.new_state();r.command(self.s,'space')
 def test_movement_units_and_bounds(self):
  r.update(self.s,1,250);self.assertEqual(self.s['x'],358);self.assertEqual(self.s['remaining'],19750)
  self.s['x']=615;r.update(self.s,1,20);self.assertEqual(self.s['x'],616)
  self.s['x']=1;r.update(self.s,-1,20);self.assertEqual(self.s['x'],0)
 def test_pause_resume_delta_and_reset(self):
  pause=pygame.event.Event(pygame.KEYDOWN,key=pygame.K_SPACE)
  frame(self.s,[pause],1,100);before=copy.deepcopy(self.s)
  frame(self.s,[],1,95000);self.assertEqual(self.s,before)
  frame(self.s,[pause],1,95000);self.assertEqual(self.s['remaining'],20000)
  frame(self.s,[],0,16);self.assertEqual(self.s['remaining'],19984)
  self.s.update(score=2,active=[False,False],saved=True,mode='finished')
  frame(self.s,[pygame.event.Event(pygame.KEYDOWN,key=pygame.K_r)],1,95000)
  self.assertEqual(self.s,r.new_state())
 def test_edges_match_real_rect(self):
  for x in [55,56,57,79,80,103,104]:
   a=(x,180,24,24);b=(80,180,24,24)
   self.assertEqual(r.overlaps(a,b),pygame.Rect(a).colliderect(pygame.Rect(b)))
 def test_once_only_and_completion(self):
  self.s['x']=80;r.update(self.s,0,1);r.update(self.s,0,1)
  self.assertEqual(self.s['score'],1);self.assertEqual(self.s['active'],[False,True])
  self.s['x']=520;r.update(self.s,0,1);self.assertEqual(self.s['mode'],'finished');self.assertEqual(self.s['score'],2)
 def test_timeout_first(self):
  self.s.update(x=80,remaining=1);r.update(self.s,0,1)
  self.assertEqual(self.s['score'],0);self.assertEqual(self.s['mode'],'finished')
  before=copy.deepcopy(self.s);r.update(self.s,1,100);self.assertEqual(self.s,before)
 def test_fresh_state_and_no_scoring_stage2(self):
  other=r.new_state();self.s['active'][0]=False;self.assertTrue(other['active'][0])
  self.s.update(x=520);frame(self.s,[],0,1,collect=False);self.assertEqual(self.s['score'],0)
 def test_file_validation_append_once_and_failure(self):
  with tempfile.TemporaryDirectory() as folder:
   path=Path(folder)/'scores.txt';self.assertEqual(r.load_history(path),([],[]))
   path.write_text('',encoding='utf-8');self.assertEqual(r.load_history(path),([],[]))
   path.write_text('2\nbad\n0\n5\n2\n',encoding='utf-8');values,warnings=r.load_history(path)
   self.assertEqual(values,[2,0,2]);self.assertEqual(len(warnings),2)
   before=path.read_text();self.assertEqual(r.save_result(self.s,path),'');self.assertEqual(path.read_text(),before)
   self.s.update(mode='finished',score=1);self.assertIn('Not saved',r.save_result(self.s,Path(folder)));self.assertFalse(self.s['saved'])
   self.assertEqual(r.save_result(self.s,path),'Saved one result.');r.save_result(self.s,path)
   self.assertEqual(path.read_text(),before+'1\n')
   r.command(self.s,'reset');self.s.update(mode='finished',score=2);r.save_result(self.s,path)
   self.assertTrue(path.read_text().endswith('1\n2\n'))
 def test_quit_and_invalid_inputs(self):
  before=copy.deepcopy(self.s);running,_=frame(self.s,[pygame.event.Event(pygame.QUIT)],1,200)
  self.assertFalse(running);self.assertEqual(self.s,before)
  with self.assertRaises(ValueError):r.update(self.s,2,0)
  with self.assertRaises(ValueError):r.update(self.s,0,-1)
 def test_year12_independence_overrides_and_algorithms(self):
  a,b=make_board(),make_board();a[0][1]=1;self.assertEqual(a[1],[0,0,0]);self.assertEqual(b,[[0,0,0],[0,0,0]])
  pulse,other=Pulse('p'),Pulse('q');steady=Indicator('s')
  for dt,wanted in [(499,True),(1,False),(1000,False)]:
   pulse.update(dt);steady.update(dt);self.assertEqual(pulse.visible,wanted)
  self.assertTrue(other.visible);self.assertTrue(steady.visible)
  before=(pulse.visible,pulse.elapsed)
  with self.assertRaises(ValueError):pulse.update(-1)
  self.assertEqual((pulse.visible,pulse.elapsed),before)
  changed=Pulse('changed',300)
  for dt,wanted in [(299,True),(1,False),(900,True)]:changed.update(dt);self.assertEqual(changed.visible,wanted)
  self.assertEqual(find_label([pulse,other],'q'),1);self.assertEqual(find_label([pulse],'missing'),-1)
  original=[2,0,2,1];self.assertEqual(ordered_copy(original),[0,1,2,2]);self.assertEqual(original,[2,0,2,1]);self.assertEqual(ordered_copy([]),[])
 def test_faded_adapter_interface_is_usable(self):
  import faded_practice as faded, inspect
  self.assertEqual((faded.WIDTH,faded.HEIGHT,faded.PLAYER_Y,faded.PLAYER_SIZE),(640,360,180,24))
  self.assertEqual((faded.DURATION_MS,faded.SPEED),(15000,160))
  self.assertIn('collect',inspect.signature(faded.update).parameters)
  with self.assertRaises(NotImplementedError):faded.update(faded.new_state(),0,16,collect=True)
 def test_real_pygame_window_draw_and_event_loop(self):
  pygame.init();screen=pygame.display.set_mode((640,360));font=pygame.font.Font(None,24)
  for mode in ['ready','playing','paused','finished']:
   self.s['mode']=mode
   for stage in [2,3,4]:draw(screen,font,self.s,stage,'Test message',[0,1,2])
  # Exercise stage 1's actual event loop with an injected Quit event.
  import stage1_loop
  original=pygame.event.get
  pygame.event.get=lambda:[pygame.event.Event(pygame.QUIT)]
  try:stage1_loop.main()
  finally:pygame.event.get=original;pygame.quit()
  for args in [['lab_runner.py','2'],['lab_runner.py','3'],['lab_runner.py','4'],['stage5_oop.py']]:
   subprocess.run([sys.executable,str(ROOT/args[0]),*args[1:],'--smoke-frames','3'],check=True,timeout=20,capture_output=True)

if __name__=='__main__':unittest.main()
