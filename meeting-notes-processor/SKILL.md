---
name: meeting-notes-processor
description: Transform messy meeting notes into structured action items organized by owner. Works with a single file or an entire folder of meeting notes. Appends a clean summary table (owner, action, priority, due date) directly to each source file. Use at end of day, after standups, sprint planning, stakeholder syncs, or any meeting that generates follow-up work.
metadata:
  owner: helmut-fritz
---

# Meeting Notes Processor Skill

Extract action items from messy meeting notes and append a structured summary organized by owner.

## When to Use

- End of day: process all meetings at once
- After a single important meeting (stakeholder sync, sprint planning, customer call)
- Weekly: batch-process all notes from the past week
- Before sending a follow-up email to meeting attendees

## How to Run

### Step 1: Identify the source

The user will either:
- Reference a single file: `@meeting-notes.md`
- Reference a folder: `@meeting-notes/` (process all files)
- Paste notes directly

### Step 2: Extract all action items

For each action item, identify:
- **Owner** — who is responsible (use their name or "Me" if it's the user)
- **Action** — what needs to be done (specific and actionable)
- **Priority** — 🔴 High / 🟡 Medium / 🟢 Low based on urgency and impact
- **Due Date** — explicit if mentioned, inferred if context allows (e.g. "before Thursday's meeting"), or "TBD"
- **Context** — one-line note explaining why this matters or what it unblocks

Also extract:
- **Decisions made** — things agreed upon that don't require further action
- **Open questions** — unresolved items that need follow-up

### Step 3: Append summary to the source file

Append the following structure to the END of each meeting note file. Never overwrite the original notes.

```markdown
---

## ✅ ACTION ITEMS SUMMARY
*Extracted by Claude Code — [date]*

### 👤 [Owner Name]

| # | Action Item | Priority | Due Date | Context |
|---|-------------|----------|----------|---------|
| 1 | [action] | 🔴 High | [date] | [context] |

### 👤 [Next Owner]
...

---

### 📋 Decisions Made
- [Decision 1]
- [Decision 2]

### ❓ Open Questions
- [Question 1] — Owner: [name], by [date]
```

### Step 4: Multiple files

If processing a folder, append a summary to each file individually. Then optionally create a single `action-items-master.md` that consolidates all action items across all meetings — useful for weekly reviews.

## Priority Rules

| 🔴 High | Due within 2 days, blocks others, mentioned as urgent |
|---------|-------------------------------------------------------|
| 🟡 Medium | Due this week, important but not blocking |
| 🟢 Low | Due next week or later, nice-to-have |

## Example Invocations

```
/meeting-notes-processor @monday-product-sync.md
/meeting-notes-processor @meeting-notes/
/meeting-notes-processor @sprint-planning.md — also create a master list
```
