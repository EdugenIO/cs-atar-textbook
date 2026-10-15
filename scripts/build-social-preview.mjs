// Optional artwork rebuild: npm install sharp in your own development environment.
// Keep the editable SVG and the crawler-compatible PNG together.
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const require = createRequire(import.meta.url);
const sharp = process.env.RUNTIME_NODE_MODULES
  ? require(path.join(process.env.RUNTIME_NODE_MODULES, 'sharp'))
  : require('sharp');
await sharp(fileURLToPath(new URL('../dist/social-preview.svg', import.meta.url)))
  .png().toFile(fileURLToPath(new URL('../dist/social-preview-v1.png', import.meta.url)));
console.log('Built 1200 × 630 social preview.');
