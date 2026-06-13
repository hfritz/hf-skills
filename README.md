# hf-skills

Personal Claude Code skills for product work. Each one encodes a repeatable workflow — so I don't re-explain the same context every session, and Claude can act on institutional knowledge from the first message.

## Why this exists

Most AI usage is stateless: you explain the context, get an answer, and the next session starts from zero. Skills change that. A skill is a persistent instruction set — it carries your process, your standards, your domain knowledge, and your output format. Once written, it runs the same way every time.

I'm a product person, not a full-time engineer. AI tools are genuinely useful for the work I do every day: turning research into insight, communicating decisions to multiple stakeholders, bootstrapping new projects, building things. These skills are the workflows I kept repeating, now codified.

## Skills

| Skill | What it does | Use when |
|-------|-------------|----------|
| [`/hf-new-project`](hf-new-project/SKILL.md) | Bootstrap a new project from my personal template. Grills you on the project until the core is clear, then generates README, CLAUDE.md, product spec, and UI spec. | Starting anything new |
| [`/hf-slides`](hf-slides/SKILL.md) | Generate Google Slides presentations using my personal template, brand voice, and visual identity — via the Slides API. | Creating decks, case studies, strategy readouts |
| [`/meeting-notes-processor`](meeting-notes-processor/SKILL.md) | Extract action items from messy meeting notes and append a structured summary (owner, priority, due date) directly to the source file. | After any meeting that generates follow-up work |
| [`/multi-audience-comms`](multi-audience-comms/SKILL.md) | Turn one source (research findings, a decision, a sprint update) into Slack update + executive email + detailed doc in a single pass. | Communicating the same thing to different stakeholders |
| [`/user-research-synthesizer`](user-research-synthesizer/SKILL.md) | Read a folder of interview transcripts and produce a structured synthesis: pain points by frequency, direct quotes, feature requests, revenue signals, and recommendations. | After any round of user research |

## The approach

Each skill is a `SKILL.md` file — a plain markdown file that tells Claude exactly how to run a specific workflow. No code, no build step. Drop it in `~/.claude/skills/<name>/SKILL.md` and invoke it with `/<name>`.

The best skills don't just automate — they encode judgment. `/hf-new-project` grills you relentlessly before writing a single file because vague input produces vague specs. `/user-research-synthesizer` always counts frequency before making claims because patterns only exist across a full dataset. The process is part of the value.

## Inspiration

The grilling approach in `/hf-new-project` is directly inspired by [Matt Pocock's grill-with-docs skill](https://github.com/mattpocock/skills).

## Setup

Install any skill by copying the folder to your Claude Code skills directory:

```bash
cp -r <skill-folder> ~/.claude/skills/
```

Then invoke it in any Claude Code session with `/<skill-name>`.
