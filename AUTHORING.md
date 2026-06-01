# Authoring Hapkido Path Content

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

## What not to edit for normal authoring

Do not edit these unless changing the site framework:

- src/layouts/
- src/components/
- src/pages/
- astro.config.mjs
- src/content.config.ts

Normal authoring should happen in:

- src/content/
- public/images/
