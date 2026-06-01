import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const slug = process.argv[2]?.trim();

function usage() {
  console.error('Usage: npm run new:technique <technique-slug>');
  process.exit(1);
}

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) usage();

const root = process.cwd();
const templatePath = join(root, 'src/content/_templates/technique-full.md');
const techniquePath = join(root, `src/content/techniques/${slug}.md`);
const imageDir = join(root, `public/images/techniques/${slug}`);

if (existsSync(techniquePath)) {
  console.error(`Technique already exists: ${techniquePath}`);
  process.exit(1);
}

function titleFromSlug(value) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const title = titleFromSlug(slug);
const template = readFileSync(templatePath, 'utf8');
const markdown = template
  .replace(/^title: .+$/m, `title: ${title}`)
  .replace(/^school_name: .+$/m, `school_name: ${title}`)
  .replace('base_path: /images/techniques/technique-slug/', `base_path: /images/techniques/${slug}/`)
  .replace(/^status: .+$/m, 'status: draft')
  .replace(/^order: .+$/m, 'order: 999');

mkdirSync(dirname(techniquePath), { recursive: true });
mkdirSync(imageDir, { recursive: true });
writeFileSync(techniquePath, markdown);

console.log(`Created ${techniquePath}`);
console.log(`Created ${imageDir}/`);
