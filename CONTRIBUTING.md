# Contributing to Polymath

We welcome contributions from educators, students, industry professionals, and open-data enthusiasts worldwide.

## Ways to contribute

### Add new disciplines
Submit a discipline proposal that includes:
- ISCED-F 2013 code alignment
- CIP 2020 code (for US alignment)
- A 1-2 sentence description
- Suggested color for visualization

### Add new courses
Each course submission should include:
- A unique `course_` identifier following the existing convention
- Full name and short abbreviation
- Discipline assignment
- Credit values in at least 2 systems (US + ECTS recommended)
- 4-6 measurable learning outcomes
- Prerequisite relationships (with rationale)
- Associated skills (from skills.json or new proposals)

### Add framework mappings
If your country's qualification framework is not yet represented:
- Provide official level definitions (1-10 scale)
- Map each level to ISCED degree levels
- Include typical credit values
- Link to official documentation

### Add career profiles
For each career submission:
- ISCO-08 code alignment
- Required skills (referencing skills.json)
- Recommended courses
- Salary data from reputable sources (BLS, Glassdoor, etc.)
- Growth outlook with source citation

### Improve existing data
- Fix errors in course descriptions or learning outcomes
- Add missing prerequisite relationships
- Improve credit mappings for additional systems
- Translate names and descriptions

## Submission process

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/new-discipline-psychology`)
3. **Validate** your changes: `node scripts/validate.mjs`
4. **Commit** with a descriptive message
5. **Open a Pull Request** against `main`

## Data conventions

### ID format
- `disc_*` — Disciplines (e.g., `disc_cs`, `disc_psychology`)
- `course_*` — Courses (e.g., `course_cs_dsa`, `course_bus_mkt`)
- `skill_*` — Skills (e.g., `skill_python`, `skill_leadership`)
- `career_*` — Careers (e.g., `career_swe`, `career_data_scientist`)
- `degree_*` — Degrees (e.g., `degree_bscs`, `degree_mba`)
- `fw_*` — Frameworks (e.g., `fw_eqf`, `fw_aqf`)

### Credit systems
Always provide US credits as the primary system. Add ECTS, UK CATS, and other systems as secondary values where you have reliable conversion data:

| System | Typical semester course |
|---|---|
| US | 3-4 credit hours |
| ECTS | 5-7.5 credits |
| UK CATS | 10-20 credits |
| China | 2-4 credit hours |

### Description style
Write in plain, internationally accessible English. Avoid institution-specific jargon. Focus on what a student can *do* after completing the course.

## Code of Conduct

- Be respectful and constructive
- Cite sources for factual claims
- Respect copyright — only contribute content you have the right to share
- Follow the existing data conventions
- All contributions fall under the project's licenses (ODbL + CC BY-SA)

## Questions?

Open a GitHub Issue or contact us at [info@aclas.college](mailto:info@aclas.college).
