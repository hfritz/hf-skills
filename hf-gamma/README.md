# hf-gamma

Generate Gamma.app presentations for Helmut Fritz using his brand voice and storytelling style.

## What it does

Plans the deck and writes polished, structured markdown → you paste it into Gamma's UI → Gamma generates the slides. No API key or paid plan needed.

**Optional API mode** (Pro plan): uses `scripts/gamma-cli` to generate without copy-pasting. See `conf/api-key-setup.md`.

## Requirements

- **Free mode:** just a Gamma.app account (free tier works)
- **API mode:** Node.js 18+, `GAMMA_API_KEY` env var, Gamma Pro/Ultra/Team/Business plan

## How it works (free mode)

Claude writes the markdown → you copy it → paste into Gamma's "Generate → Paste in text" flow → done.

## Key differences from hf-slides

| | hf-slides (Google Slides) | hf-gamma (Gamma.app) |
|--|---------------------------|----------------------|
| Control | Element-by-element | Markdown → AI layout |
| Customisation | Full visual control | Theme selection only |
| Speed | Slower (many API calls) | Faster (one call + poll) |
| Brand fidelity | Exact template match | AI interpretation |

## Files

```
SKILL.md                  — skill instructions for Claude
scripts/gamma-cli         — CLI wrapper for Gamma API
conf/api-key-setup.md     — how to get and store your API key
references/brand-voice.md — Helmut's voice and writing style
references/gamma-content-guide.md — markdown formatting for Gamma
```
