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


function headingText(node) {
  if (!node || !Array.isArray(node.children)) return '';
  return node.children.map((child) => child.value ?? '').join('').trim().toLowerCase();
}

function removeDuplicateTechniqueSections() {
  const duplicateSectionHeadings = new Set([
    'safety note',
    'safety notes',
    'reference status',
    'related principles',
    'related techniques'
  ]);

  return (tree, file) => {
    const filePath = file?.history?.[0] ?? '';
    if (!filePath.includes('/src/content/techniques/')) return;
    if (!Array.isArray(tree.children)) return;

    const children = [];
    for (let index = 0; index < tree.children.length; index += 1) {
      const node = tree.children[index];
      const isDuplicateSection = node.type === 'heading' && node.depth === 2 && duplicateSectionHeadings.has(headingText(node));
      if (!isDuplicateSection) {
        children.push(node);
        continue;
      }

      while (index + 1 < tree.children.length) {
        const next = tree.children[index + 1];
        if (next.type === 'heading' && next.depth <= node.depth) break;
        index += 1;
      }
    }
    tree.children = children;
  };
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
  site: 'https://acodou.github.io',

  // GitHub Pages serves this project at https://acodou.github.io/hapkido-path/.
  // Keep the trailing slash so generated internal links include the separator
  // between the repository base path and page path.
  base,

  markdown: {
    remarkPlugins: [removeDuplicateTechniqueSections, renderMarkdownTables],
    rehypePlugins: [rewriteMarkdownLinks]
  },

  output: 'static'
});
