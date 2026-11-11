# Nitesh Kumar · Developer Portfolio

A responsive React, TypeScript, and Vite portfolio with Tailwind CSS v4, Motion for React, and Lucide React. All biographical content and external profile/project links come from the supplied `resume.pdf`.

**Live portfolio:** https://portfolio-nine-tan-21.vercel.app

**Source repository:** https://github.com/niteshkumar0609/portfolio

## Run locally

Use Node.js 22.13 or newer (a current supported LTS release is recommended).

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite, normally http://127.0.0.1:5173.

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

`npm run test:e2e` runs desktop and mobile smoke checks against the production build using an installed Google Chrome. Run `npm run build` first. Browser screenshots are saved under the ignored `test-results/` directory.

The production preview is normally at http://127.0.0.1:4173. Build output is in `dist/`.

## Content and maintenance

- `src/data.ts`: verified personal information, skills, project descriptions, and exact resume URLs.
- `src/App.tsx`: sections, interactions, and conceptual project illustrations.
- `src/styles.css`: responsive dark theme, focus styles, and reduced-motion behavior.
- `src/refinements.css`: portrait-led charcoal theme, card refinements, timeline styling, and responsive visual upgrades.
- `profile.jpg`: portrait source, recreated from the previously supplied photo because no root `profile.jpg` was present during implementation. Facial features and colors were not retouched.
- `public/images/`: optimized 480px/800px WebP portraits plus an 800px JPEG fallback. The hero uses responsive image selection, high fetch priority, and a matching preload.
- `public/resume.pdf`: original resume served by the download buttons. Replace it when updating your resume.
- `index.html`: title, description, social metadata, and Person structured data.

The visual upgrade preserves the existing resume content. It adds a portrait-led hero, gently animated lighting (disabled for reduced motion), clearer project engineering summaries, and timeline styling. Canonical, social-image, and sitemap URLs use the verified Vercel domain above. Future updates must be reviewed and explicitly approved before pushing or deploying.

The stock forecasting resume claim of 90% accuracy is shown only in expanded project details with its metric-definition limitation. Charts are conceptual illustrations, not measured results. No project repositories or live demos are invented for projects without links in the resume. The contact links open the visitor’s email client; no backend or form service is required. Copy email requires a secure context (HTTPS or localhost) and reports failure accessibly.

The minimatch override patches a transitive development-tool dependency advisory. Keep the override under review when updating typescript-eslint.

## Deploy to Vercel when ready

The initial production deployment was published through Vercel CLI with the owner's approval. The production URL above was verified without authentication.

1. Push this folder to a GitHub repository of your choice. Do not commit `node_modules`, `dist`, or secrets.
2. In Vercel, select **Add New → Project** and import that repository.
3. Select the **Vite** framework preset and Node.js **22.x** or a newer supported LTS release.
4. Use install command `npm ci`, build command `npm run build`, and output directory `dist`.
5. No environment variables are needed. Review the configuration, then deploy only when you approve publishing.
6. Once the final public domain is known, add its canonical URL and `og:url` to `index.html`. A sitemap can then use that exact domain; none is fabricated here.

The site uses section anchors on a single page, so it does not require SPA route rewrites.

`vercel.json` explicitly selects Vite, `npm ci`, `npm run build`, and `dist`, and sets basic response security headers. Set the Vercel project's Node.js runtime to 22.x. Configuration reference: https://vercel.com/docs/project-configuration/vercel-json.

### CLI workflow

With GitHub CLI and Vercel CLI installed:

```sh
gh auth status
vercel whoami
```

If needed, sign in interactively with `gh auth login --hostname github.com --web --git-protocol https` and `vercel login`. Complete these in your own browser; never paste account tokens into project files or chat.

On Windows PowerShell, use `vercel.cmd` if execution policy prevents the `vercel.ps1` wrapper from running. This does not require changing the system execution policy.

Creating a public repository, pushing code, and deploying all require the owner's approval. After approval, create the `portfolio` repository with GitHub CLI, push the committed source, then run `vercel --prod` and follow its account/project prompts. Read the actual URL from the CLI output and verify it without signing in before submitting it to an employer. An authentication-protected deployment is not suitable for a job application.

## Updating the portfolio

1. Edit verified content in `src/data.ts` and section copy in `src/App.tsx`. Keep `public/resume.pdf` current and replace the root source PDF too.
2. Run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:e2e`.
3. Review changes with `git diff`, stage the intended files, and create a descriptive commit.
4. After publishing approval, push your branch. If you have connected Vercel's Git integration, pushing the production branch will automatically publish it; otherwise deploy explicitly with `vercel --prod` after approval.
5. Verify the public page, resume download, contact links, and mobile layout after publication.

The initial Vercel deployment did not connect GitHub automation: the Vercel account requires a GitHub Login Connection first. Until you add that connection and run `vercel git connect`, pushing to GitHub alone will not redeploy the site. Use the approved manual workflow with `vercel.cmd --prod` on Windows. Vercel may supply the download filename `resume.pdf`; browser checks verify the downloaded file exactly matches the original PDF.

This is a personal portfolio: name, university email, education, experience, public profile links, and the downloadable resume are intentionally public when published. Secrets, local credentials, environment files, generated output, and browser-test artifacts are excluded from Git.
