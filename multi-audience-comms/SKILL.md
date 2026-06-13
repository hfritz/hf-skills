---
name: multi-audience-comms
description: Transform any content (research findings, meeting notes, PRD, data analysis, feature update, incident report, etc.) into multiple audience-specific versions simultaneously. Generates Slack update, executive email, and Notion/detailed doc by default — but adapts to whatever audiences are specified. Use when you need to communicate the same information to different stakeholders without rewriting from scratch.
metadata:
  owner: helmut-fritz
---

# Multi-Audience Communications Skill

Transform a single source of information into multiple audience-specific versions simultaneously.

## When to Use

- User research findings → team Slack + exec email + Notion doc
- Sprint update → engineering Slack + stakeholder email + wiki page
- Incident report → customer-facing + internal + exec summary
- Feature launch → announcement + release notes + sales brief
- Any time you need the same info in different formats/tones

## Default Audiences

If no audiences are specified, generate these 3:

1. **Slack Update** — 2-4 lines, casual, emoji, scannable, team-focused
2. **Executive Email** — 3 paragraphs, strategic, outcome-focused, includes metrics and business impact
3. **Notion/Detailed Doc** — comprehensive, headers, tables, quotes, standalone reference

## How to Run

### Step 1: Identify the source content

The user will either:
- Reference a file with `@filename`
- Paste content directly
- Describe what they want to communicate

Read and fully understand the source before generating outputs.

### Step 2: Check for custom audiences

If the user specifies audiences (e.g. "for Slack, for the board, for customers"), use those instead of the defaults. Common variants:

| Audience | Style |
|----------|-------|
| Slack / team | Casual, 2-4 lines, emoji, action-oriented |
| Executive / CEO / board | Strategic, 3 paragraphs, metrics, business impact |
| Notion / wiki / detailed doc | Comprehensive, headers, tables, full context |
| Customer-facing / release notes | Benefit-focused, positive, no internal jargon |
| Engineering | Technical, precise, includes implementation detail |
| Sales / GTM | Opportunity-focused, competitive angle, customer value |
| Investor update | Metrics-first, narrative arc, honest about challenges |
| Support / CS | Empathetic, practical, FAQ-style |

### Step 3: Generate all versions simultaneously

Write all versions in a single output document. Structure it like this:

```
# [Topic] — Multi-Audience Communications
*Source: [filename or description] | Generated: [date]*

---

## 📱 Slack Update
[content]

---

## 📧 Executive Email
**Subject: [subject line]**

[content]

---

## 📝 [Notion / Detailed Doc title]
[content]
```

### Step 4: Save the output

Save to a logical location near the source file, or ask the user where they'd like it saved. Default filename pattern: `[topic]-communications.md`

## Tone & Quality Rules

**Slack:**
- Max 4 lines
- 1-2 emojis
- End with a clear next step or CTA if relevant
- No jargon, no walls of text

**Executive Email:**
- Para 1: What we learned / what happened (facts + data)
- Para 2: Why it matters (business impact, risk, opportunity)
- Para 3: What we're doing next (recommendation + timeline)
- Include specific numbers wherever possible
- No emojis

**Notion/Detailed Doc:**
- TL;DR at the top (2-3 sentences)
- Use H2 headers to organise sections
- Include direct quotes where available
- Tables for comparison data
- Explicit next steps with owners and dates
- Must be a standalone reference — assume no prior context

## Example Invocations

```
/multi-audience-comms @user-research-synthesis.md
/multi-audience-comms @sprint-23-results.md for Slack, exec email, and customer release notes
/multi-audience-comms the mobile app decision we just made — for the team and for the board
```
