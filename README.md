# Freedom — Knovon

A one-page site promoting the U.S. Constitution, the Bill of Rights, and the fundamental liberties guaranteed to every American.

**Live site:** [freedom.knovon.org](https://freedom.knovon.org)

## About

Knovon is proudly American. This site educates citizens on constitutional rights, rallies people to defend liberty, and stands against government overreach and foreign influence on American sovereignty.

## Deployment

This site is configured for **Cloudflare Pages**. Connect the repository and set the build configuration:

| Setting | Value |
|---------|-------|
| Build command | *(none — static site)* |
| Build output directory | `/` (root) |

No build step is required. All assets are static HTML, CSS, and JavaScript.

For custom domain, point `freedom.knovon.org` to your Cloudflare Pages project and remove the `CNAME` file if Cloudflare manages DNS directly.

## Local Development

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.
