---
name: hf-slides
description: Generate personal Google Slides presentations for Helmut Fritz using his personal template, brand voice, and visual identity. Use when creating slide decks, presentations, pitch decks, case study readouts, portfolio pieces, project updates, strategy decks, or any Google Slides content for Helmut's professional or personal use. Triggers on requests to create presentations, make slides, build a deck, prepare a readout, or generate Google Slides output. This skill creates actual Google Slides presentations via the Slides API — it does NOT apply to PowerPoint files, PDF reports, Confluence pages, markdown documents, README files, Slack messages, React components, or any non-Google-Slides output. If the user wants a presentation or deck (not a document, report, or code), use this skill.
metadata:
  owner: helmut-fritz
---

# HF Slides Skill

Create personal Google Slides presentations for Helmut Fritz using his personal template, brand voice, and visual identity guidelines.

## CRITICAL: Image / Thumbnail Review

NEVER read or open slide thumbnail images (PNGs, JPGs, etc.) directly into the main conversation context. They are large and will cause "Request Entity Too Large" errors.

When reviewing slide thumbnails or any images:
- Always delegate to sub-agents using the Task tool
- Process images in batches of **5 or fewer** per sub-agent
- Have the sub-agent summarize findings in text; never pass images back to the main context

## Overview

This skill clones Helmut's personal presentation template, selects appropriate slide types for the content, populates them with his brand voice and visual identity, and returns a shareable Google Slides link.

## Prerequisites

The `slides-cli` tool is bundled at `scripts/slides-cli`. It installs dependencies on first run and executes the TypeScript source directly with `bun`.

### Authentication

Check auth status first:

```bash
scripts/slides-cli auth status
```

If not authenticated, run:

```bash
scripts/slides-cli auth login --credentials conf/credentials.json
```

This opens a browser for Google OAuth2. The token is stored at `~/.slides-cli/token.json`.

**Required scopes:** `https://www.googleapis.com/auth/presentations`, `https://www.googleapis.com/auth/drive`

**Credentials setup:** See `conf/credentials-setup.md` if you don't yet have a credentials file.

## Workflow

Follow these steps for every presentation request:

### Step 1: Plan the Deck

Based on the user's request, plan which slides to include. Choose a structure appropriate to the purpose:

**Portfolio / case study** — lead with the outcome, then evidence, then story.
**Strategy / pitch** — lead with the problem, then solution, then plan.
**Project update** — lead with status/outcome, then detail, then next steps.
**Research readout** — lead with findings, then evidence, then recommendations.

A well-formed personal presentation follows this structure:

1. **Cover slide** — title, your name, date
2. **Context / framing** — what this is about and why it matters
3. **Core content slides** — evidence, data, narrative (bulk of the deck)
4. **Conclusion / recommendation** — key takeaway or next step
5. **Closing slide** — thank you, contact info, or discussion prompt

Always include a **contents slide** after the cover — it gives every deck structure regardless of length.

See **`references/template-guide.md`** for the full catalogue of available slide types in the personal template.

### Step 2: Clone the Template

```bash
scripts/slides-cli create from-template \
  --template "1f1t52kxB3satmCRLo1PxY4wywZSKFT4T5Np0t9WsOfo" \
  --title "Your Presentation Title"
```

Returns JSON with `presentationId` and `url`. Save the `presentationId` for all subsequent commands.

### Step 3: Delete Unwanted Slides

Delete all slides you don't need. Keep only the slide types you plan to use.

**Template placeholder content:** The template contains pre-filled text, images, and diagrams as visual placeholders. These are expected — ignore them and replace only the text elements relevant to your deck. Do not attempt to replace or populate baked-in images or diagrams unless the user explicitly provides replacement content.

Use `delete-slides` with a JSON array of objectIds:

```bash
scripts/slides-cli edit delete-slides \
  --presentation "<PRES_ID>" \
  --slide-ids '["<OBJECT_ID_1>", "<OBJECT_ID_2>", ...]'
```

**Important:** Delete slides in a single batch call. The API uses objectIds (not indices), so ordering doesn't matter.

### Step 4: Arrange Slides (if needed)

To duplicate a slide (e.g., to create multiple content slides of the same type):

```bash
scripts/slides-cli edit duplicate-slide \
  --presentation "<PRES_ID>" \
  --slide-id "<OBJECT_ID>" \
  --position <0-BASED-INDEX>
```

### Step 5: Populate Content

#### Option A: Replace placeholder text globally

For placeholders that appear across slides (e.g., footer, presenter name):

```bash
scripts/slides-cli edit replace-text \
  --presentation "<PRES_ID>" \
  --replacements '[{"placeholder":"Month Year","value":"June 2026"},{"placeholder":"Helmut Fritz","value":"Helmut Fritz"}]'
```

#### Option B: Set text on a specific element

When you know the exact objectId of a text element:

```bash
scripts/slides-cli edit set-text \
  --presentation "<PRES_ID>" \
  --object-id "<ELEMENT_ID>" \
  --text "Your new content here"
```

Use `\n` in the text string for line breaks — the CLI converts `\n` to actual newlines automatically.

**CRITICAL: `set-text` strips ALL formatting.** After every `set-text` call, you MUST restore formatting with `updateTextStyle` via `edit batch`. Without this, text falls back to Arial. See **`references/slides-api-gotchas.md`** § "Formatting Restoration Recipes" for copy-paste JSON templates, and **`references/visual-identity.md`** § "Type Hierarchy for Slides" for the full font/size/weight spec table.

**Key rules:** Always include `"underline": false`. Use white text on dark (Slate, Amber) backgrounds. Batch all restorations into a single `edit batch` per slide.

#### Option C: Batch update (advanced)

For complex operations, send raw Google Slides API requests:

```bash
scripts/slides-cli edit batch \
  --presentation "<PRES_ID>" \
  --requests '[{"replaceAllText":{"containsText":{"text":"Lorem ipsum","matchCase":false},"replaceText":"Actual content"}},{"deleteObject":{"objectId":"someId"}}]'
```

### Step 6: Read Slide Structure

To discover element objectIds on a slide for targeted text updates:

```bash
scripts/slides-cli read slide \
  --presentation "<PRES_ID>" \
  --index <0-BASED-INDEX>
```

### Step 6b: Move or Resize Elements (Optional)

```bash
scripts/slides-cli edit update-element \
  --presentation "<PRES_ID>" \
  --object-id "<ELEMENT_ID>" \
  --x <EMU> --y <EMU> --width <EMU> --height <EMU>
```

All values are in EMU (English Metric Units). 1 inch = 914400 EMU.

### Step 6c: Update Text Style (Optional)

```bash
scripts/slides-cli edit update-text-style \
  --presentation "<PRES_ID>" \
  --object-id "<ELEMENT_ID>" \
  --font "Inter" --size 11 --bold true --color "#2b2b2b"
```

### Step 7: Share the Presentation

Share with a specific person:

```bash
scripts/slides-cli share user \
  --presentation "<PRES_ID>" \
  --email "helmut.fritz.v@gmail.com" \
  --role writer
```

### Step 8: Return the Link

Always return the presentation URL to the user. The URL format is:
`https://docs.google.com/presentation/d/<PRES_ID>/edit`

---

## Template Slide Reference

The personal template (`1f1t52kxB3satmCRLo1PxY4wywZSKFT4T5Np0t9WsOfo`) is catalogued in **`references/template-guide.md`**. Check that file for available slide types, objectIds, and content capacity guidelines.

---

## Recommended Slide Combinations by Presentation Type

### Portfolio Case Study (8-12 slides)
1. Cover — project name, your name, date
2. Contents
3. Context — what the situation was
4. The problem / opportunity
5. Your approach — what you did
6. Evidence — data, metrics, quotes
7. Outcome — results with numbers
8. What you learned
9. Closing / discussion

### Strategy Pitch (8-10 slides)
1. Cover
2. Contents
3. The problem (why this matters)
3. Current state / diagnosis
4. The opportunity
5. Proposed solution / approach
6. How it works (details)
7. Expected impact
8. Timeline / roadmap
9. What you need / ask
10. Closing

### Project Update (5-7 slides)
1. Cover
2. Contents
3. Status overview (RAG, milestone)
3. What we did
4. Key results or metrics
5. Risks / blockers
6. Next steps
7. Closing

### Research Readout (10-14 slides)
1. Cover
2. Contents
3. Background / objectives
4. Methodology
5. Executive summary
6. Finding 1 (with evidence)
7. Finding 2
8. Finding 3
9. Quotes / verbatims
10. Highs and lows
11. Recommendations
12. Closing

---

## Brand Voice Rules

Apply Helmut's **direct, warm, evidence-led** voice when writing slide content. Full rules in **`references/brand-voice.md`**.

**Critical rules to always follow:**
- **Sentence case everywhere** — capitalise only the first word and proper nouns. Never Title Case.
- **Lead with the outcome, then the evidence** — never bury the headline.
- **Numbers make the story real** — always anchor claims in data when available.
- **One key message per slide** — if a slide has two points, it needs two slides.
- **Active voice** — "we shipped X" not "X was shipped by the team".
- **Never underline** unless it's a hyperlink.
- **Text length limits** — stay within template text box capacity (see `references/template-guide.md`).

---

## Visual Identity Rules

Full colour palette, typography specs, and usage rules in **`references/visual-identity.md`**.

**Essential rules:**
- **Amber (`#e87c22`)** is the accent — use it on divider slides and key emphasis elements.
- **Slate (`#1e3a5f`)** for dark backgrounds on cover and section dividers.
- **Charcoal (`#2b2b2b`)** for all body text on light backgrounds. White text on Slate or Amber backgrounds.
- **Inter** font family for everything. Divider headlines: Inter Black 36pt. Body: Inter Normal 11pt. Footer: 8pt.
- **Cream (`#f6f1ea`)** as the default content slide background.

---

## CLI Command Reference

All commands return structured JSON: `{ok: true, cmd, result}` or `{ok: false, cmd, error, code}`. For the full command listing with all flags and options, see **`references/cli-reference.md`**.

---

## Known Limitations & Gotchas

See **`references/slides-api-gotchas.md`** for the full list.

**Top 3 to remember:** (1) `set-text` strips all formatting — always restore. (2) Group elements need `replaceAllText` via batch, not `set-text`. (3) Cover/closing background images in templates are baked in and cannot be swapped via API.

---

## Post-Population Polish: Vertical Centering

After populating content, apply `contentAlignment: MIDDLE` via `updateShapeProperties` to short-text elements in tall containers — quote bubbles, stat numbers, callout boxes, divider headlines.

**Never center:** body text paragraphs, page titles, footers, bullet lists, or parallel/grid layouts with variable content length.

See **`references/slides-api-gotchas.md`** § "Vertical Centering" for the recipe and rules.
