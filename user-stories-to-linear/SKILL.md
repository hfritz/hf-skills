---
name: user-stories-to-linear
description: Generate user stories following the 3 C's (Card, Conversation, Confirmation) and INVEST criteria from a feature description, a file, or pasted text — then push them straight into Linear as issues and save a local markdown copy. Use when breaking a feature into backlog items and you want them in Linear in one step.
metadata:
  owner: helmut-fritz
  based-on: pm-execution:user-stories
---

# User Stories → Linear

Turn a feature into well-formed user stories and push them into Linear in one pass.
Generates stories using the 3 C's and INVEST, saves a local markdown record, then
creates them in Linear via the GraphQL API. Handles a full hierarchy when given one:
an **epic** becomes a Linear Project (created if missing), **milestones** become
Project Milestones, **stories** become issues, and a story's sub-tasks become
sub-issues. A bare list of stories still works as a flat push.

## When to Use

- Breaking a feature into backlog items that need to land in Linear
- You have a PRD, spec, or rough feature description (in a file or pasted in chat)
- You want a reviewable local copy plus the issues created automatically

## Inputs

The user provides the feature **one of three ways** — accept any of them:
1. **A file**: `@feature.md`, a PRD, a spec — read it.
2. **Pasted text** in the chat.
3. **A short description** typed directly ("group ordering for office teams").

Optionally the user names a Linear **target** ("push to the Eng team, Q3 Backlog
project"). If they don't, ask before pushing (see Step 4).

## Prerequisites (check once, fail fast)

A Linear **personal API key** must be available as `LINEAR_API_KEY`.
- Create one at https://linear.app/settings/api
- `export LINEAR_API_KEY=lin_api_xxxxx`

If the user hasn't set it, tell them exactly the two lines above and stop — don't
attempt the push.

## How to Run

### Step 1 — Gather the feature
Read the file / take the pasted text / use the typed description. If the input is
thin, ask for: product/system name, the feature, any design link, key assumptions.
Don't over-ask — one clarifying round at most.

### Step 2 — Generate the stories
Apply the framework (do NOT invent scope the input doesn't support):

- **3 C's** — Card (title + one-liner), Conversation (intent), Confirmation (acceptance criteria).
- **INVEST** — Independent, Negotiable, Valuable, Estimable, Small, Testable.
- Identify distinct **user roles** and journeys; one story per coherent slice.
- Plain language a non-technical stakeholder understands.
- Each story sized for a single sprint.

Per story produce:

```
**Title:** <short feature name>
**Description:** As a <role>, I want to <action>, so that <benefit>.
**Design:** <link if provided, else omit>
**Acceptance Criteria:**
1. <clear, testable>
2. <observable behavior>
3. <system validation>
4. <edge case>
(4–6 criteria)
```

### Step 3 — Save a local markdown copy
Write all stories to `user-stories-<slug>.md` in the current working directory
(slug from the feature name). This is the reviewable record. Show the user the
stories in chat too.

### Step 4 — Resolve the Linear target
If the user already named the team, trust it (names, keys, or IDs all work — the
script resolves them). Otherwise discover and let them pick:

```
node <skill-dir>/scripts/linear.mjs teams
node <skill-dir>/scripts/linear.mjs projects <teamId>   # teamId optional
```

Only the **team** is required. Everything below it is optional and depends on the
input:

- **Theme** → a workspace **project label** applied to the epic's project. This is the
  stand-in for Initiatives (which are a Business/Enterprise-plan feature most
  workspaces don't have): related epics share a `theme` label and you group them with
  a saved filter. Best-effort — if project labels aren't available, the push still
  succeeds and reports a warning.
- **Epic** → a Linear **Project**. Resolved by name; **created if it doesn't exist**.
- **Milestone** → a Linear **Project Milestone** (requires an epic to attach to).
- **Story** → a Linear **Issue**.
- A story's **sub-tasks** → **sub-issues** (via `children`).

If the user shares a flat list of stories with no epic, fall back to creating
issues at the team level (or under one existing project they name).

### Step 5 — Build the push payload
Write a temp file `linear-push.json` next to the markdown. Use the hierarchical
shape when the input has an epic / milestones; the flat shape still works for a
bare list of stories.

**Hierarchical (epic → milestones → stories):**

```json
{
  "team": "ENG",
  "theme": "B2B Expansion",
  "epic": { "name": "Group Ordering", "description": "Office/B2B ordering." },
  "milestones": [
    {
      "name": "Onboarding",
      "targetDate": "2026-07-01",
      "issues": [
        {
          "title": "Recently viewed section",
          "body": "As an Online Shopper, I want ...\n\n---\n**Acceptance Criteria**\n1. ...\n2. ...",
          "labels": ["User Story"],
          "children": [
            { "title": "API: recently-viewed endpoint", "body": "Sub-task ..." }
          ]
        }
      ]
    }
  ],
  "issues": [
    { "title": "Story with no milestone", "body": "As a ...", "labels": ["User Story"] }
  ]
}
```

**Flat (no hierarchy — legacy):**

```json
{
  "team": "ENG",
  "project": "Q3 Backlog",
  "issues": [
    { "title": "Recently viewed section", "body": "As an ...", "labels": ["User Story"] }
  ]
}
```

- `team`: team key, name, or id (**required**).
- `theme`: optional — a workspace project label applied to the epic's project, to group
  related epics (the Initiatives stand-in). Created if missing; merged onto an existing
  project's labels without clobbering. Best-effort/non-fatal — failures show in `warnings`.
- `epic`: optional — a string name or `{ name, description }`. **Created if missing.**
- `project`: legacy alias for an **existing** project only (does not create). Prefer `epic`.
- `milestones[]`: each has `name`, optional `targetDate` (YYYY-MM-DD) / `description`,
  and its own `issues[]`. **Milestones require an `epic`** — Linear attaches them to projects.
- `issues[]`: stories with no milestone — top-level, or `m.issues` inside a milestone.
- `children[]`: optional sub-issues of a story (recursive, same shape).
- `body`: full markdown — description + acceptance criteria. Linear renders markdown.
- `labels`: default `["User Story"]`. The script creates the label if missing.

### Step 6 — Push
```
node <skill-dir>/scripts/linear.mjs push linear-push.json
```

The script prints JSON:
`{ ok, epic: {name,url,created,theme}, milestones: [{name}], pushed: [{title,url,id}], failed: [{title,error}], warnings: [...] }`.

### Step 7 — Report
Summarize: the theme label (if any), the epic (note whether it was **created** or
**reused**, link its URL), which milestones were created, how many stories landed
with their Linear IDs and URLs (link them), any failures with the reason, and any
**warnings** (e.g. the theme label couldn't be applied — non-fatal, the rest still
landed). If anything failed, offer to retry just the failed ones (rebuild the payload
with only those issues — the epic, milestones, and already-created stories exist, so
don't duplicate them).

## Guardrails

- **Never push without a resolved team and a generated/reviewed set of stories.**
- **Epics auto-create.** If the named epic doesn't exist, the script creates the
  Linear project. Confirm the epic name with the user first so you don't create a
  stray project from a typo. An existing same-named project is reused, not duplicated.
- **Re-running pushes again** — the script does not dedupe issues or milestones. The
  epic is matched by name (reused), but stories and milestones are recreated. If the
  user re-runs, warn that it will create duplicate issues/milestones unless intended.
- Keep titles short (Linear issue titles); put the full story in the body.
- If `LINEAR_API_KEY` is missing, stop at Step 0 with the setup instructions.

## Reference

- Framework: `pm-execution:user-stories` (3 C's + INVEST), extended with a Linear push.
- Linear push mirrors the proven Alineo integration (`issueCreate` GraphQL mutation),
  with OAuth/Supabase swapped for a personal API key for portability.
