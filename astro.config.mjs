import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://acodou.github.io',

  // GitHub Pages serves this project at https://acodou.github.io/hapkido-path/.
  // Keep the trailing slash so generated internal links include the separator
  // between the repository base path and page path.
  base: '/hapkido-path/',

  output: 'static'
});
