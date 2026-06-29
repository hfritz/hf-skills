# Gamma API Key Setup

## Get your API key

1. Log in at [gamma.app](https://gamma.app) (requires Pro, Ultra, Team, or Business plan)
2. Go to **Settings → API** (or visit gamma.app/settings/api)
3. Create a new API key — it starts with `skgamma-`

## Store the key

Set the `GAMMA_API_KEY` environment variable. Add to your shell profile (`~/.zshrc` or `~/.zprofile`):

```bash
export GAMMA_API_KEY="skgamma-your-key-here"
```

Then reload: `source ~/.zshrc`

## Verify it works

```bash
scripts/gamma-cli themes
```

Should return a list of available themes.

## Credit usage

Each presentation costs credits based on number of cards and images:
- ~1–3 credits per card
- Image generation costs extra (2–125 per image depending on model)
- `webFreeToUseCommercially` images are cheapest
- `noImages` costs the least

Check your credit balance at gamma.app/settings/api.
