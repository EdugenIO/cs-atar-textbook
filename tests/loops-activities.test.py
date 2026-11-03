import json, subprocess, sys, unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'teaching-source/loops-activities.json').read_text(encoding='utf-8'))
OUT = ROOT / 'dist/lessons/loops/activities'

class ActivityEvidence(unittest.TestCase):
    def test_published_reference_results(self):
        for activity in DATA['activities']:
            for case in activity['checks']:
                with self.subTest(activity=activity['id'], code=case['code']):
                    result = subprocess.run([sys.executable, '-I', '-c', case['code']], capture_output=True, text=True, timeout=3)
                    self.assertEqual(result.returncode, 0, result.stderr)
                    self.assertEqual(result.stdout.strip(), case['stdout'])

    def test_editable_student_copy_excludes_guidance_and_answers(self):
        student = (OUT / 'student-activities.md').read_text(encoding='utf-8')
        teacher = (OUT / 'teacher-activities.md').read_text(encoding='utf-8')
        self.assertEqual(len(DATA['activities']), 8)
        self.assertEqual(len({a['id'] for a in DATA['activities']}), 8)
        for activity in DATA['activities']:
            self.assertIn(activity['prompt'], student)
            self.assertIn(activity['code'], student)
            self.assertIn(activity['answer'], teacher)
            self.assertNotIn(activity['answer'], student)
            self.assertNotIn(activity['teacher'], student)

    def test_resource_and_lesson_entry_points(self):
        for filename in ('dist/lessons/loops/index.html', 'dist/resources/index.html', 'dist/lesson-journeys.js'):
            content = (ROOT / filename).read_text(encoding='utf-8')
            self.assertIn('activities/', content)
        self.assertIn('../lessons/loops/activities/', (ROOT / 'dist/resources/index.html').read_text(encoding='utf-8'))

if __name__ == '__main__':
    unittest.main()
