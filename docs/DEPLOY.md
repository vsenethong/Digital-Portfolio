# Deploying this portfolio to GitHub Pages (no custom domain)

## What was fixed
The original site used absolute paths like `/images/headshot.png` and
`/css/styles.css`. Those only work when a site is served from the root of a
domain (like a custom domain, or `username.github.io`). Since you no longer
own the old domain, GitHub Pages will serve this from
`https://<username>.github.io/<repo-name>/`, which is a *subfolder*, so every
asset path has been changed to a relative path (`images/headshot.png`,
`css/styles.css`, etc). That alone should resolve most of the "broken
links/images" symptoms you were seeing.

## Clear the leftover custom domain in GitHub's settings
This part isn't a file in your repo — it's a setting GitHub stores per-repo,
so deleting a CNAME file alone won't undo it:

1. Go to your repo on GitHub → **Settings** → **Pages**.
2. Under **Custom domain**, delete the old domain text, leave it blank, and
   click **Save**.
3. If a `CNAME` file exists anywhere in your repo (root or `/docs`), delete
   it — GitHub recreates one automatically if the custom domain field isn't
   empty, so do step 2 first.
4. Wait a few minutes. GitHub will re-issue the certificate/DNS check and the
   site should settle on `https://<username>.github.io/<repo-name>/`.
5. If it still shows the old domain after 10–15 minutes, hard refresh
   (Ctrl/Cmd+Shift+R) — DNS/cert changes can be cached in the browser.

## Set the Pages source
1. Still in **Settings → Pages**, under **Build and deployment → Source**,
   choose **Deploy from a branch**.
2. Branch: `main` (or whichever branch you push this to), folder: `/docs`.
3. Save. Your site will publish at:
   `https://<username>.github.io/<repo-name>/`

## Folder contents
This folder is a self-contained static site — no Java/Spring Boot required
to host it:
```
index.html
css/styles.css
js/portfolio.js
images/...
.nojekyll        (tells GitHub Pages to skip Jekyll processing)
```

Push it as your repo's `/docs` folder (or as the repo root, adjusting the
Pages source folder to `/root` instead) and you're live.
