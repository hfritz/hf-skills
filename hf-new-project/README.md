# hf-new-project

Bootstrap a new project the right way — with a grilling session that forces clarity before a single file is written.

## The problem it solves

Starting a new project is easy. Starting it with a clear problem statement, a defined user, a measurable success signal, and a visual direction — before writing any code — is hard. Most projects skip this and pay for it later in scope creep, unclear priorities, and rework.

This skill makes the thinking unavoidable.

## What it does

1. **Copies product-base** — clones Helmut's personal project foundation into a new folder
2. **Grills you on the project** — dynamic interview that pushes for precision: sharpens fuzzy language, stress-tests claims with edge cases, walks down decision branches, and captures domain terms and key decisions as they emerge
3. **Generates these files** from your answers:
   - `CONTEXT.md` — standalone living glossary of domain terms defined during the session
   - `README.md` — public-facing project overview
   - `CLAUDE.md` — Claude's working brief for this project
   - `specs/product-spec.md` — problem, users, goals, success metrics
   - `docs/decisions/0001-*.md` — one file per non-obvious product decision (ADR format)
   - `specs/ui-spec.md` — full visual design contract (frontend projects only)
4. **Inits a git repo** and makes the first commit
5. **Optionally scaffolds** the app (Next.js, CLI, or other)

## The grilling session

The interview ends when you could write the spec yourself — not when a checklist runs out. It covers: what the project is, who it's for, what problem it solves, what success looks like, project type, whether it's AI-powered, hard constraints, and visual direction (for frontend projects).

Key behaviors:
- One question at a time, always with a recommended answer to react to
- Fuzzy language gets stopped and sharpened immediately
- Claims get stress-tested with concrete scenarios
- Answers that open new branches get followed before moving on
- Domain terms that get defined are captured in the spec's Glossary
- Non-obvious decisions (where alternatives were considered) go into Key Decisions

## Usage

```
/hf-new-project
/hf-new-project my-project-name
```

## Output

After the session, the new project folder contains:

```
my-project/
├── CONTEXT.md            ← living glossary of domain terms
├── README.md
├── CLAUDE.md
├── docs/
│   └── decisions/
│       ├── 0001-*.md     ← one file per non-obvious product decision
│       └── 0002-*.md
└── specs/
    ├── product-spec.md   ← problem, users, goals, success metrics
    ├── ui-spec.md        ← color tokens, typography, spacing (frontend only)
    └── technical-spec.md ← stub, written separately
```
