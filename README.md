# Paso a Paso: learn Spanish step by step

A complete, offline-friendly web app for learning Spanish grammar and vocabulary incrementally, from **A1 (beginner) to B1 (intermediate)**.

No build step, no dependencies, no account. Open `index.html` in a browser and start learning.

## What's inside

| | |
|---|---|
| **28 units** | A1 (12) → A2 (9) → B1 (7). Each unit teaches one grammar topic with explanations, tables, spoken examples and tips. |
| **~400 words** | Themed vocabulary for each unit: greetings, family, food, house, travel, work, health… |
| **~300 grammar exercises** | Multiple choice, fill-in-the-blank, translation and word-ordering, plus auto-generated vocabulary drills (matching, listening, typing). |
| **Unlock by mastery** | Score 80%+ on a unit's practice to unlock the next one. *Free mode* in Settings unlocks everything. |
| **Spaced repetition** | Words from completed units go into a Leitner-style review deck (1, 3, 7, 16, 35, 90 days). Missed words come back sooner. |
| **Verb trainer** | 44 verbs × 7 tenses (present, preterite, imperfect, future, conditional, present perfect, subjunctive). Tenses unlock as you reach them; full conjugation tables are always available. |
| **Forgiving checking** | Accent slips and one-letter typos count as correct and show the exact spelling. Optional pronouns are accepted. An on-screen accent bar is shown for á é í ó ú ñ ü ¿ ¡. |
| **Audio** | Text-to-speech for every Spanish word and example, using your device's Spanish voices. |
| **Progress** | XP, daily goal, streak, 7-day chart, level progress, word mastery. Progress is saved in your browser, with export/import for backups. |

### Curriculum

**A1:** greetings & pronouns · nouns & articles · *ser* · adjectives · numbers & *hay* · -ar verbs · -er/-ir verbs · *estar* / ser vs estar · *tener* & family · *ir* & *ir a* · questions, days & time · stem-changing verbs

**A2:** *gustar* & food · reflexive verbs & routine · possessives & demonstratives · irregular *yo* verbs, *saber* vs *conocer* · object pronouns & shopping · regular preterite · irregular preterite & travel · imperfect · preterite vs imperfect

**B1:** comparisons & weather · *por* vs *para* & work · future & conditional · present perfect · commands & health · subjunctive (wishes, emotions) · subjunctive (doubt, time clauses, purpose)

## Running it

```bash
# Option 1: just open the file
open index.html            # macOS  (or double-click it)

# Option 2: serve it locally
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Tests

```bash
node tests/run.js
```

The tests check the conjugation engine against known tables, check every unit and exercise for structural problems, and cover answer checking and the spaced-repetition scheduler.

## Project layout

```
index.html            app shell
css/styles.css        styles (light + dark)
js/data/units-*.js    curriculum: grammar notes, vocabulary, exercises
js/data/verbs.js      verb list with irregularities
js/conjugate.js       conjugation engine
js/answers.js         answer normalisation & tolerant checking
js/srs.js             spaced-repetition scheduling
js/store.js           progress persistence (localStorage)
js/app.js             router, views, exercise session engine
tests/run.js          zero-dependency test runner
```

## Adding content

Add a unit object to one of the `js/data/units-*.js` files (the shape is documented at the top of `units-a1.js`) and run `node tests/run.js` to validate it. To add a verb, add an entry to `js/data/verbs.js`. Only its irregularities need to be listed.
