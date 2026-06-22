# Steel & Zane — Landing Page

Real estate media landing page for Steel & Zane, deployed on Vercel.

## Project structure

```
public/
  index.html   — main landing page
  book.html    — booking questionnaire page
  style.css    — all styles (shared between pages)
  script.js    — landing page JS (contact form, nav, animations)
  book.js      — booking page JS (questionnaire redirect logic)
api/
  contact.js   — serverless function: handles contact form email via Nodemailer
vercel.json    — Vercel config (output directory, security headers)
```

## Local development

```bash
npm install
npm start       # runs: vercel dev
```

Requires the [Vercel CLI](https://vercel.com/docs/cli) installed globally (`npm i -g vercel`).

## Saving and deploying changes

After making edits to any files, run these three commands in your terminal to save them to GitHub and trigger a live deploy:

```bash
git add .
git commit -m "describe what you changed"
git push
```

**What each command does:**

| Command | What it does |
|---------|--------------|
| `git add .` | Stages all changed files, telling Git you want to include them in the next save |
| `git commit -m "..."` | Saves a snapshot of your changes with a short description (replace the message with your own) |
| `git push` | Uploads the commit to GitHub, which triggers Vercel to automatically redeploy your live site |

> **Tip:** Run `git status` at any time to see which files have been changed but not yet committed.

### Working with branches

Branches let you make and test changes without touching the live site until you're ready.

**See all branches:**
```bash
git branch
```
The branch with a `*` next to it is the one you're currently on.

**Switch to an existing branch:**
```bash
git checkout branch-name
```

**Create a new branch and switch to it:**
```bash
git checkout -b new-branch-name
```

**Push a new branch to GitHub for the first time:**
```bash
git push -u origin new-branch-name
```

**Merge a branch into main when you're ready to go live:**
```bash
git checkout main
git merge branch-name
git push
```

> **Tip:** Always commit or stash your changes before switching branches, or Git will warn you that unsaved work may be overwritten.

## Deployment

Push to the `main` branch. Vercel auto-deploys on every push (connected via GitHub integration).

Static files are served from the `public/` directory. The `api/` folder is deployed as Vercel serverless functions.

## Environment variables

Set these in the Vercel dashboard (Settings → Environment Variables):

| Variable    | Description                          |
|-------------|--------------------------------------|
| `SMTP_HOST` | SMTP server hostname                 |
| `SMTP_PORT` | SMTP port (usually `587` or `465`)   |
| `SMTP_USER` | SMTP username / sending email        |
| `SMTP_PASS` | SMTP password or app password        |
| `TO_EMAIL`  | Where contact form emails are sent (defaults to `book@steelandzane.com`) |

For local dev, copy these into `.env.local` (already gitignored).

## Replacing the Spiro booking links

Open `public/book.js` and replace the placeholder URLs in the `SPIRO_LINKS` object at the top of the file:

```js
const SPIRO_LINKS = {
  photosOnly:  'https://REPLACE-WITH-SPIRO-PHOTOS-ONLY-LINK.com',
  photoVideo:  'https://REPLACE-WITH-SPIRO-PHOTO-VIDEO-LINK.com',
  photoDrone:  'https://REPLACE-WITH-SPIRO-PHOTO-DRONE-LINK.com',
  fullPackage: 'https://REPLACE-WITH-SPIRO-FULL-PACKAGE-LINK.com',
  luxury:      'https://REPLACE-WITH-SPIRO-LUXURY-LINK.com',
  commercial:  'https://REPLACE-WITH-SPIRO-COMMERCIAL-LINK.com',
  rental:      'https://REPLACE-WITH-SPIRO-RENTAL-AIRBNB-LINK.com',
  threeD:      'https://REPLACE-WITH-SPIRO-3D-FLOORPLAN-LINK.com',
};
```

### Redirect logic

| Property type selected | Redirects to       |
|------------------------|--------------------|
| Luxury Listing         | `luxury`           |
| Commercial Property    | `commercial`       |
| Rental / Airbnb        | `rental`           |
| Standard Residential + Photos Only      | `photosOnly`  |
| Standard Residential + Photos + Video   | `photoVideo`  |
| Standard Residential + Photos + Drone   | `photoDrone`  |
| Standard Residential + Full Media Package | `fullPackage` |
| Standard Residential + 3D Tour / Floor Plan | `threeD`  |

Luxury, commercial, and rental property types bypass the service selection and go directly to their dedicated links.
