# user-research-synthesizer

Read a folder of interview transcripts (or other research files) and produce a structured synthesis: pain points ranked by frequency, direct quotes, feature requests, revenue signals, and recommended next steps.

## The problem it solves

After a round of user interviews, the work isn't over — it's barely started. You have a pile of transcripts and notes, and you need to find the patterns, separate what users actually said from what you inferred, and make it actionable for the team. Doing this manually takes hours. This skill reads everything at once and surfaces the signal.

## What it does

1. **Reads all source files** — transcripts, survey responses, support tickets, usability test notes, or any combination
2. **Identifies themes and pain points** — with frequency counts (N/total participants) so patterns are evidence-based, not impressionistic
3. **Extracts direct quotes** — the best 1–2 per theme, tied to specific participants
4. **Captures feature requests** in a table with request counts and affected personas
5. **Surfaces revenue and retention signals** — willingness to pay, churn risk, upgrade potential
6. **Breaks down findings by persona** — so prioritization decisions can be audience-specific
7. **Recommends next steps** with urgency and rationale
8. **Saves a synthesis doc** to the same folder as the source files

After synthesis, it offers to chain into `/multi-audience-comms` to generate a Slack update, exec email, and Notion doc from the findings.

## Usage

```
/user-research-synthesizer @user-interviews/
/user-research-synthesizer @interviews/ @support-tickets/
/user-research-synthesizer @q4-nps-responses.md
```

## Supported input types

Interview transcripts, survey responses, support ticket exports, sales call notes, NPS/CSAT feedback, usability test notes — any `.md` file with qualitative content.

## Quality rules

- Never summarize without counting — every theme includes (N/total) frequency
- Always include direct quotes — findings without quotes are just opinions
- Facts and recommendations are kept separate — the synthesis section is what users said, recommendations are interpretation
- Personas are named and connected to specific findings

## Output

Saves `[topic]-research-synthesis.md` with: TL;DR, top pain points with quotes, feature requests table, revenue/retention signals, persona breakdown, recommended next steps, and methodology.
