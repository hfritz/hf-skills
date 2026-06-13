# Google Cloud Credentials Setup

To use the hf-slides skill you need your own Google Cloud OAuth credentials. This is a one-time setup that takes about 10 minutes.

## What you're creating

A Google Cloud project with the Slides and Drive APIs enabled, plus an OAuth 2.0 "Desktop app" credential. The skill uses this to authenticate as your personal Google account.

## Steps

### 1. Create a Google Cloud project

1. Go to https://console.cloud.google.com/
2. Click the project dropdown at the top → **New Project**
3. Name it something like `hf-slides-skill`
4. Click **Create**

### 2. Enable the required APIs

In your new project:

1. Go to **APIs & Services → Library**
2. Search for **Google Slides API** → click it → **Enable**
3. Search for **Google Drive API** → click it → **Enable**

### 3. Configure the OAuth consent screen

1. Go to **APIs & Services → OAuth consent screen**
2. Choose **External** (works for personal accounts)
3. Fill in:
   - App name: `HF Slides Skill`
   - User support email: `helmut.fritz.v@gmail.com`
   - Developer contact: `helmut.fritz.v@gmail.com`
4. Click **Save and Continue** through the Scopes and Test Users screens (no changes needed)
5. On the Test Users screen, add `helmut.fritz.v@gmail.com`
6. Click **Back to Dashboard**

### 4. Create OAuth credentials

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → OAuth client ID**
3. Application type: **Desktop app**
4. Name: `hf-slides-cli`
5. Click **Create**
6. Click **Download JSON** on the confirmation dialog

### 5. Save the credentials file

Move the downloaded JSON file to this directory and rename it:

```bash
mv ~/Downloads/client_secret_*.json /Users/hfritz/code/skills/hf-slides/conf/credentials.json
```

### 6. Authenticate

```bash
cd /Users/hfritz/code/skills/hf-slides
scripts/slides-cli auth login --credentials conf/credentials.json
```

This opens a browser. Sign in with `helmut.fritz.v@gmail.com` and click **Allow**.

You'll see a "Authentication successful" message. The token is saved to `~/.slides-cli/token.json`.

### 7. Verify

```bash
scripts/slides-cli auth status
```

Should return `"authenticated": true`.

### 8. Catalogue your template

Once authenticated, read your template to build the slide catalogue:

```bash
scripts/slides-cli read slide \
  --presentation "1f1t52kxB3satmCRLo1PxY4wywZSKFT4T5Np0t9WsOfo" \
  --all > /tmp/hf-template-slides.json
```

Then update `references/template-guide.md` with the slide types you find.

## Notes

- The credential JSON file is gitignored — don't commit it
- The OAuth token in `~/.slides-cli/token.json` refreshes automatically
- If auth expires, re-run the `auth login` command
- The "app" is in External/Testing mode — Google may show a warning screen; click "Continue" anyway since you're the only user
