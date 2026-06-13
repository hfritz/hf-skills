# multi-audience-comms

Turn one source of information into multiple audience-specific versions in a single pass — without rewriting from scratch for each one.

## The problem it solves

The same information means different things to different people. A research finding needs to be a two-line Slack message for the team, a three-paragraph strategic email for the exec, and a detailed standalone doc for the wiki. Writing each version from scratch takes time and introduces inconsistency. This skill does all three simultaneously from a single input.

## What it does

Takes any source — a file, pasted content, or a description — and generates audience-specific versions in one output. Each version is calibrated for the right length, tone, format, and emphasis for its audience.

Default outputs (used when no audiences are specified):

| Format | Style |
|--------|-------|
| **Slack update** | 2–4 lines, casual, emoji, scannable, ends with a CTA |
| **Executive email** | 3 paragraphs: what happened → why it matters → what's next. Metrics-led, no emojis |
| **Notion / detailed doc** | TL;DR at top, headers, tables, direct quotes, full standalone context |

Custom audiences are supported — specify any combination and the skill adapts.

## Usage

```
/multi-audience-comms @user-research-synthesis.md
/multi-audience-comms @sprint-23-results.md for Slack, exec email, and customer release notes
/multi-audience-comms the mobile app decision we just made — for the team and for the board
```

## Supported audiences

Slack, executive/CEO/board, Notion/wiki, customer-facing/release notes, engineering, sales/GTM, investor update, support/CS — or any custom description.

## Works well after

`/user-research-synthesizer` — that skill offers to chain directly into this one after producing a synthesis.
