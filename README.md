# Polymath

<p align="center">
  <img src="media/polymath-wordmark.svg" alt="Polymath" width="480">
</p>

<p align="center">
  <strong>The Open Taxonomy of Global Higher Education</strong><br>
  An open dataset and knowledge graph for university courses, prerequisites, degree pathways, skills, careers, and global credit frameworks.
</p>

<p align="center">
  <a href="https://aclas.college"><img src="https://img.shields.io/badge/by-ACLAS%20College-8b5cf6?style=flat-square" alt="by ACLAS College"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/database-ODbL%201.0-3b82f6?style=flat-square" alt="License: ODbL"></a>
  <a href="LICENSE-CONTENT"><img src="https://img.shields.io/badge/content-CC%20BY--SA%204.0-22c55e?style=flat-square" alt="License: CC BY-SA"></a>
  <img src="https://img.shields.io/badge/version-v1-6366f1?style=flat-square" alt="Version: v1">
</p>

---

> *"A polymath is someone whose knowledge spans a significant number of subjects, known to draw on complex bodies of knowledge to solve specific problems."*

Polymath maps the architecture of higher education — across disciplines, degree levels, credit systems, and career pathways — into a single, open, machine-readable knowledge graph.

**Current release:** 94 university courses, 90 prerequisite relationships, 15 academic disciplines, 59 skills, 28 career pathways, 5 degree pathways, and 4 global credit / qualification frameworks.

> **Note on the data:** course names, descriptions, salaries and similar fields are *synthesized examples* modeled on standard curricula (see `PROVENANCE.md`), not scraped from real universities. The taxonomy structure, classifications, and mappings are the real substance.

## See it

Every node is a university course, colored by discipline cluster. Every connection is a prerequisite, a credit pathway, or a career link. [Explore it interactively →](https://aclascollege.github.io/polymath/explorer/)

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

### 📊 Current coverage (v1)

| Discipline | Courses | Degrees | Skills |
|---|---|---|---|
| Computer Science | 22 | 2 | Shared skills graph |
| Management | 13 | 1 | Shared skills graph |
| Business Administration | 10 | 1 | Shared skills graph |
| Artificial Intelligence | 9 | 1 | Shared skills graph |
| Data Science | 7 | - | Shared skills graph |
| Economics | 7 | - | Shared skills graph |
| Finance | 6 | - | Shared skills graph |
| Software Engineering | 5 | - | Shared skills graph |
| Mathematics | 5 | - | Shared skills graph |
| Marketing | 5 | - | Shared skills graph |
| Psychology | 5 | - | Shared skills graph |
| **Total** | **94** | **5** | **59 skills** |

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
  "id": "course_ai_ml",
  "name": "Machine Learning",
  "disciplineId": "disc_ai",
  "level": "advanced",
  "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
  "description": "Supervised and unsupervised learning algorithms: regression, classification, clustering, ensemble methods, and model evaluation.",
  "learningOutcomes": [
    "Implement linear and logistic regression from scratch",
    "Apply decision trees, random forests, and gradient boosting"
  ],
  "skills": ["skill_ml", "skill_python"]
}
```

### A prerequisite edge

```json
{
  "courseId": "course_ai_ml",
  "prerequisiteId": "course_math_linalg",
  "strength": "strict",
  "reason": "Machine learning algorithms are expressed in linear algebra",
  "crossDiscipline": true
}
```

### A career pathway

```json
{
  "id": "career_data_scientist",
  "title": "Data Scientist",
  "category": "Technology",
  "iscoCode": "2120",
  "typicalDegreeLevel": "master",
  "growthOutlook": "rapid",
  "requiredSkillIds": ["skill_python", "skill_sql", "skill_ml", "skill_stats"],
  "recommendedCourseIds": ["course_cs_intro_py", "course_ds_intro", "course_ai_ml"]
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
  .filter(p => p.courseId === 'course_ai_ml')
  .map(p => ({
    course: byId.get(p.prerequisiteId).name,
    strength: p.strength,
    reason: p.reason
  }));
```

```python
import json

with open("data/courses.json") as f:
    courses = json.load(f)["courses"]
with open("data/prerequisites.json") as f:
    prereqs = json.load(f)["prerequisites"]

by_id = {c["id"]: c for c in courses}

# Find all prerequisites for Machine Learning
ml_prereqs = [
    {"course": by_id[p["prerequisiteId"]]["name"],
     "strength": p["strength"],
     "reason": p["reason"]}
    for p in prereqs if p["courseId"] == "course_ai_ml"
]
print(ml_prereqs)
```

### Interactive explorer

Open [`explorer/index.html`](explorer/index.html) in any browser, or visit [aclascollege.github.io/polymath/explorer](https://aclascollege.github.io/polymath/explorer/). Features:

- **Liberty of Knowledge view** — Statue of Liberty-inspired graph of all courses, colored by discipline
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

> Polymath Taxonomy (v1) · © ACLAS College · https://aclascollege.github.io/polymath/explorer/ · licensed under ODbL 1.0 (database) and CC BY-SA 4.0 (content).

## Roadmap

- [x] Computer Science course graph
- [x] Business, management, finance, and marketing course graph
- [x] AI, data science, mathematics, economics, and psychology expansion
- [x] Interactive constellation explorer
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
  version   = {v1},
  publisher = {ACLAS College},
  url       = {https://github.com/aclascollege/polymath}
}
```

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://aclas.college">ACLAS College</a> — Open to Global Students</sub>
</p>
