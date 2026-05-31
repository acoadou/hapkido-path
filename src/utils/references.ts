export type ReferenceKind = 'technique' | 'principle' | 'learn' | 'generic';

const sectionByKind: Record<Exclude<ReferenceKind, 'generic'>, string> = {
  technique: 'techniques',
  principle: 'principles',
  learn: 'learn'
};

export function cleanReferencePath(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';

  const protocolMatch = trimmed.match(/^(https?:\/\/)(.*)$/);
  const prefix = protocolMatch?.[1] ?? '';
  const pathPart = protocolMatch?.[2] ?? trimmed;

  return `${prefix}${pathPart
    .replace(/\.mdx?(?=\/|#|$)/g, '')
    .replace(/\/index(?=\/|#|$)/g, '')
    .replace(/\/+/g, '/')}`;
}

export function slugifyLabel(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function labelFromReference(value: string) {
  const clean = cleanReferencePath(value).replace(/^https?:\/\//, '');
  const last = clean
    .split('#')[0]
    .split('?')[0]
    .split('/')
    .filter(Boolean)
    .pop() ?? clean;

  return last
    .replace(/^lesson-(\d+)-/, 'Lesson $1 — ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function hrefForReference(value: string, kind: ReferenceKind = 'generic') {
  const clean = cleanReferencePath(value);
  if (!clean) return undefined;
  if (/^https?:\/\//.test(clean)) return clean;
  if (clean.startsWith('/')) return clean.endsWith('/') || clean.includes('#') ? clean : `${clean}/`;
  if (kind === 'generic') return undefined;

  const section = sectionByKind[kind];
  const slug = clean.includes('/') ? clean : slugifyLabel(clean);
  return `/${section}/${slug.replace(/^\/+|\/+$/g, '')}/`;
}
