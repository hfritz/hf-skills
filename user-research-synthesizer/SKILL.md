---
name: user-research-synthesizer
description: Analyze a folder of user interview transcripts (or other research files) and produce a structured synthesis document with pain points ranked by frequency, direct quotes, feature requests, revenue/retention signals, and recommended next steps. Use after completing a round of user interviews, usability tests, or customer feedback reviews.
metadata:
  owner: helmut-fritz
---

# User Research Synthesizer Skill

Read multiple research files and synthesize them into a single actionable document with patterns, themes, and recommendations.

## When to Use

- After a round of user interviews (x transcripts)
- After collecting usability test recordings/notes
- After a batch of customer support tickets
- After NPS survey responses
- Any time you have multiple qualitative data sources to analyze

## Supported Input Types

- Interview transcripts (`.md` files)
- Survey responses
- Support ticket exports
- Sales call notes
- NPS/CSAT feedback
- Usability test notes

## How to Run

### Step 1: Identify the source

The user will reference a folder or list of files:
- `@user-interviews/` — process all files in folder
- `@interviews/ @support-tickets/` — combine multiple sources
- Individual files listed one by one

Read ALL files before synthesizing — patterns only emerge across the full dataset.

### Step 2: Identify the research topic

If not specified, infer from file contents. Confirm with user if ambiguous.

### Step 3: Extract & count

For each theme or pain point, track:
- How many participants mentioned it (frequency)
- Direct quotes that illustrate it best (1-2 per theme)
- The user roles/personas most affected
- Severity (blocking vs. annoying vs. nice-to-fix)

### Step 4: Create synthesis document

Save as `[topic]-research-synthesis.md` in the same folder as the source files (or where user specifies).

```markdown
# [Topic] Research Synthesis
*Analysis of [N] [source type] — [date]*
*Participants: [brief description of who was interviewed]*

---

## TL;DR
[2-3 sentence summary of the most important findings and recommended action]

---

## Top Pain Points

### 1. [Pain Point Name] ([N]/[total] participants)
[1-sentence description]

> "[best quote]" — [Name/Role]
> "[second quote]" — [Name/Role]

### 2. [Pain Point Name] ([N]/[total] participants)
...

---

## Feature Requests

| Feature | # Requests | Personas Affected |
|---------|-----------|-------------------|
| [feature] | [N] | [roles] |

---

## Revenue & Retention Signals

[Table or bullets showing willingness to pay, churn risk, upgrade potential]

---

## Persona Breakdown

[Which pain points affect which personas most — useful for prioritization]

---

## Recommended Next Steps

1. **[Recommendation]** — [why, urgency]
2. ...

---

## Methodology
*[N] [source type] conducted [date range]. Participants: [brief description].*
```

### Step 5: Offer communication outputs

After creating the synthesis, offer:
> "Want me to also generate audience-specific communications for this research? (Slack update, executive email, Notion doc)"

This chains naturally into the `multi-audience-comms` skill.

## Quality Rules

- **Never summarize without counting** — always include (N/total) frequency for each theme
- **Always include direct quotes** — they make findings credible and memorable
- **Separate facts from recommendations** — findings section = what users said, recommendations = your interpretation
- **Name the personas** — connect findings to Sarah, Mike, Alex (or whoever the relevant personas are)

## Example Invocations

```
/user-research-synthesizer @user-interviews/
/user-research-synthesizer @interviews/ @support-tickets/ — mobile app decision
/user-research-synthesizer @q4-nps-responses.md
```
