---
name: hf-gamma
description: Generate personal presentations on Gamma.app for Helmut Fritz using his brand voice, visual identity, and storytelling style. Use when creating slide decks, presentations, pitch decks, case study readouts, portfolio pieces, project updates, strategy decks, or any Gamma.app presentation content for Helmut's professional or personal use. Triggers on requests to create presentations, make slides, build a deck, prepare a readout, or generate Gamma output. This skill does NOT apply to PowerPoint files, PDF reports, Google Slides, Confluence pages, or other non-Gamma output. If the user wants a Gamma presentation or deck, use this skill.
metadata:
  owner: helmut-fritz
---

# HF Gamma Skill

Create personal Gamma.app presentations for Helmut Fritz using his brand voice and storytelling style.

## Overview

This skill plans the deck structure and writes polished, ready-to-paste markdown content for Gamma.app. Gamma's AI handles the visual layout from your text — so the quality of the markdown structure determines the quality of the output.

**Default mode (free):** Output the markdown in the conversation → user pastes it into Gamma's UI.
**API mode (Pro plan only):** Call the Gamma API directly via `scripts/gamma-cli`. See the API section at the bottom.

---

## Workflow

### Step 1: Plan the deck

Based on the user's request, choose a structure appropriate to the purpose:

**Portfolio / case study** — lead with the outcome, then evidence, then story.
**Strategy / pitch** — lead with the problem, then solution, then plan.
**Project update** — lead with status/outcome, then detail, then next steps.
**Research readout** — lead with findings, then evidence, then recommendations.

A well-formed presentation follows this structure:

1. **Cover / title slide** — title, your name, date
2. **Contents / agenda** — always include this after the cover
3. **Core content slides** — evidence, data, narrative (bulk of the deck)
4. **Conclusion / recommendation** — key takeaway or next step
5. **Closing slide** — thank you, contact info, or discussion prompt

Count the planned slides — you'll tell the user this number so they can set it in Gamma.

### Step 2: Write the markdown

Write the full deck content as structured markdown. Each `##` heading = one slide. Follow **`references/brand-voice.md`** for voice and **`references/gamma-content-guide.md`** for formatting rules.

**Key rules:**
- Slide titles: sentence case, state the conclusion, max 10 words
- Bullets: 3–5 per slide, one idea each, active voice
- Lead with outcome, support with evidence
- Numbers make the story real — always anchor claims in data
- One key message per slide

**Example markdown structure:**
```markdown
# Portfolio case study: group ordering

## Context

Group ordering unlocked office and B2B use cases that were impossible before.

## The problem

Food delivery was built for solo orders. Office teams had no way to order together — they called restaurants directly or picked a single person to order for everyone.

## What we built

We redesigned the checkout flow to allow multiple participants to add items from the same basket, with a single payment handled by the organiser.

## Results

We launched in 6 markets over 3 months. Within 90 days:

- **+57% AOV** (€28 → €44)
- **+83% revenue per order**
- **+166% margin per order**

## What made it work

Group orders had a higher intent signal — teams were more committed, less likely to abandon.

## What I learned

The biggest unlock wasn't the feature itself — it was removing the awkward payment conversation from the group.

## Thank you

Let's discuss. helmut.fritz.v@gmail.com
```

### Step 3: Output the markdown

Output the full markdown in a single fenced code block so the user can copy it in one click. Then add a short "How to use this in Gamma" section:

---

**How to paste this into Gamma:**

1. Go to [gamma.app](https://gamma.app) and click **Create new**
2. Choose **Generate** → **Paste in text**
3. Paste the markdown above
4. Set the slide count to **N** (the number of `##` headings)
5. Pick a theme, then click **Generate**

Gamma will turn each `##` heading into a slide, preserving your wording and structure.

---

That's it. No API key needed.

---

## Recommended slide counts by deck type

| Deck type | Slides | Structure |
|-----------|--------|-----------|
| Portfolio case study | 7–10 | Cover, contents, context, problem, approach, results, learning, close |
| Strategy pitch | 8–11 | Cover, contents, problem, opportunity, solution, how it works, impact, timeline, ask, close |
| Project update | 5–7 | Cover, contents, status, what we did, results, blockers, next steps |
| Research readout | 10–14 | Cover, contents, background, method, summary, 3–4 findings, quotes, recommendations, close |
| Quick update / 1-pager | 3–5 | Cover, context, headline, next steps |

---

## Brand voice quick reference

Full rules in **`references/brand-voice.md`**.

- **Sentence case everywhere** — only first word and proper nouns capitalised
- **Lead with the outcome** — headline states the conclusion, body is the evidence
- **Numbers make the story real** — anchor claims in data
- **One key message per slide** — if a slide has two points, split it
- **Active voice** — "we shipped X" not "X was shipped"
- **Tight copy** — 3–5 bullets per slide, 8–15 words per bullet

---

## Gamma UI tips (pass these on to the user when relevant)

- **Slide count matters** — set it to match the number of `##` headings. Too few and Gamma merges slides; too many and it adds filler.
- **Theme choice** — dark/minimal themes (e.g. "Pitch Dark", "Executive") work best for portfolio and strategy decks. Light themes suit research readouts.
- **Regenerate individual slides** — after generation, you can click a slide and hit "Regenerate card" if a specific one didn't land well. No need to redo the whole deck.
- **Edit text directly** — all text is editable after generation. Use this to tighten wording or fix any AI rewrites.
- **Export** — free plan exports to PDF and PPTX from the Share menu.

---

## API mode (Pro plan only)

If `GAMMA_API_KEY` is set, use `scripts/gamma-cli` to generate directly without copy-pasting.

**Check auth:**
```bash
scripts/gamma-cli themes
```

**Generate:**
```bash
scripts/gamma-cli create \
  --text-file /tmp/gamma-deck.md \
  --title "Presentation title" \
  --num-cards 8 \
  --tone "professional" \
  --audience "hiring managers"
```

Returns JSON with `gammaUrl`. See `conf/api-key-setup.md` for setup. API requires Pro, Ultra, Team, or Business plan.

**Full create options:**

| Option | Default | Notes |
|--------|---------|-------|
| `--text <markdown>` | required | Inline markdown content |
| `--text-file <path>` | — | Path to markdown file |
| `--title <string>` | from `#` heading | Presentation name in Gamma |
| `--format` | `presentation` | `presentation`, `document`, `webpage` |
| `--text-mode` | `preserve` | Keep exact text |
| `--num-cards <n>` | — | Should match number of `##` headings |
| `--theme <id>` | Gamma default | Theme ID from `gamma-cli themes` |
| `--tone <string>` | — | e.g. `"professional"`, `"confident"` |
| `--audience <string>` | — | e.g. `"hiring managers"`, `"C-suite"` |
| `--dimensions` | `16x9` | `16x9`, `4x3`, `fluid` |
| `--image-source` | `webFreeToUseCommercially` | |
| `--export-as` | — | `pdf`, `pptx`, `png` |
