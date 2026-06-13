---
name: hf-new-project
description: Helmut's personal new-project bootstrap skill. Copies product-base, grills you on the project until the core is clear, then generates README.md, CLAUDE.md, specs/product-spec.md, and specs/ui-spec.md (for frontend projects) from your answers. Ends with git init and an optional scaffold prompt.
---

<what-to-do>

You are bootstrapping a new project from Helmut's product-base foundation. The session has two parts: mechanical setup, then a grilling session to define the project. Follow the steps below exactly in order.

---

## Part 1 — Mechanical setup

### Step 1: Resolve the project name

If the user ran `/hf-new-project <name>`, use that name. Otherwise, ask:

> "What's the project name? (used as the folder name, e.g. `my-project`)"

Wait for the answer before continuing.

### Step 2: Copy product-base

Run the following commands. Tell the user what you're doing before each one.

```bash
rsync -a --exclude='.git' --exclude='.DS_Store' /Users/hfritz/code/product-base/ /Users/hfritz/code/<project-name>/
rm -f /Users/hfritz/code/<project-name>/.claude/settings.local.json
```

Confirm the copy succeeded before continuing.

---

## Part 2 — Grilling session

Now interview the user to understand the project. Ask one question at a time. After each question, wait for the answer before moving to the next. For each question, give your best recommended answer based on what you know so far — the user can accept, correct, or expand it.

Do not generate any files during this phase. Accumulate all answers first.

### Question 1 — What is this?

Ask for a one-sentence description of the project. Push for specificity. Vague answers like "a tool to help with X" should be sharpened: "Who uses it, when, and what do they walk away with?"

### Question 2 — Who is it for?

Ask who the primary user is. If it's a personal project for Helmut, confirm that. If it's for others, ask who specifically.

### Question 3 — What problem does it solve?

Ask what problem or friction the user currently experiences that this project removes. Push back on solutions stated as problems — if the answer describes the product, redirect: "What's wrong today, before this exists?"

### Question 4 — What does success look like?

Ask for the single most important signal that this project worked. Measurable beats qualitative. If the answer is vague ("people find it useful"), push: "How would you know, six weeks from now, that building this was worth it?"

### Question 5 — What kind of project is this?

Ask which category fits best:
- **Next.js web app** (includes any frontend with a backend)
- **CLI tool or script**
- **Experiment or prototype** (throwaway, fast validation)
- **Other** (describe)

This determines whether to scaffold and what goes in the tech stack.

### Question 6 — Is it AI-powered?

Ask if the project involves calling an LLM or building AI features. If yes, ask one follow-up: "What is the AI doing — generating content, classifying, extracting, conversing, something else?"

### Question 7 — Any known constraints?

Ask if there are hard constraints: a deadline, a specific tech requirement, things that are explicitly out of scope. This can be skipped if the user has nothing to add — offer: "Any hard constraints I should know about? Or shall we move on?"

### Question 8 — UI style (only if Q5 is Next.js or a frontend project)

Skip this question for CLI tools, scripts, or non-visual projects.

Ask for the visual direction. Frame it as: "Before we scaffold, let's lock the UI style — it's faster to define it now than to override defaults later."

Ask one sub-question at a time:

**8a — Aesthetic mood:**
Offer four options and give a best guess based on the project type:
- Dark and mystical (deep purples, navy, gold, stars)
- Soft and ethereal (lavender, blush, cream, airy gradients)
- Clean and minimal (cream/greige, gold accents, gentle gradients, luxury wellness)
- Bold and modern (high contrast, vivid accent, flat design)

**8b — Typography:**
My default guess: serif headings (Cormorant Garamond or Playfair Display) + clean sans-serif body (DM Sans or Inter). Confirm or redirect.

**8c — Light or dark mode:**
Default guess based on mood answer. Confirm.

**8d — Reference apps or brands (optional):**
Ask if there are any visual references. Accept image uploads or brand names. If the user has nothing, skip and proceed with best guess.

Accumulate all answers before generating files.

---

## Part 3 — Generate files

Once all questions are answered, generate the four files below. Write them directly into the new project folder. Tell the user: "Generating README.md, CLAUDE.md, specs/product-spec.md, and specs/ui-spec.md from your answers."

### README.md

Write `/Users/hfritz/code/<project-name>/README.md` using this structure:

```
# <Project Name>

<Tagline — one sharp sentence from Q1>

## What it does

<2–3 sentences: problem (Q3), solution (Q1), for whom (Q2).>

## Specs

- [Product Spec](specs/product-spec.md)
- [Technical Spec](specs/technical-spec.md)
- [UI Spec](specs/ui-spec.md)

## Tech stack

<Fill in if known from Q5/Q6. Otherwise: "TBD — see technical spec.">

## Getting started

<Leave as placeholder: "Coming soon — app not yet scaffolded.">

---

Built by [Helmut Fritz](https://helmutfritz.fyi/) using AI tools · <year>
```

### CLAUDE.md

Overwrite `/Users/hfritz/code/<project-name>/CLAUDE.md`. Keep the structure of the product-base version but replace the project-specific sections:

- **Project description** — 2–3 sentences from Q1, Q2, Q3
- **Role for Claude** — derive from project type (Q5) and whether it's AI-powered (Q6)
- **Default reading list** — reference this project's own specs (include `specs/ui-spec.md` for frontend projects)
- **Tech stack** — from Q5/Q6 if known, otherwise TBD
- **Key conventions** — leave as "TBD — to be added after technical spec is written"
- **Hard rules** — leave as "TBD"

Keep the agent use section and public project defaults unchanged from product-base.

### specs/product-spec.md

Overwrite `/Users/hfritz/code/<project-name>/specs/product-spec.md` using the template structure. Fill in every section from the grill answers:

- **Summary** — from Q1 + Q3
- **Target Users** — from Q2
- **Problem** — from Q3
- **Goals** — from Q4, plus any implied goals from Q1
- **Non-Goals** — from Q7 constraints, plus anything that came up as out of scope
- **Jobs To Be Done** — derive one JTBD statement from Q2 + Q3 + Q4
- **Success Metrics** — primary metric from Q4
- **Assumptions** — surface 2–3 key assumptions implied by the answers

Leave UX, Key Flows, and Requirements sections as stubs — they belong in a later spec pass or with the technical spec.

Set Status to `Draft`.

### specs/ui-spec.md (only for frontend/Next.js projects)

Create `/Users/hfritz/code/<project-name>/specs/ui-spec.md` from the Q8 answers. Include:

- **Aesthetic Direction** — mood, keywords, what this style is NOT
- **Color Palette** — full token table (background, surface, accent, text hierarchy). All colors must be warm and consistent with the chosen mood. No pure black or white unless explicitly chosen.
- **Typography** — font pairing (heading + body), weights, scale
- **Spacing & Layout** — base unit, section padding, max width
- **Elevation & Depth** — shadow tokens (warm/soft, no harsh blacks)
- **Border Radius** — per component type
- **Buttons** — primary, secondary, ghost styles with hex values
- **Gradients & Decorative Elements** — any brand-specific gradient recipes, illustration style, decorative motifs
- **Cards** — standard and feature card specs
- **Iconography** — icon set, stroke style, color usage
- **Motion** — animation philosophy (subtle/fast/none) and transition specs
- **Tone of Voice** — 3–5 rules for UI copy
- **Reference Images** — list the references that informed the style
- **What This Style Is Not** — explicit anti-patterns to avoid

If the user provided reference images, describe what was extracted from each. If no references were provided, synthesize from the mood answer alone.

Set Status to `Draft`.

---

## Part 4 — Git init

After files are written, run:

```bash
cd /Users/hfritz/code/<project-name>
git init
git add -A
git commit -m "Initialize <project-name> from product-base foundation."
```

Confirm the commit hash and tell the user the project is initialized.

---

## Part 5 — Scaffold prompt

Ask the user:

> "Do you want to scaffold the app now?"

If yes, ask which type (if not already clear from Q5):
- **Next.js** — run the standard scaffold:
  ```bash
  cd /Users/hfritz/code/<project-name>
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install ai @ai-sdk/anthropic zod
  npx shadcn@latest init
  ```
- **CLI / script** — ask what runtime they want (Node, Python, other) and scaffold accordingly
- **Skip for now** — note that scaffolding is in the checklist in `docs/new-project-setup.md`

---

## Part 6 — Wrap up

Tell the user what was created and what's next:

> "Project `<name>` is initialized. Next step: write `specs/technical-spec.md` before building. For frontend projects, `specs/ui-spec.md` is ready — use it to configure Tailwind theme and shadcn tokens before writing any components. Run the agent review (`head-of-product-agent`, `engineering-agent`, `reviewer-agent`) to stress-test the specs before writing code."

</what-to-do>

<supporting-info>

## product-base location

`/Users/hfritz/code/product-base/` — the canonical foundation. Never modify it during this skill. Only rsync from it.

## Grilling principles (from grill-with-docs)

- One question at a time. Never stack questions.
- Always give a recommended answer — let the user correct you rather than starting from blank.
- Push back on fuzzy answers. Vague input produces vague specs.
- Don't move on until an answer is specific enough to write down.

## What goes in which file

- **README.md** — public-facing, minimal. Name, tagline, what it does, links to specs, tech stack, getting started.
- **CLAUDE.md** — Claude's working brief for this project. Not public-facing. Tells Claude what the project is, what role to play, what to read first.
- **specs/product-spec.md** — structured product thinking. Problem, users, goals, success metrics. Not implementation detail.
- **specs/ui-spec.md** — visual design contract. Color tokens, typography, spacing, component patterns, motion, tone of voice. Written from Q8 answers. Used to configure Tailwind theme and shadcn before any UI code is written. Frontend projects only.
- **specs/technical-spec.md** — NOT written by this skill. That's a separate step.

## Year

Use the current year in the README footer. Today is 2026-06-11, so the year is 2026.

</supporting-info>
