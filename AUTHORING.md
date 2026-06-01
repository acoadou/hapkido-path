# Hapkido Path Content Workflow

## Goal

Most site updates should be content-only changes.

You usually add or edit Markdown files and upload images. You should not need to edit Astro layouts for normal content work.

## Add a technique

1. Copy the technique template.
2. Create a new file under:

   src/content/techniques/<technique-slug>.md

3. Fill the front matter.
4. Write the article body.
5. Declare expected visuals under `visuals`.
6. Upload images later under:

   public/images/techniques/<technique-slug>/

7. Use PNG by default. JPG/JPEG are allowed for photos.
8. Do not use current screenshots unless they are approved/recreated.

## Add images to an existing technique

1. Check the technique page front matter.
2. Find `visuals.base_path`.
3. Add matching files to the folder.
4. Example:

   public/images/techniques/outside-sleeve-1/01-starting-position.png

5. Rebuild or redeploy. The placeholder should automatically become the image.

## Add a lesson

1. Copy the lesson template.
2. Create a new file under:

   src/content/learn/<belt>/<lesson-slug>.md

3. Link to technique pages rather than duplicating full technique details.

## Add a principle

1. Copy the principle template.
2. Create a new file under:

   src/content/principles/<principle-slug>.md

3. Link to related techniques.

## What not to edit for normal content work

Do not edit these unless changing the site framework:

- src/layouts/
- src/components/
- src/pages/
- astro.config.mjs
- src/content.config.ts

Normal content work should happen in:

- src/content/
- public/images/

## New technique helper

To scaffold a technique page and matching image folder, run:

```bash
npm run new:technique outside-sleeve-4
```

This creates:

- `src/content/techniques/outside-sleeve-4.md`
- `public/images/techniques/outside-sleeve-4/`

The generated Markdown starts from `src/content/_templates/technique-full.md`, guesses a readable title from the slug, sets `visuals.base_path`, keeps `status: draft`, and leaves `order` as a placeholder value to adjust before publishing.

## Technique page checklist

Before publishing or merging a new technique page:

- Front matter has `title`, `type`, `belt`, `category`, `attack`, `summary`, `status`, and `order`.
- `visuals.base_path` matches the image folder under `public/images/techniques/<slug>/`.
- Every declared visual frame has:
  - `id`
  - `file`
  - `caption`
- Expected image filenames use PNG by default.
- The Markdown body includes:
  - Summary
  - Names and references
  - Starting position
  - Goal
  - Entry condition
  - Step-by-step
  - Ending position
  - Key mechanics
  - Footwork
  - Hand and arm details
  - Effect on attacker
  - What uke should feel
  - Common mistakes
  - Safety notes
  - Solo practice
  - Partner drill
  - Variations and notes
  - Related principles
  - Related techniques
  - Appears in lessons
- Common mistakes table renders correctly with GitHub-Flavored Markdown.
- Safety notes mention the relevant joints and injury risks.
- Unverified class details are clearly marked as pending or uncertain.
- Related technique/principle links resolve to real pages when possible.
- Placeholder sections are either filled or intentionally marked as TODO.
