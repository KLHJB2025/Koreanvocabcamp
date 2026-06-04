const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

let cleanedContent = fileContent
    .replace('/* eslint-disable @typescript-eslint/no-explicit-any */', '')
    .replace('export interface Word {', '')
    .replace('    kr: string;', '')
    .replace('    en: string;', '')
    .replace('    zh: string;', '')
    .replace('    pos: string;', '')
    .replace('    sentenceKr?: string;', '')
    .replace('    sentenceMeaning?: string;', '')
    .replace('    sentenceZh?: string;', '')
    .replace('    illustrationUrl?: string;', '')
    .replace('    animationData?: any;', '')
    .replace('    animationUrl?: string;', '')
    .replace('    category?: string;', '')
    .replace('}', '')
    .replace('export const MOCK_VOCABULARY: Record<string, Word[]> = ', 'module.exports = ')
    .replace(/export /g, '');

const tempFile = path.join(__dirname, 'temp_vocab_view.js');
fs.writeFileSync(tempFile, cleanedContent, 'utf8');
const vocabulary = require('./temp_vocab_view.js');
fs.unlinkSync(tempFile);

console.log("beginner_cycle_9 first 5 items:");
console.log(JSON.stringify(vocabulary.beginner_cycle_9.slice(0, 5), null, 2));

console.log("beginner_cycle_13 first 5 items:");
console.log(JSON.stringify(vocabulary.beginner_cycle_13.slice(0, 5), null, 2));
