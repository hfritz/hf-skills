# hf-slides

Generate Google Slides presentations using Helmut's personal template, brand voice, and visual identity — directly via the Slides API.

## The problem it solves

Creating a presentation is slow: open the template, duplicate slides, replace placeholder text, fix fonts that broke, adjust layouts, repeat. For a polished personal brand, every deck needs the same structure, the same voice, and the same visual rules applied consistently. This skill automates that entirely.

## What it does

1. **Plans the deck** — selects appropriate slide types and structure based on the presentation purpose (portfolio case study, strategy pitch, project update, research readout)
2. **Clones the personal template** via the Slides API
3. **Removes unwanted slides** and arranges the ones needed
4. **Populates content** — fills text elements while preserving font, size, weight, and color from the visual identity spec
5. **Returns a shareable link** to the finished presentation

## Visual identity

All decks follow Helmut's personal brand:
- **Slate** (`#1e3a5f`) for covers and section dividers
- **Amber** (`#e87c22`) as the accent color
- **Cream** (`#f6f1ea`) as the default content slide background
- **Inter** throughout — Black 36pt for divider headlines, Normal 11pt for body
- Sentence case everywhere. Lead with the outcome. One key message per slide.

## Usage

```
/hf-slides create a portfolio case study for the JET+ subscriptions project
/hf-slides build a 10-slide strategy pitch for Q3 planning
/hf-slides make a research readout from @user-research-synthesis.md
```

## Prerequisites

Requires Google OAuth credentials. On first use:

```bash
scripts/slides-cli auth login --credentials conf/credentials.json
```

See `conf/credentials-setup.md` if you need to create credentials first.

## Supported presentation types

| Type | Structure |
|------|-----------|
| Portfolio / case study | Outcome → evidence → story |
| Strategy / pitch | Problem → solution → plan |
| Project update | Status → what we did → next steps |
| Research readout | Findings → evidence → recommendations |
