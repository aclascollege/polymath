#!/usr/bin/env node

/**
 * Polymath Data Validator
 * Validates JSON schemas, referential integrity, and prerequisite acyclicity.
 *
 * Usage: node scripts/validate.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = join(__dirname, '..', 'data');
const SCHEMA = join(__dirname, '..', 'schema');

let errors = 0;
let warnings = 0;

function err(msg) { console.error(`  ❌ ${msg}`); errors++; }
function warn(msg) { console.warn(`  ⚠️  ${msg}`); warnings++; }
function ok(msg) { console.log(`  ✅ ${msg}`); }

function loadJSON(path) {
  try { return JSON.parse(readFileSync(path, 'utf-8')); }
  catch (e) { err(`Failed to parse ${path}: ${e.message}`); return null; }
}

// ── Load all data ──────────────────────────────────────
console.log('\n🔬 Polymath Data Validator\n');

const files = ['disciplines','courses','prerequisites','degrees','skills','careers','frameworks','manifest'];
const data = {};
for (const f of files) {
  const d = loadJSON(join(DATA, `${f}.json`));
  if (d) data[f] = d;
}

if (errors > 0) { console.error(`\n❌ Cannot continue: ${errors} parse error(s)\n`); process.exit(1); }

// ── Manifest checks ────────────────────────────────────
console.log('── Manifest ──');
const m = data.manifest;
const expected = {
  disciplines: data.disciplines.disciplineCount,
  courses: data.courses.courseCount,
  prerequisites: data.prerequisites.edgeCount,
  degrees: data.degrees.degreeCount,
  skills: data.skills.skillCount,
  careers: data.careers.careerCount,
  frameworks: data.frameworks.frameworkCount,
};

for (const [key, count] of Object.entries(expected)) {
  if (m.counts[key] !== count) err(`Manifest counts.${key}=${m.counts[key]}, expected ${count}`);
}
if (!Object.keys(expected).some(k => m.counts[k] !== expected[k])) ok('Manifest counts match data files');

// Check SHA-256 for each file
for (const f of files.filter(f => f !== 'manifest')) {
  const path = join(DATA, `${f}.json`);
  const content = readFileSync(path);
  const hash = createHash('sha256').update(content).digest('hex');
  if (m.files[`${f}.json`]?.sha256) {
    if (m.files[`${f}.json`].sha256 !== hash) warn(`SHA-256 mismatch for ${f}.json`);
  }
}

// ── Schema validation ──────────────────────────────────
console.log('\n── Schema Validation ──');

// Quick structural validation (full JSON Schema validation would need a library)
const schemaValidations = {
  disciplines: d => d.disciplines.every(x => /^disc_/.test(x.id) && x.name && x.iscedCode),
  courses: d => d.courses.every(x => /^course_/.test(x.id) && x.name && x.disciplineId && x.credits),
  prerequisites: d => d.prerequisites.every(x => /^course_/.test(x.courseId) && /^course_/.test(x.prerequisiteId) && ['strict','recommended','helpful'].includes(x.strength)),
  degrees: d => d.degrees.every(x => /^degree_/.test(x.id) && x.name && ['associate','bachelor','master','doctorate'].includes(x.level)),
  skills: d => d.skills.every(x => /^skill_/.test(x.id) && x.name && x.category),
  careers: d => d.careers.every(x => /^career_/.test(x.id) && x.title && x.category),
  frameworks: d => d.frameworks.every(x => /^fw_/.test(x.id) && x.name && x.region),
};

for (const [key, validate] of Object.entries(schemaValidations)) {
  if (validate(data[key])) ok(`${key}: all items structurally valid`);
  else err(`${key}: structural validation failed`);
}

// ── Referential integrity ───────────────────────────────
console.log('\n── Referential Integrity ──');

const courseIds = new Set(data.courses.courses.map(c => c.id));
const discIds = new Set(data.disciplines.disciplines.map(d => d.id));
const skillIds = new Set(data.skills.skills.map(s => s.id));
const degreeIds = new Set(data.degrees.degrees.map(d => d.id));
const careerIds = new Set(data.careers.careers.map(c => c.id));

// Course → Discipline
for (const c of data.courses.courses) {
  if (!discIds.has(c.disciplineId)) err(`Course ${c.id} references unknown discipline ${c.disciplineId}`);
  if (c.crossDisciplineIds) for (const did of c.crossDisciplineIds)
    if (!discIds.has(did)) err(`Course ${c.id} cross-references unknown discipline ${did}`);
}

// Prerequisites → Courses
for (const p of data.prerequisites.prerequisites) {
  if (!courseIds.has(p.courseId)) err(`Prereq edge references unknown course ${p.courseId}`);
  if (!courseIds.has(p.prerequisiteId)) err(`Prereq edge references unknown prerequisite ${p.prerequisiteId}`);
}

// Course → Skills
for (const c of data.courses.courses) {
  if (c.skills) for (const sid of c.skills)
    if (!skillIds.has(sid)) err(`Course ${c.id} references unknown skill ${sid}`);
}

// Course → Careers
for (const c of data.courses.courses) {
  if (c.careerPaths) for (const cid of c.careerPaths)
    if (!careerIds.has(cid)) err(`Course ${c.id} references unknown career ${cid}`);
}

// Degree → Courses
for (const d of data.degrees.degrees) {
  if (!discIds.has(d.disciplineId)) err(`Degree ${d.id} references unknown discipline ${d.disciplineId}`);
  if (d.coreCourseIds) for (const cid of d.coreCourseIds)
    if (!courseIds.has(cid)) err(`Degree ${d.id} references unknown core course ${cid}`);
  if (d.electiveCourseIds) for (const cid of d.electiveCourseIds)
    if (!courseIds.has(cid)) warn(`Degree ${d.id} references unknown elective course ${cid}`);
}

// Careers → Skills
for (const c of data.careers.careers) {
  if (c.requiredSkillIds) for (const sid of c.requiredSkillIds)
    if (!skillIds.has(sid)) err(`Career ${c.id} references unknown skill ${sid}`);
}

if (errors === 0) ok('All referential integrity checks passed');

// ── Prerequisite acyclicity ─────────────────────────────
console.log('\n── Prerequisite Graph ──');

function hasCycle() {
  const adj = new Map();
  const indegree = new Map();
  for (const cid of courseIds) { adj.set(cid, []); indegree.set(cid, 0); }
  for (const p of data.prerequisites.prerequisites) {
    adj.get(p.prerequisiteId).push(p.courseId);
    indegree.set(p.courseId, (indegree.get(p.courseId)||0) + 1);
  }
  const queue = []; let visited = 0;
  for (const [cid, deg] of indegree) if (deg === 0) queue.push(cid);
  while (queue.length) {
    const id = queue.shift(); visited++;
    for (const next of adj.get(id)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }
  return visited !== courseIds.size;
}

if (hasCycle()) err('Prerequisite graph contains cycles!');
else ok('Prerequisite graph is acyclic (DAG)');

// Also check isolated nodes
const inGraph = new Set();
for (const p of data.prerequisites.prerequisites) {
  inGraph.add(p.courseId);
  inGraph.add(p.prerequisiteId);
}
const orphaned = [...courseIds].filter(id => !inGraph.has(id));
if (orphaned.length > 0) warn(`${orphaned.length} courses have no prerequisites (isolated nodes): ${orphaned.slice(0,5).join(', ')}${orphaned.length>5?`...` : ''}`);
else ok('All courses connected to prerequisite graph');

// ── Credit consistency ──────────────────────────────────
console.log('\n── Credit Consistency ──');

for (const c of data.courses.courses) {
  if (!c.credits.us || c.credits.us <= 0) warn(`Course ${c.id} has invalid US credits: ${c.credits.us}`);
  if (!c.credits.ects || c.credits.ects <= 0) warn(`Course ${c.id} has invalid ECTS: ${c.credits.ects}`);
}

for (const d of data.degrees.degrees) {
  if (d.totalCredits?.us && d.totalCredits.us > 0) {
    const coreCredits = (d.coreCourseIds||[]).reduce((sum, cid) => {
      const c = data.courses.courses.find(x => x.id === cid);
      return sum + (c?.credits?.us || 0);
    }, 0);
    if (coreCredits > d.totalCredits.us) warn(`Degree ${d.id}: core course credits (${coreCredits}) exceed total (${d.totalCredits.us})`);
  }
}
ok('Credit consistency checks complete');

// ── Summary ─────────────────────────────────────────────
console.log(`\n${'='.repeat(50)}`);
console.log(`  Errors:   ${errors}`);
console.log(`  Warnings: ${warnings}`);
console.log(`${'='.repeat(50)}\n`);

process.exit(errors > 0 ? 1 : 0);
