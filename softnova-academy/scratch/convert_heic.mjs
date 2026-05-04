import heicConvert from 'heic-convert';
import { readFileSync, writeFileSync } from 'fs';

const inputBuffer = readFileSync('./public/Images/about/dharshika.heic');
const outputBuffer = await heicConvert({
  buffer: inputBuffer,
  format: 'JPEG',
  quality: 0.92
});

writeFileSync('./public/Images/about/dharshika.jpg', outputBuffer);
console.log('✅ dharshika.heic converted to dharshika.jpg successfully!');
