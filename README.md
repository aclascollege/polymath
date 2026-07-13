# Polymath

<p align="center">
  <img src="media/polymath-wordmark.svg" alt="Polymath" width="480">
</p>

<p align="center">
  <strong>The Open Taxonomy of Global Higher Education</strong><br>
  A structured, multi-dimensional knowledge graph of what the world learns at university.
</p>

<p align="center">
  <a href="https://aclas.college"><img src="https://img.shields.io/badge/by-ACLAS%20College-8b5cf6?style=flat-square" alt="by ACLAS College"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/database-ODbL%201.0-3b82f6?style=flat-square" alt="License: ODbL"></a>
  <a href="LICENSE-CONTENT"><img src="https://img.shields.io/badge/content-CC%20BY--SA%204.0-22c55e?style=flat-square" alt="License: CC BY-SA"></a>
  <img src="https://img.shields.io/badge/version-v0.1--alpha-6366f1?style=flat-square" alt="Version">
</p>

---

> *"A polymath is someone whose knowledge spans a significant number of subjects, known to draw on complex bodies of knowledge to solve specific problems."*

Polymath maps the architecture of higher education — across disciplines, degree levels, credit systems, and career pathways — into a single, open, machine-readable knowledge graph.

## See it

![Constellation graph of global higher education](media/explorer-preview.png)

Every node is a university course, colored by discipline cluster. Every connection is a prerequisite, a credit pathway, or a career link. [Explore it interactively →](https://aclas.college/polymath)

## Why this exists

| Existing data | Polymath |
|---|---|
| Flat course catalogs per institution | Cross-institutional, cross-border knowledge graph |
| Siloed accreditation frameworks | Unified mapping between US Credits, ECTS, UK CATS, and more |
| Degree requirements buried in PDFs | Machine-readable degree pathways with prerequisites |
| Career skills detached from curriculum | Direct links from courses → skills → careers |
| K-12 taxonomies (Marble, etc.) | Built for **higher education** from the ground up |

## What's inside

### 🔭 Six interconnected data dimensions

```
                    ┌──────────────┐
                    │  FRAMEWORKS  │  ← ECTS, US Credits, AQF, NQF...
                    └──────┬───────┘
                           │ governs
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  DEGREES │───▶│  COURSES │───▶│  SKILLS  │
    └──────────┘    └────┬─────┘    └────┬─────┘
           ▲             │               │
           │        prerequisites    leads to
           │             │               │
           │             ▼               ▼
           │      ┌──────────┐    ┌──────────┐
           └──────│DISCIPLINES│    │  CAREERS │
                  └──────────┘    └──────────┘
```

| Entity | Description | Example |
|---|---|---|
| **Disciplines** | Fields of study aligned to ISCED-F 2013 + CIP 2020 | Computer Science, Finance, Cognitive Psychology |
| **Courses** | Standardized university-level courses with credits | CS 201: Data Structures & Algorithms (3 US credits / 6 ECTS) |
| **Prerequisites** | Directed dependency graph between courses | Machine Learning → requires → Linear Algebra |
| **Degrees** | Degree programs with course requirements | B.Sc. Computer Science (120 US credits) |
| **Skills** | Competencies acquired from courses | Python programming, Financial modeling, Critical thinking |
| **Careers** | Professional roles linked to skills and courses | Data Scientist, Financial Analyst, UX Researcher |
| **Frameworks** | Regional qualification and credit systems | Bologna Process, AQF Level 7, US Semester Credit Hours |

### 📊 Current coverage (v0.1-alpha)

| Discipline | Courses | Degrees | Skills |
|---|---|---|---|
| Computer Science | 38 | 4 | 78 |
| Business & Management | 28 | 4 | 62 |
| **Total** | **66** | **8** | **140** |

## Files

All data lives in [`data/`](data/) as UTF-8 JSON. See [`schema/`](schema/) for JSON Schemas.

| File | Contents |
|---|---|
| [`data/disciplines.json`](data/disciplines.json) | Discipline taxonomy with ISCED-F and CIP codes |
| [`data/courses.json`](data/courses.json) | University courses (graph **nodes**) |
| [`data/prerequisites.json`](data/prerequisites.json) | Course prerequisite edges |
| [`data/degrees.json`](data/degrees.json) | Degree programs and their course requirements |
| [`data/skills.json`](data/skills.json) | Skills taxonomy with course and career links |
| [`data/careers.json`](data/careers.json) | Career profiles with skill requirements |
| [`data/frameworks.json`](data/frameworks.json) | Regional qualification frameworks |
| [`data/manifest.json`](data/manifest.json) | Counts, checksums, version info |

### A course

```json
{
  "id": "course_cs_data_structures",
  "name": "Data Structures & Algorithms",
  "disciplineId": "disc_computer_science",
  "level": "bachelor",
  "credits": {
    "us": 3,
    "ects": 6,
    "uk": 15
  },
  "description": "Abstract data types, algorithm analysis, and fundamental data structures including arrays, linked lists, trees, graphs, hash tables, and heaps. Emphasis on both theoretical foundations and practical implementations.",
  "learningOutcomes": [
    "Analyze time and space complexity using Big-O notation",
    "Implement and compare fundamental data structures",
    "Select appropriate data structures for given problem constraints",
    "Design and implement graph traversal algorithms"
  ],
  "skillIds": ["skill_python", "skill_algorithm_design", "skill_complexity_analysis"],
  "prerequisiteIds": ["course_cs_programming_1", "course_math_discrete"]
}
```

### A prerequisite edge

```json
{
  "courseId": "course_cs_machine_learning",
  "prerequisiteId": "course_math_linear_algebra",
  "strength": "hard",
  "rationale": "ML models require understanding of vector spaces, matrix operations, and eigendecomposition"
}
```

### A career pathway

```json
{
  "id": "career_data_scientist",
  "title": "Data Scientist",
  "category": "Technology & Analytics",
  "medianSalaryUsd": 108000,
  "growthOutlook": "strong",
  "requiredSkillIds": ["skill_python", "skill_machine_learning", "skill_statistics", "skill_data_visualization"],
  "recommendedDegreeIds": ["degree_ms_data_science", "degree_ms_computer_science"]
}
```

## Using it

Pure data — no runtime, no dependencies. Load the JSON and go.

```js
import courses from './data/courses.json' with { type: 'json' };
import prereqs from './data/prerequisites.json' with { type: 'json' };

const byId = new Map(courses.courses.map(c => [c.id, c]));

// Find all prerequisites for Machine Learning
const mlPrereqs = prereqs.prerequisites
  .filter(p => p.courseId === 'course_cs_machine_learning')
  .map(p => ({
    course: byId.get(p.prerequisiteId).name,
    strength: p.strength,
    rationale: p.rationale
  }));
```

### Interactive explorer

Open [`explorer/index.html`](explorer/index.html) in any browser — no build step required. Features:

- **Constellation view** — force-directed graph of all courses, colored by discipline
- **Pathway trace** — click any course to highlight prerequisites and unlocks
- **Credit calculator** — convert between US Credits, ECTS, and UK CATS
- **Career mapper** — select a career to see recommended courses and degrees

### Validate

```bash
node scripts/validate.mjs
```

Checks referential integrity, schema compliance, prerequisite acyclicity, and credit consistency.

## Design philosophy

### What Polymath is
- A **reference taxonomy** for higher education data interchange
- A **graph** — courses connect to prerequisites, degrees, skills, and careers
- **Multi-system** — one course can declare its credit value in US, ECTS, and UK systems simultaneously
- **Institution-agnostic** — describes what is taught, not who teaches it
- **Extensible by design** — anyone can add new disciplines, courses, or framework mappings

### What Polymath is not
- ❌ A learning management system
- ❌ An institutional accreditation database
- ❌ A replacement for official curriculum standards
- ❌ A K-12 skill taxonomy (that's [Marble](https://github.com/withmarbleapp/os-taxonomy)'s job)

## Comparison with Marble Skill Taxonomy

We admire Marble's work on the K-12 problem. Polymath is built for a fundamentally different domain:

| | Marble Skill Taxonomy | Polymath |
|---|---|---|
| **Domain** | Primary/elementary education (ages 4–14) | Higher education (undergraduate through doctorate) |
| **Granularity** | Micro-topics ("Building sentences") | University courses ("Data Structures & Algorithms") |
| **Core structure** | Topic → prerequisite DAG | Course → prerequisite DAG + degree requirements + career maps |
| **Alignment** | NGSS, Common Core, UK National Curriculum | ISCED-F 2013, CIP 2020, Bologna Process, AQF |
| **Credit system** | N/A (age-based progression) | Multi-system: US Credits, ECTS, UK CATS |
| **Career dimension** | Not included | First-class: skills → careers mapping |
| **Degree programs** | Not included | First-class: courses → degree pathways |
| **Visual metaphor** | 3D rotating globe | Constellation network graph |
| **Data dimensions** | 2 (topics + dependencies) | 6 (courses + disciplines + degrees + skills + careers + frameworks) |

## License

This dataset is **multi-licensed**:

| Layer | License |
|---|---|
| **The database** — collection, structure, IDs, entity relationships | [**ODbL 1.0**](LICENSE) — free for research **and** commercial use, **attribution** required, **share-alike** for derivative databases |
| **Textual content** — course descriptions, learning outcomes, skill definitions, career profiles | [**CC BY-SA 4.0**](LICENSE-CONTENT) — attribution + share-alike |
| **Framework references** — ISCED-F, CIP, Bologna, AQF codes | Referenced under fair use; each framework is owned by its respective governing body |

**Commercial use is welcome.** ODbL distinguishes a *derivative database* (must stay open) from a *produced work* (your product stays yours). Build your app on Polymath — just contribute improvements to the taxonomy back.

### Attribution

> Polymath Taxonomy (v0.1) · © ACLAS College · https://aclas.college/polymath · licensed under ODbL 1.0 (database) and CC BY-SA 4.0 (content).

## Roadmap

- [x] Computer Science course graph (38 courses)
- [x] Business & Management course graph (28 courses)
- [x] Interactive constellation explorer
- [ ] Data Science discipline
- [ ] Psychology discipline
- [ ] Economics discipline
- [ ] Community contribution workflow
- [ ] REST API for programmatic access
- [ ] Course equivalency mappings between institutions

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). We welcome:
- **New disciplines** — submit a discipline proposal with ISCED-F alignment
- **New courses** — follow the schema and include learning outcomes
- **Framework mappings** — add your country's qualification framework
- **Career data** — link skills to real-world job profiles
- **Translations** — course names and descriptions in additional languages

## Citation

```bibtex
@dataset{polymath2026,
  title     = {Polymath: The Open Taxonomy of Global Higher Education},
  author    = {{ACLAS College}},
  year      = {2026},
  version   = {v0.1},
  publisher = {ACLAS College},
  url       = {https://github.com/aclas-college/polymath}
}
```

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://aclas.college">ACLAS College</a> — Open to Global Students</sub>
</p>
