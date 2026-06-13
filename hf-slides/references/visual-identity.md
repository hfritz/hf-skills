# HF Visual Identity Reference for Presentations

Personal visual identity for Helmut Fritz presentations.
Style: **Warm & approachable** — professional depth with human warmth.

## Colour Palette

### Primary

| Colour | Hex | RGB (0–1) | Usage |
|--------|-----|-----------|-------|
| **Slate** | `#1e3a5f` | 0.118, 0.227, 0.373 | Primary accent — numbered callouts, diagram boxes, phase dots, section dividers, cover backgrounds |
| **Slate mid** | `#4a709a` | 0.290, 0.439, 0.600 | Phase 2 / step 2 indicator in progression sequences |
| **Slate light** | `#7899bd` | 0.471, 0.600, 0.741 | Phase 1 / step 1 indicator in progression sequences |
| **Amber** | `#e87c22` | 0.910, 0.486, 0.133 | Secondary warm accent — use when Slate feels too cool; eyebrow labels, small highlights |

### Supporting — Warm neutrals

The template uses a four-step warm neutral scale for backgrounds and panel differentiation. Use in order (lightest → darkest) to distinguish pillars, columns, or feature panels.

| Colour | Hex | RGB (0–1) | Usage |
|--------|-----|-----------|-------|
| **Cream** | `#f6f1ea` | 0.965, 0.945, 0.918 | Default content background; pillar/column 1 |
| **Linen** | `#ede6d8` | 0.929, 0.902, 0.847 | Alt content background; pillar/column 2 |
| **Sand** | `#ddd5c8` | 0.867, 0.835, 0.784 | Feature panel backgrounds; pillar/column 3 |
| **Greige** | `#c9c2b8` | 0.788, 0.761, 0.722 | Strongest neutral panel; feature panel 4 |
| **Sage** | `#5e8b7e` | 0.369, 0.545, 0.494 | Optional secondary accent (use sparingly) |

### Neutrals

| Colour | Hex | RGB (0–1) | Usage |
|--------|-----|-----------|-------|
| **Charcoal** | `#2b2b2b` | 0.169, 0.169, 0.169 | Primary text colour on light backgrounds |
| **Stone** | `#8a8278` | 0.541, 0.510, 0.471 | Secondary text — captions, footnotes, sources, footers |
| **White** | `#ffffff` | 1.0, 1.0, 1.0 | Text on Slate or Amber backgrounds; clean backgrounds |
| **Warm white** | `#fafaf8` | 0.980, 0.980, 0.973 | Page background alternative to pure white |

## Colour Rules

### Critical Don'ts
1. **Never use Slate as a text colour** — reserve for backgrounds only
2. **Never use Amber as a text colour** — it's a background/accent, not a text colour
3. **Never use the old vivid palette** — no pink (#ffd8ea), orange (#ffc9a6), mint green (#c8ffec), or yellow-green (#faffa4). The template has been updated to warm neutrals; keep it consistent.
4. **Never place text in Stone on anything but white/cream/linen backgrounds** — contrast fails elsewhere
5. **Never use pure black** — use Charcoal instead

### Type Colour Rules (for slide text)

| Background | Text colour |
|-----------|-------------|
| White / Warm white / Cream / Linen / Sand / Greige | Charcoal |
| Amber | White |
| Slate | White |
| Sage | White or Charcoal (check contrast) |

**Never set type in Sand, Greige, Linen, Sage, or Stone** — these are background colours, not text colours.

### Amber Usage Principle
Amber is the signature accent. Every deck must use it — typically on divider slides between sections. Use it to create visual rhythm and energy throughout the deck:
- Section dividers: Amber background, White headline
- Key callouts: Amber background or Amber-bordered box
- Cover slides: Amber accent element or background

### The Bookend Principle
1. **Start with Slate** (cover) or **Amber** (high-energy cover)
2. **Use Cream / White** for most content slides
3. **Use Amber dividers** between major sections
4. **End with Slate** (closing) — brings the deck full circle
5. Minimum **25% of slides** should use Amber or Slate backgrounds

## Typography for Presentations

### Font: Inter
Use Inter throughout. It's professional, highly legible, and available in all weights needed.

### Type Hierarchy for Slides

| Role | Font | Size | Weight |
|------|------|------|--------|
| Divider headlines | Inter Black | 36pt | 900 |
| Cover title (line 1) | Inter Black | 36pt | 900 |
| Cover subtitle (line 2) | Inter Medium | 18pt | 500 |
| Section headings / slide titles | Inter Bold | 19pt | 700 |
| Subtitles / subheadings | Inter Bold | 11pt | 700 |
| Card headings | Inter Extra Bold | 13pt | 800 |
| Body text | Inter Regular | 11pt | 400 |
| Footer | Inter Regular | 8pt | 400 |
| Sources / captions | Inter Regular | 7pt | 400 |

### Formatting Restoration Reference (API)

After every `set-text` call, restore formatting using `updateTextStyle` via `edit batch`.

**Charcoal RGB:** `{"red": 0.169, "green": 0.169, "blue": 0.169}`
**White RGB:** `{"red": 1, "green": 1, "blue": 1}`
**Stone RGB:** `{"red": 0.541, "green": 0.510, "blue": 0.471}`

| Element role | SIZE | WEIGHT | COLOUR |
|-------------|------|--------|--------|
| Cover title line 1 | 36 | 900 | White (on Slate) or Charcoal (on light) |
| Cover title line 2 | 18 | 500 | White (on Slate) or Charcoal (on light) |
| Divider headline | 36 | 900 | White |
| Slide title / heading | 19 | 700 | Charcoal |
| Card heading | 13 | 800 | Charcoal |
| Subtitle / subheading | 11 | 700 | Charcoal |
| Body text | 11 | 400 | Charcoal |
| Quote text | 14 | 400 | Charcoal |
| Footer | 8 | 400 | Stone |
| Source / caption | 7 | 400 | Stone |

### Line Spacing
- **1.15** line spacing for body text

### Alignment
- **Left aligned** by default for all content
- Sentence case throughout — capitalise only the first word and proper nouns

### Underline Rule
- **Never underline text** unless it is a clickable hyperlink

## Slide Composition

### Layout Principles
- Generous white space — don't crowd slides
- One key message per slide
- Anchored with data — every claim earns its space
- Visuals (charts, screenshots, photos) carry more weight than text blocks

### Slide backgrounds by purpose

| Purpose | Background | Text |
|---------|-----------|------|
| Cover slide | Slate or Amber | White |
| Section divider | Amber | White |
| Executive summary | Cream | Charcoal |
| Content / body slides | White or Cream | Charcoal |
| Feature panels (right side) | Cream → Linen → Sand → Greige | Charcoal |
| Pillar cards / metric columns | Cream / Linen / Sand (lightest to darkest) | Charcoal |
| Quote / callout boxes | Cream | Charcoal |
| Data / metrics | White | Charcoal |
| Closing slide | Slate | White |

## Colours Reference for Slides API

```json
{
  "slate":        {"red": 0.118, "green": 0.227, "blue": 0.373},
  "slate_mid":    {"red": 0.290, "green": 0.439, "blue": 0.600},
  "slate_light":  {"red": 0.471, "green": 0.600, "blue": 0.741},
  "amber":        {"red": 0.910, "green": 0.486, "blue": 0.133},
  "cream":   {"red": 0.965, "green": 0.945, "blue": 0.918},
  "linen":   {"red": 0.929, "green": 0.902, "blue": 0.847},
  "sand":    {"red": 0.867, "green": 0.835, "blue": 0.784},
  "greige":  {"red": 0.788, "green": 0.761, "blue": 0.722},
  "sage":    {"red": 0.369, "green": 0.545, "blue": 0.494},
  "charcoal":{"red": 0.169, "green": 0.169, "blue": 0.169},
  "stone":   {"red": 0.541, "green": 0.510, "blue": 0.471},
  "white":   {"red": 1.0,   "green": 1.0,   "blue": 1.0}
}
```
