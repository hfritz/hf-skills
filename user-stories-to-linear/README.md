# user-stories-to-linear

A personal Claude skill that generates user stories (3 C's + INVEST) from a feature
description, a file, or pasted text — then pushes them into **Linear** as issues and
saves a local markdown copy.

Based on `pm-execution:user-stories`, extended with a Linear push that mirrors the
[Alineo](../../alineo/) integration (`issueCreate` GraphQL mutation) but uses a
personal API key instead of OAuth for portability.

## Setup

1. Create a Linear **personal API key**: https://linear.app/settings/api
2. Export it (add to your shell profile to persist):
   ```sh
   export LINEAR_API_KEY=lin_api_xxxxx
   ```
3. Requires Node 18+ (uses global `fetch`, no dependencies).

## Use

Invoke the skill in Claude Code and give it a feature any way you like:

- `@feature.md` (a file / PRD / spec)
- paste the text in chat
- type a short description

The skill will generate stories, save `user-stories-<slug>.md`, ask which Linear
team/project to target (or use the one you named), and create the issues.

## The script directly

```sh
# List teams (key, name, id)
node scripts/linear.mjs teams

# List projects (optionally for one team)
node scripts/linear.mjs projects [teamId]

# Push issues from a payload file
node scripts/linear.mjs push linear-push.json
```

Push payload (`linear-push.json`):

```json
{
  "team": "ENG",
  "project": "Q3 Backlog",
  "issues": [
    { "title": "Recently viewed section", "body": "As an ...", "labels": ["User Story"] }
  ]
}
```

`team` accepts a key, name, or id; `project` is optional (name or id). Labels are
created automatically if they don't exist. Output is JSON:
`{ ok, pushed: [{title,url,id}], failed: [{title,error}] }`.

## Notes

- The push is **not** idempotent — re-running creates duplicates.
- Titles should be short; the full story goes in the body (Linear renders markdown).

---

Built by [Helmut Fritz](https://helmutfritz.fyi/).
