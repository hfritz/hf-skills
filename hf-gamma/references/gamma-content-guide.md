# Gamma Content Guide

How to structure the markdown that drives each Gamma generation.

## How Gamma reads your input

Gamma treats your `inputText` as a structured document. With `textMode: preserve`, it keeps your words intact and maps the structure to slides. The key mapping rules:

| Markdown element | Gamma output |
|-----------------|--------------|
| `##` heading | New slide, heading becomes the card title |
| `###` subheading | Section within a slide |
| Bullet list (`-`) | Bullet list card content |
| Bold (`**text**`) | Emphasis within content |
| Plain paragraph | Body copy on the card |
| `---` horizontal rule | Explicit slide break (use sparingly — `##` is cleaner) |

## Slide count

Set `--num-cards` to match the number of `##` headings you write. Gamma will try to distribute content across that many slides. If you write 10 `##` sections, pass `--num-cards 10`.

## Recommended markdown structure

```markdown
# Presentation Title

## Slide title (conclusion, sentence case)

Body content or bullets for this slide.

- Point one
- Point two
- Point three

## Next slide title

Continue the narrative...
```

- The `#` title becomes the presentation title if `--title` is not set separately
- Each `##` is one slide
- Keep each slide section to ~100 words max — Gamma condenses what doesn't fit

## Divider / section slides

To signal a section break (similar to a Google Slides divider), use a minimal `##` with no body content:

```markdown
## Part 2: what we built
```

Gamma will render this as a transitional card.

## Stats and callouts

Gamma picks up bold text as emphasis elements. Use sparingly to highlight key numbers:

```markdown
## Revenue grew after group ordering launch

We launched group ordering in March. Within 90 days:

- **+57% AOV** (€28 → €44)
- **+83% revenue per order**
- **+166% margin per order**
```

## Things that work well in Gamma

- Clean outline structure (one idea per `##` slide)
- Bullet lists with 3–5 items
- A clear title that states the conclusion
- Numbers and evidence in the body

## Things to avoid

- Nested bullet lists (3+ levels) — Gamma struggles to layout these cleanly
- Tables with many columns — they often overflow
- Very long paragraphs — break into bullets or shorten
- Mixed heading levels (`##` and `###`) on the same content block — pick one

## Choosing a theme

Run `scripts/gamma-cli themes` to list available themes and their IDs. For professional/portfolio decks, dark or minimal themes work best. Pick a theme that has strong contrast and doesn't clash with Helmut's amber/slate identity.

## Image guidance

| Use case | `--image-source` setting |
|----------|--------------------------|
| Professional / portfolio | `webFreeToUseCommercially` |
| Internal / no images needed | `noImages` |
| Creative / AI images | `aiGenerated` (costs more credits) |

Default: `webFreeToUseCommercially`.
