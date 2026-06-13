# meeting-notes-processor

Turn messy meeting notes into structured action items — organized by owner, with priorities and due dates — appended directly to the source file.

## The problem it solves

Meeting notes capture what was said. They rarely make it easy to answer: who is doing what, by when, and how urgently? Action items get buried in prose, attributed vaguely, or forgotten by the next day. This skill extracts and structures them without touching the original notes.

## What it does

For each meeting note file:
1. **Extracts all action items** — owner, specific action, priority (High / Medium / Low), due date, and one-line context
2. **Extracts decisions made** — things agreed upon that don't need further action
3. **Extracts open questions** — unresolved items that need follow-up, with owner and target date
4. **Appends a structured summary** to the end of the source file — original notes untouched above it

For a folder of files, it processes each one individually and can optionally consolidate everything into a single `action-items-master.md` for weekly reviews.

## Usage

```
/meeting-notes-processor @monday-product-sync.md
/meeting-notes-processor @meeting-notes/
/meeting-notes-processor @sprint-planning.md — also create a master list
```

## Output format

Each file gets a summary block appended at the bottom:

```
## ✅ ACTION ITEMS SUMMARY

### 👤 Helmut
| # | Action Item | Priority | Due Date | Context |
|---|-------------|----------|----------|---------|
| 1 | Send revised proposal to legal | 🔴 High | Thu Jun 15 | Unblocks contract sign-off |

### 📋 Decisions Made
- Agreed to delay v2 launch by two weeks

### ❓ Open Questions
- Do we need separate pricing for enterprise? — Owner: Helmut, by Fri
```

## When to use

- End of day: process everything at once
- After a high-stakes meeting (stakeholder sync, sprint planning, customer call)
- Before sending a follow-up email to attendees
- Weekly: batch-process all notes for a consolidated action list
