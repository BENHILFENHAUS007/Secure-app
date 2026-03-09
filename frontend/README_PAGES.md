# GitHub Pages Notes

This app is configured to export statically for GitHub Pages when `GITHUB_PAGES=true`.

## What is handled automatically
- `output: 'export'`
- `trailingSlash: true`
- automatic `basePath` and `assetPrefix` for project repositories (`/<repo-name>`)
- no `basePath` for user/org repositories ending in `.github.io`
- PWA plugin disabled in Pages build to avoid service-worker registration issues in static-only hosting

## Local dry-run
```bash
cd frontend
npm ci
GITHUB_PAGES=true GITHUB_REPOSITORY=owner/repo npm run build
npx serve out
```
