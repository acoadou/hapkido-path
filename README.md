# The Hapkido Path

The Hapkido Path is an initial skeleton for a public static website that combines a guided Hapkido learning path, technical reference pages, principles, practice tools, and source tracking.

This first version is intentionally clean and static. It is built with Astro, TypeScript where useful, Markdown content collections, and GitHub Pages deployment through GitHub Actions.

## Disclaimer

This site follows a personal learning path and technical study notes. Hapkido curricula vary widely between schools and federations. This site is not an official curriculum and should not replace instruction from a qualified teacher.

## Safety warning

Joint locks, throws, strikes, and takedowns can cause injury. Practice slowly, communicate clearly with your partner, and train under qualified supervision.

## Local development

Install dependencies:

```bash
npm install
```

Start the Astro development server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

GitHub Pages deployment is configured in `.github/workflows/deploy.yml` using Astro's official `withastro/action` workflow pattern. The workflow runs on pushes to `main`, can also be started manually from the Actions tab, installs dependencies, builds the static Astro site, uploads the build artifact, and deploys it to GitHub Pages.

The Astro config is set up for a project page at:

```text
https://<username>.github.io/hapkido-path/
```

Before publishing, update `astro.config.mjs` so `site` uses the real GitHub username or organization, for example `https://octocat.github.io`. Keep `base: '/hapkido-path'` while the repository name is `hapkido-path`. If the repository name changes, update the Astro `base` value to match the new repository name. If the site later moves to a custom domain or to a user/organization Pages repository, change `base` to `/`.

To enable deployment:

1. Push the repository to GitHub.
2. Go to the repository **Settings** page.
3. Go to **Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. Push to `main`.
6. Open the **Actions** tab and wait for the deployment to finish.
7. The site should be available at `https://<username>.github.io/hapkido-path/`.

## Content editing guide

Content is stored in Astro content collections:

- `src/content/belts/` for belt progression pages.
- `src/content/techniques/` for technique atlas pages.
- `src/content/principles/` for recurring mechanics.
- `src/content/reference/` for support material such as Korean basics, glossary terms, etiquette, and training principles.

Each Markdown file begins with frontmatter that must match the schemas in `src/content.config.ts`. Add new entries by copying a nearby file, changing the `title`, `slug`, `order`, and relevant metadata, then adding concise English content below the frontmatter.

Dynamic routes are generated for:

- `/learn/[slug]/`
- `/techniques/[slug]/`
- `/principles/[slug]/`
- `/reference/[slug]/`

Static section pages live under `src/pages/`.

## Folder structure overview

```text
.github/workflows/deploy.yml       GitHub Pages deployment workflow
public/                            Static assets and placeholders
src/components/                    Reusable Astro UI components
src/content/                       Markdown content collections
src/layouts/                       Page and content layouts
src/pages/                         Static and dynamic routes
src/styles/global.css              Site-wide design system and utilities
src/content.config.ts              Content collection schemas
astro.config.mjs                   Astro static-site configuration
```

## Extending the site

Recommended next steps include adding more belt levels, expanding technique pages, connecting related entries with richer links, replacing placeholder images with original or licensed assets, and implementing client-side filtering or flashcards only after the static structure is stable.

Do not copy copyrighted curriculum text or images directly. Summarize, cite, and use original photos, notes, diagrams, or public-domain / licensed assets when possible.

## Technique illustration placeholders

Technique pages can reserve study-manual illustration slots before artwork exists. Add a `visuals` block to the technique frontmatter and declare every expected frame with an explicit filename. PNG is the recommended default; JPG and JPEG are also supported for photographic images. WebP is not required.

```yaml
visuals:
  base_path: /images/techniques/example-technique/
  frames:
    - id: starting-position
      file: 01-starting-position.png
      caption: Starting position.
```

Each technique should store images in its own public folder:

```text
public/images/techniques/<technique-slug>/
```

The rendered URL is automatically adjusted for the GitHub Pages base path, so a declared file such as `01-starting-position.png` under `base_path: /images/techniques/outside-sleeve-1/` resolves correctly when the site is deployed under `/hapkido-path/`.

Initial placeholder folders are reserved for:

```text
public/images/techniques/outside-sleeve-1/
public/images/techniques/outside-sleeve-2/
public/images/techniques/outside-sleeve-3/
public/images/techniques/sleeve-1-2/
public/images/techniques/sleeve-3/
public/images/techniques/sleeve-4/
public/images/techniques/sleeve-5-6/
```

When the declared image file exists, the technique page displays it. When it is missing, the page displays a clean `Illustration pending` placeholder with the expected filename and the frame caption. No Markdown body edit is needed when adding images later.
