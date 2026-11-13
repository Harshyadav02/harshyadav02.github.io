export function readingTime(text: string | undefined): string {
  const words = (text ?? '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Newest first; posts sharing a pubDate fall back to id (descending) so order is stable. */
export function sortPosts<T extends { id: string; data: { pubDate: Date } }>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || b.id.localeCompare(a.id)
  );
}
