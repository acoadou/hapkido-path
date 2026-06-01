import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

const base = '/hapkido-path/';

function rewriteMarkdownLinks() {
  const visit = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'element' && node.tagName === 'a' && node.properties?.href?.startsWith('/')) {
      const href = node.properties.href;
      if (!href.startsWith(base)) {
        node.properties.href = `${base.replace(/\/$/, '')}${href}`;
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(visit);
  };
  return (tree) => visit(tree);
}

export default defineConfig({
  site: 'https://acoadou.github.io',

  // GitHub Pages serves this project at https://acoadou.github.io/hapkido-path/.
  // Keep the trailing slash so generated internal links include the separator
  // between the repository base path and page path.
  base,

  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rewriteMarkdownLinks]
  },

  output: 'static'
});
