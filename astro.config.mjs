import { defineConfig } from 'astro/config';

const base = '/hapkido-path/';


function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isMarkdownTable(value) {
  const lines = value.trim().split('\n').map((line) => line.trim()).filter(Boolean);
  if (lines.length < 3) return false;
  if (!lines[0].includes('|') || !lines[1].includes('|')) return false;
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(lines[1]);
}

function tableHtml(value) {
  const lines = value.trim().split('\n').map((line) => line.trim()).filter(Boolean);
  const headers = splitTableRow(lines[0]);
  const rows = lines.slice(2).map(splitTableRow);

  return `<table><thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead><tbody>${rows
    .map((row) => `<tr>${headers.map((_, index) => `<td>${escapeHtml(row[index] ?? '')}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;
}


function renderMarkdownTables() {
  const visit = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node.children)) {
      node.children = node.children.map((child) => {
        if (child?.type === 'paragraph' && typeof child.value === 'string' && isMarkdownTable(child.value)) {
          return { type: 'html', value: tableHtml(child.value) };
        }
        visit(child);
        return child;
      });
    }
  };
  return (tree) => visit(tree);
}

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
    remarkPlugins: [renderMarkdownTables],
    rehypePlugins: [rewriteMarkdownLinks]
  },

  output: 'static'
});
