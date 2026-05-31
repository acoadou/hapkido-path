export function withBase(path: string) {
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}

export function cleanContentId(id: string) {
  return id
    .replace(/\.mdx?(?=\/|#|$)/g, '')
    .replace(/\/index(?=\/|#|$)/g, '')
    .replace(/^\/+|\/+$/g, '');
}

export function contentHref(section: string, id: string) {
  return withBase(`/${section}/${cleanContentId(id)}/`);
}

export function labelFromSlug(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .pop()
    ?.replace(/^lesson-(\d+)-/, 'Lesson $1 — ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase()) ?? '';
}
