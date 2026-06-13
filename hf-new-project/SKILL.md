---
name: hf-new-project
description: Helmut's personal new-project bootstrap skill. Copies product-base, grills you on the project until the core is clear, then generates README.md, CLAUDE.md, CONTEXT.md, specs/product-spec.md, docs/decisions/ (one file per key decision), and specs/ui-spec.md (for frontend projects) from your answers. Ends with git init and an optional scaffold prompt.
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

Your job is to interview the user relentlessly until you have a complete, unambiguous picture of the project. This is not a fixed questionnaire — it is a conversation that ends when you could write the spec yourself, not when a list of boxes is checked.

Do not generate any files during this phase.

### Standing instructions (apply throughout the entire session)

- **One question at a time.** Never stack questions.
- **Always give a recommended answer.** Let the user correct you rather than starting from blank.
- **Sharpen fuzzy language immediately.** When the user says something vague or overloaded, stop and propose a precise restatement before moving on: "When you say 'dashboard' — do you mean a read-only summary view, or a place where users take action? Those have very different implications."
- **Push back until it's specific.** If an answer is still vague after your restatement, push again. Don't move on until you could write that section of the spec without guessing.
- **Walk down branches.** After each answer, ask: what does this imply? What new questions does it open? What decisions does it depend on? Resolve those before moving forward.
- **Stress-test with concrete scenarios.** When a claim is made about how the product works, invent an edge case that probes it: "You said users can invite teammates — what happens if the invitee already has an account?"
- **Resolve dependencies between decisions.** Surface when answers constrain each other: "You said this is a prototype, but you also mentioned needing auth — do you actually need auth for the prototype, or is that a later concern?"
- **Track terms as they're defined.** When a domain term gets a precise meaning during the session, note it. These become entries in `CONTEXT.md` — the project's standalone glossary.
- **Track non-obvious decisions as they're made.** When a meaningful product decision is reached — especially one where alternatives were considered and rejected — note it. Each becomes its own file in `docs/decisions/`. Only capture decisions that are hard to reverse, would surprise a future reader, and resulted from a real trade-off between alternatives.

### Topics to cover

Use these as a mental checklist. Reach them through the conversation — don't march through them in order.

- **What it is** — a single sharp sentence. Who uses it, when, and what do they walk away with?
- **Who it's for** — primary user. If it's a personal tool for Helmut, confirm. If for others, who specifically?
- **What problem it solves** — stated as a problem, not a solution. "What's wrong today, before this exists?"
- **What success looks like** — the single most important signal this worked. Measurable beats qualitative.
- **Project type** — Next.js web app, CLI/script, prototype, or other. This determines scaffolding and what files to generate.
- **AI-powered?** — if yes: what is the AI doing? Generating, classifying, extracting, conversing, something else?
- **Hard constraints** — deadlines, required tech, explicit out-of-scope items. Can be none.
- **UI style** *(frontend/Next.js projects only)* — lock this before generating ui-spec.md. Ask one sub-question at a time:
  - *Aesthetic mood:* offer four options with a best guess based on project type — Dark and mystical / Soft and ethereal / Clean and minimal / Bold and modern
  - *Typography:* default guess is serif headings (Cormorant Garamond or Playfair Display) + sans-serif body (DM Sans or Inter) — confirm or redirect
  - *Light or dark mode:* derive a default from the mood answer — confirm
  - *Visual references (optional):* brand names or image uploads — skip if the user has nothing

### When to stop

Stop when you could write every section of `specs/product-spec.md` without guessing:
- The problem is stated in one unambiguous sentence
- You know exactly who the user is and what they need
- You have a measurable success signal
- The scope boundary is clear — you know what this is NOT
- For frontend projects: you have enough to write a full color token table and typography spec

If you're not sure whether you have enough, keep going. A too-short grilling produces a vague spec.

---

## Part 3 — Generate files

Once all questions are answered, generate the files below. Write them directly into the new project folder. Tell the user which files you're about to create before you start.

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
- **Default reading list** — always list in this order: `CONTEXT.md` first (shared language), then `specs/product-spec.md` (problem and goals), then `docs/decisions/` (founding choices), then any other specs. Include `specs/ui-spec.md` for frontend projects.
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

Note: domain terms go in `CONTEXT.md`, not here. Key decisions go in `docs/decisions/`, not here. The product spec is for product thinking only.

### CONTEXT.md

Create `/Users/hfritz/code/<project-name>/CONTEXT.md`. This is the project's living glossary — pure domain terms, nothing else. No goals, no implementation details, no spec content.

Write one entry per term that was defined or sharpened during the grilling. Use this format:

```
# Glossary

_The shared language of this project. Update this file whenever a term is defined, renamed, or sharpened._

## [Term]
[Precise definition in one sentence]. **Not:** [what it is NOT — only if a distinction came up during the session].
```

Only include terms that were ambiguous, overloaded, or non-obvious. Skip words that any reader would understand the same way.

If no domain terms emerged during the grilling, create the file with the header and a single line: `_No terms defined yet. Update as the project evolves._`

### docs/decisions/

Create a `docs/decisions/` folder. For each non-obvious product decision made during the session, write one file named `0001-<decision-slug>.md`, `0002-<decision-slug>.md`, etc.

A decision is worth an ADR if all three are true:
1. **Hard to reverse** — changing this later would be costly
2. **Surprising without context** — a future reader would wonder "why did they do it this way?"
3. **Real trade-off** — there were genuine alternatives and one was chosen for specific reasons

Use this format for each file:

```markdown
# [Decision title]

**Date:** [today's date]
**Status:** Decided

## Context
[1–3 sentences: what situation or constraint led to this decision needing to be made]

## Decision
[What was chosen, stated plainly]

## Reasoning
[Why this option over the alternatives]

## Alternatives considered
- **[Alternative A]** — [why rejected]
- **[Alternative B]** — [why rejected]

## Consequences
[What this means going forward — what it enables, what it rules out]
```

If no decisions during the grilling met all three criteria, skip this folder entirely. Do not create placeholder files.

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

> "Project `<name>` is initialized. Files created: `CONTEXT.md` (glossary), `specs/product-spec.md`, [N] decision files in `docs/decisions/`[, `specs/ui-spec.md`] — plus README and CLAUDE.md. Next step: write `specs/technical-spec.md` before building. For frontend projects, `specs/ui-spec.md` is ready — use it to configure Tailwind theme and shadcn tokens before writing any components. Update `CONTEXT.md` whenever a new term is defined and add to `docs/decisions/` whenever a significant product decision is made."

</what-to-do>

<supporting-info>

## product-base location

`/Users/hfritz/code/product-base/` — the canonical foundation. Never modify it during this skill. Only rsync from it.

## Grilling principles (from grill-with-docs)

The grilling session ends when you reach shared understanding — not when a question list runs out. The key behaviors:

- One question at a time. Never stack.
- Always give a recommended answer — let the user correct rather than starting from blank.
- Sharpen fuzzy language immediately. Propose a precise restatement and ask if that's right.
- Walk down branches. Each answer opens new questions — follow them before moving on.
- Stress-test with scenarios. "If [edge case], what happens?" forces precision.
- Resolve dependencies between decisions before moving forward.
- Stop when you could write the spec without guessing, not when all topics are ticked.
- Capture terms → `CONTEXT.md`. Capture non-obvious decisions → `docs/decisions/`. Neither belongs in the product spec.

## What goes in which file

- **CONTEXT.md** — the project's living glossary. Pure domain terms: name, precise definition, what it is NOT. No goals, no decisions, no implementation detail. Updated throughout the project's lifetime whenever a term is defined or sharpened. Read first by Claude at the start of every session.
- **README.md** — public-facing, minimal. Name, tagline, what it does, links to specs, tech stack, getting started.
- **CLAUDE.md** — Claude's working brief for this project. Not public-facing. Tells Claude what the project is, what role to play, what to read first (CONTEXT.md → product-spec → docs/decisions/).
- **specs/product-spec.md** — structured product thinking only. Problem, users, goals, success metrics, JTBD, assumptions. No glossary, no decisions — those live in their own files.
- **docs/decisions/** — one file per non-obvious product decision. Each file captures context, the decision, reasoning, alternatives rejected, and consequences. Added to over time — not just at bootstrap.
- **specs/ui-spec.md** — visual design contract. Color tokens, typography, spacing, component patterns, motion, tone of voice. Written from UI style answers. Used to configure Tailwind theme and shadcn before any UI code is written. Frontend projects only.
- **specs/technical-spec.md** — NOT written by this skill. That's a separate step.

## Year

Use the current year in the README footer. Today is 2026-06-11, so the year is 2026.

</supporting-info>
