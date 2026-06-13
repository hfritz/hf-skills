# HF Template Slide Catalogue

> Template ID: `1f1t52kxB3satmCRLo1PxY4wywZSKFT4T5Np0t9WsOfo`
> Total slides: **24**
> Primary font in use: **Lato** (not Inter — template pre-dates the Inter-first spec; restore with Lato when using `set-text` on existing elements)

---

## Important: Font Reality vs. Spec

The visual identity doc says Inter, but this template was built with **Lato**. When restoring formatting after `set-text`, match what the element already uses:

| Element type | Font | Weight | Size |
|---|---|---|---|
| Slide title (h1) | Lato | Black (900) | 24pt |
| Eyebrow label | Lato | Bold (700) | 12pt |
| Big statement | Lato | Regular (400) or Bold (700) | 36–48pt |
| Body / bullets | Lato | Bold (700) or Regular (400) | 10–14pt |
| Caption / footnote | Lato | Regular (400) | 9pt |
| Annotation (Caveat font) | Caveat | Regular (400) | 12pt |
| Next steps body | Inter | Regular (400) | 12pt |
| Vision/pillars body | Inter | Bold (700) | 12pt |

---

## Common Placeholder Patterns

Run immediately after cloning to handle recurring placeholders:

```bash
scripts/slides-cli edit replace-text \
  --presentation "<PRES_ID>" \
  --replacements '[
    {"placeholder": "May 2026", "value": "June 2026"},
    {"placeholder": "Helmut Fritz", "value": "Helmut Fritz"},
    {"placeholder": "COMPANY_LOGO", "value": ""},
    {"placeholder": "Slides template'\''s title", "value": "Your Presentation Title"},
    {"placeholder": "Slides template'\''s subtitle", "value": "Your subtitle here"}
  ]'
```

---

## Slide Catalogue

### Slide 0: Cover
> `objectId: g36905ce9408_0_28`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title + subtitle | `g36905ce9408_0_30` | "Slides template's title\nSlides template's subtitle" | Lato Black 48pt |
| Author + date | `g36905ce9408_0_31` | "Helmut Fritz\nMay 2026" | Lato Regular 10pt |
| Author headshot | `g36905ce9408_0_33` | Image (small circle) | — |
| Context label | `g3e52fc15a06_0_0` | "COMPANY_LOGO" | Roboto Regular 15pt |

**Notes:** Background image is baked in (cannot be swapped via API). Replace `COMPANY_LOGO` with the company name or clear it.

---

### Slide 1: Agenda / Contents
> `objectId: g391a3a8cbd5_0_929`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title | `g391a3a8cbd5_0_932` | "Agenda" | Lato Black 24pt |
| Agenda items | `g391a3a8cbd5_0_930` | Bullet list | Lato Regular 14pt |
| Decorative image | `g391a3a8cbd5_0_933` | Baked-in image | — |

**Capacity:** ~5–8 agenda items. Use `\n\n` between items for spacing.

---

### Slide 2: Executive summary (tabular, 6-field)
> `objectId: g3e52fc15a06_0_1`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title | `g3e52fc15a06_0_3` | "Executive summary" | Lato Black 24pt |
| 6-field table | `g3e52fc15a06_0_5` | Goal / Who / Insight / Strategy / Solution / Success | Inter Bold 12pt |

**Notes:** The 6-field element uses a vertical tab character between the label and description. Format: `Label⏎Description text.` Use `` in JSON for the vertical tab.

**When to use:** Portfolio/case study opening summary with structured 6-field overview.

---

### Slide 3: Executive summary (numbered, 3-point)
> `objectId: g3e52fc15a06_0_106`

| Element | objectId | Content | Font |
|---|---|---|---|
| Eyebrow | `g3e52fc15a06_0_108` | "EXECUTIVE SUMMARY" | Lato Bold 12pt, Amber |
| Headline | `g3e52fc15a06_0_109` | Tagline sentence | Lato Bold 24pt, Charcoal |
| Point 1 number | `g3e52fc15a06_0_110` | "1" | Lato Bold 20pt, Amber |
| Point 1 text | `g3e52fc15a06_0_111` | Title\nDescription | Lato Bold 14pt |
| Point 2 number | `g3e52fc15a06_0_113` | "2" | Lato Bold 20pt, grey |
| Point 2 text | `g3e52fc15a06_0_114` | Title\nDescription | Lato Bold 14pt |
| Point 3 number | `g3e52fc15a06_0_118` | "3" | Lato Bold 20pt, Amber |
| Point 3 text | `g3e52fc15a06_0_119` | Title\nDescription | Lato Bold 14pt |
| Italic summary | `g3e52fc15a06_0_121` | One-line synthesis | Lato Italic 13pt, Amber |

**Notes:** Numbers and text elements are inside groups — use `replaceAllText` via batch. Numbers 1 and 3 are Amber; 2 is grey (alternating rhythm).

---

### Slide 4: Assumptions / text-heavy content
> `objectId: g391a3a8cbd5_0_236`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title | `g391a3a8cbd5_0_896` | Section title | Lato Black 24pt |
| Body | `g391a3a8cbd5_0_985` | Bullet list with headers | Lato Bold 13pt |

**Capacity:** ~300–400 chars. Use headers + body within same text box via mixed formatting.

**When to use:** Scope, assumptions, caveats, methodology.

---

### Slides 5, 6, 7, 19: Big statement / question slides
These are clean white slides with a single large centred text box. No title bar.

| Slide | objectId | Text element | Font |
|---|---|---|---|
| 5 (Why?) | `g36905ce9408_0_4770` | `g36905ce9408_0_4771` | Lato Regular 37pt |
| 6 (Who?) | `g36905ce9408_0_4927` | `g36905ce9408_0_4928` | Lato Regular 36pt |
| 7 (What?) | `g391a3a8cbd5_0_1387` | `g391a3a8cbd5_0_1388` | Lato Regular 36pt |
| 19 (How?) | `g3b01dba4a5a_2_109` | `g3b01dba4a5a_2_110` | Lato Bold 36pt |

**Notes:** The parenthetical hint `(Why?)` is part of the original placeholder text — replace or remove it. Great for rhetorical framing between sections.

---

### Slide 8: Funnel / data visualization
> `objectId: g391a3a8cbd5_0_978`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title | `g391a3a8cbd5_0_979` | Slide headline | Lato Black 24pt |
| Key takeaways | `g391a3a8cbd5_0_1104` | Bullet callout below chart | Lato Bold 14pt |
| Stage labels | Various | Discovery/Interest/Consideration/Activation/Retention | Lato Bold 10pt |
| Drop-off labels | Various | "X% drop-off" | Lato Bold 10pt, red or grey |

**Notes:** Complex slide with many baked-in graphical elements. Replace text labels only. Difficult to repurpose for non-funnel topics.

---

### Slide 9: Funnel variant (highlighted stages)
> `objectId: g3b01dba4a5a_1_1`

Same funnel structure as slide 8. Title: `g3b01dba4a5a_1_2`. Certain stages are visually de-emphasised to focus attention on key drop-off points.

**When to use:** Funnel where you want to highlight 1–2 specific stages.

---

### Slide 10: Content slide — large image + sidebar insights
> `objectId: g391a3a8cbd5_0_988`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title | `g391a3a8cbd5_0_989` | Slide headline | Lato Black 24pt |
| Right sidebar | `g391a3a8cbd5_0_990` | "Key Insights\n[bullets]" | Lato Bold 12pt |
| Main image | `g3b01dba4a5a_2_134` | Large image, ~4/6 width | — |

**When to use:** Research readouts where a screenshot/chart is the anchor and key insights annotate it.

---

### Slide 11: Before / After comparison
> `objectId: g3e52fc15a06_0_402`

| Element | objectId | Content | Font |
|---|---|---|---|
| Eyebrow | `g3e52fc15a06_0_404` | "THE PROBLEM" or section label | Lato Bold 12pt, red |
| Headline | `g3e52fc15a06_0_405` | Problem statement | Lato Bold 24pt |
| Current state label | `g3e52fc15a06_0_407` | "Current State: [name]" | Lato Bold 12pt, dark red |
| Current state bullets | `g3e52fc15a06_0_408` | 3 negative points | Lato Bold 8pt |
| Current state items | `g3e52fc15a06_0_409`, `_410`, `_411` | Item names | Lato Bold 12pt |
| Target state label | `g3e52fc15a06_0_413` | "Target State: [name]" | Lato Bold 12pt, dark red |
| Target state summary | `g3e52fc15a06_0_414` | Italic synthesis | Lato Italic 13pt, dark red |
| Arrow | `g3e52fc15a06_0_421` | "→" | Lato Black 36pt |

**Notes:** Elements are inside groups — use `replaceAllText` via batch for replacement.

**When to use:** Problem framing — current state vs target state.

---

### Slide 12: Two-section segment / scope slide
> `objectId: g3b01dba4a5a_2_21`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title | `g3b01dba4a5a_2_26` | "Segment focus" | Lato Black 24pt |
| Primary section | `g3b01dba4a5a_2_37` | Long bullet list with headers | Lato Bold 10pt |

**Notes:** Left panel (green bg) = primary/in-scope; right panel = out of scope. Background panels are baked-in shapes.

**When to use:** Scope definition, user segmentation, in/out of scope.

---

### Slide 13: Vision + strategic pillars (3 cards)
> `objectId: g391a3a8cbd5_0_1358`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title | `g391a3a8cbd5_0_1367` | Section title | Lato Black 24pt |
| Vision statement | `g391a3a8cbd5_0_1359` | Big vision/mission text | Inter Regular 17pt, grey bg |
| Pillar label | `g391a3a8cbd5_0_1360` | "Strategic pillars" | Inter Bold 12pt |
| Pillar 1 (pink) | `g391a3a8cbd5_0_1362` | "Flexibility\n\n\nSubtitle" | Inter Bold 12pt |
| Pillar 2 (orange) | `g391a3a8cbd5_0_1364` | "Reliability\n\n\nSubtitle" | Inter Bold 12pt |
| Pillar 3 (green) | `g391a3a8cbd5_0_1361` | "Insight\n\n\nSubtitle" | Inter Bold 12pt |

**Notes:** Pillar text uses `\n\n\n` to push subtitle below the pillar name (icon space). Cards are pink (`#ffd8ea`), orange (`#ffc9a6`), and green (`#c8fff0`).

**When to use:** Vision/strategy slides with 3 strategic pillars.

---

### Slides 14–17: Feature detail (split layout)

Four slides sharing an identical structure. Duplicate any of them to create more feature slides.

| Slide | objectId | Feature | Right bg colour |
|---|---|---|---|
| 14 | `g3b01dba4a5a_1_100` | Invoice versioning | Pink |
| 15 | `g3b01dba4a5a_2_51` | Flexible pricing input | Orange |
| 16 | `g3b01dba4a5a_2_86` | Recurring billing & payments | Yellow-green |
| 17 | `g3b01dba4a5a_1_125` | Receivables overview | Mint green |

**Common element pattern (slide 14 as reference):**

| Element | objectId | Content | Font |
|---|---|---|---|
| Feature title | `g3b01dba4a5a_1_113` | Feature name | Lato Black 24pt |
| Foundational tag | `g392b2b174c6_0_0` | "(Foundational capability)" | Lato Bold 10pt |
| Pillar tag 1 | `g3b01dba4a5a_1_111` | "Flexibility" | Lato Bold 8pt, pink bg |
| Pillar tag 2 | `g3b01dba4a5a_1_110` | "Reliability" | Lato Bold 8pt, orange bg |
| Problem desc | `g3b01dba4a5a_1_108` | Short problem sentence | Lato Regular 9pt |
| Why important | `g3b01dba4a5a_1_103` | "Why is it important?\n[bullets]" | Lato Bold 10pt, grey bg |
| Screenshot | `g3b01dba4a5a_2_75` | Feature screenshot | — |
| Annotation labels | `g3b01dba4a5a_1_104`, `_105` | Callout text | Caveat Regular 12pt |

**Notes:** Left half = white bg with feature description. Right half = coloured bg with screenshot and Caveat annotations. Read each slide individually to get exact element IDs before editing.

**When to use:** Feature specs, product improvements, "what we're building" in portfolio or strategy decks.

---

### Slide 18: Trade-offs / what we're not solving
> `objectId: g3b01dba4a5a_2_138`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title | `g3b01dba4a5a_2_140` | "What I'm intentionally not solving yet" | Lato Black 24pt |
| Trade-off 1 | `g3b01dba4a5a_2_141` | "Trade-off 1: [name]\n[rationale]" | Lato Bold 12pt |
| Trade-off 2 | `g392b2b174c6_0_17` | "Trade-off 2: ..." | Lato Bold 12pt |
| Trade-off 3 | `g392b2b174c6_0_20` | "Trade-off 3: ..." | Lato Bold 12pt |
| Quote 1 | `g392b2b174c6_0_16` | Supporting user quote | Lato Regular 10pt, grey bg |
| Quote 2 | `g392b2b174c6_0_19` | Supporting user quote | Lato Regular 10pt, grey bg |
| Quote 3 | `g392b2b174c6_0_21` | Supporting user quote | Lato Regular 10pt, grey bg |

**Notes:** Left = trade-off justifications, right = supporting quotes. Three trade-offs is the intended capacity.

**When to use:** Scope decisions, exclusions, prioritisation rationale.

---

### Slide 20: Phased roadmap / implementation plan
> `objectId: g3e52fc15a06_0_701`

| Element | objectId | Content | Font |
|---|---|---|---|
| Eyebrow | `g3e52fc15a06_0_703` | "IMPLEMENTATION" | Lato Bold 12pt, red |
| Title | `g3e52fc15a06_0_704` | "Phased Rollout: ..." | Lato Bold 20pt |
| Phase 1 label | `g3e52fc15a06_0_708` | "Phase 1 · Q1-Q2" | Lato Bold 10pt, red |
| Phase 1 name | `g3e52fc15a06_0_711` | "Foundation" | Lato Bold 14pt |
| Phase 1 bullets | `g3e52fc15a06_0_712` | Bullet list | Lato Regular 10pt |
| Phase 1 outcome | `g3e52fc15a06_0_713` | Italic outcome | Lato Bold 10pt |
| Phase 2 label | `g3e52fc15a06_0_716` | "Phase 2 · Q3-Q4" | Lato Bold 10pt, dark red |
| Phase 2 name | `g3e52fc15a06_0_719` | "Intelligence" | Lato Bold 14pt |
| Phase 2 bullets | `g3e52fc15a06_0_720` | Bullet list | Lato Regular 10pt |
| Phase 2 outcome | `g3e52fc15a06_0_722` | Italic outcome | Lato Bold 10pt |
| Phase 3 label | `g3e52fc15a06_0_725` | "Phase 3 · Q1+ (Y2)" | Lato Bold 10pt, deep red |
| Phase 3 name | `g3e52fc15a06_0_728` | "Autonomy" | Lato Bold 14pt |
| Phase 3 bullets | `g3e52fc15a06_0_729` | Bullet list | Lato Regular 10pt |
| Phase 3 outcome | `g3e52fc15a06_0_731` | Italic outcome | Lato Bold 10pt |

**Notes:** All elements are inside groups — use `replaceAllText` via batch for content.

**When to use:** Roadmap, phased strategy, implementation timeline.

---

### Slide 21: Success metrics (3-column numbered)
> `objectId: g3b01dba4a5a_2_113`

| Element | objectId | Content | Font |
|---|---|---|---|
| Title | `g3b01dba4a5a_2_126` | "Success metrics" | Lato Black 24pt |
| Col 1 header | `g3b01dba4a5a_2_122` | "North Star Metric" | Lato Bold 12pt |
| Col 2 header | `g3b01dba4a5a_2_123` | "Primary metrics" | Lato Bold 12pt |
| Col 3 header | `g3b01dba4a5a_2_125` | "Secondary metrics" | Lato Bold 12pt |
| Col 1 content | `g3b01dba4a5a_2_115` | Metric + why explanation | Lato Bold 11pt, grey bg |
| Col 2 content | `g3b01dba4a5a_2_114` | Metrics list with headers | Lato Bold 11pt, grey bg |
| Col 3 content | `g3b01dba4a5a_2_116` | Supporting metrics list | Lato Bold 11pt, grey bg |
| Col 1 number | `g3b01dba4a5a_2_118` | "1" | Helvetica Neue Bold 96pt, yellow |
| Col 2 number | `g3b01dba4a5a_2_121` | "2" | Helvetica Neue Bold 96pt, orange |
| Col 3 number | `g3b01dba4a5a_2_124` | "3" | Helvetica Neue Bold 96pt, pink |

**Notes:** Large decorative numbers in yellow/orange/pink. Column backgrounds match. Column backgrounds are yellow, orange, and pink respectively.

**When to use:** OKRs, metrics frameworks, KPI definition slides.

---

### Slide 22: Next steps (split with full-bleed image)
> `objectId: g36905ce9408_0_5420`

| Element | objectId | Content | Font |
|---|---|---|---|
| Full-bleed left image | `g36905ce9408_0_5421` | Decorative image | — |
| Section title | `g36905ce9408_0_5427` | "Next steps" | Inter Bold 19pt |
| Body bullets | `g36905ce9408_0_5426` | Action items list | Inter Regular 12pt |
| Grey right bg | `g391a3a8cbd5_0_1334` | Grey background block | — |

**Notes:** Left image is baked in and cannot be changed. Right side: grey bg with text.

**When to use:** Penultimate slide — what happens next, action items, follow-up plan.

---

### Slide 23: Thank you / Closing
> `objectId: g391a3a8cbd5_0_1324`

| Element | objectId | Content | Font |
|---|---|---|---|
| Thank you text | `g391a3a8cbd5_0_1325` | "Thank you!" | Lato Black 36pt |

Clean white slide. Replace with any closing message.

---

## Slides to Always Delete

This template is a single complete presentation — **there are no template-internal slides to always delete**. Simply delete whichever slides you don't need for your specific deck after cloning.

---

## Recommended Slide Combinations by Presentation Type

### Interview case study (10–14 slides)
1. Cover (0)
2. Contents (1)
3. Assumptions (4)
4. Big statement — Why? (5)
5. Funnel/data slide (8 or 9)
6. Big statement — Who? (6)
7. Content + image + insights (10)
8. Big statement — What? (7)
9. Before/After comparison (11) or Vision + pillars (13)
10. Feature detail slides (14–17, as many as needed)
11. Trade-offs (18)
12. Big statement — How? (19)
13. Success metrics (21)
14. Thank you (23)

### Strategy pitch (8–10 slides)
1. Cover (0)
2. Contents (1)
3. Executive summary — numbered (3)
3. Before/After comparison (11)
4. Vision + pillars (13)
5. Feature detail slides x2–3 (14–17)
6. Phased roadmap (20)
7. Success metrics (21)
8. Next steps (22)
9. Thank you (23)

### Project update (5–7 slides)
1. Cover (0)
2. Executive summary — tabular (2)
3. Data/funnel or image + insights (8–10)
4. Feature detail x1 (14–17)
5. Success metrics (21)
6. Next steps (22)
7. Thank you (23)
