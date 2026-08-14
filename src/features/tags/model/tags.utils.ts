import type { Tag, TagSort } from './tags.types';

export function normalizeTagLabel(label: string) {
  return label.trim().replace(/\s+/g, ' ');
}

export function hasDuplicateTag(tags: Tag[], label: string) {
  const nextLabel = normalizeTagLabel(label).toLocaleLowerCase();
  return tags.some((tag) => tag.label.toLocaleLowerCase() === nextLabel);
}

export function createLocalTag(label: string, position: number): Tag {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    label: normalizeTagLabel(label),
    position,
    createdAt: now,
    updatedAt: now,
  };
}

export function normalizePositions(tags: Tag[]) {
  return tags.map((tag, index) => ({
    ...tag,
    position: index,
  }));
}

export function reorderByIds(tags: Tag[], ids: string[]) {
  const tagById = new Map(tags.map((tag) => [tag.id, tag]));

  return ids
    .map((id, index) => {
      const tag = tagById.get(id);
      return tag ? { ...tag, position: index } : null;
    })
    .filter((tag): tag is Tag => Boolean(tag));
}

export function sortTags(tags: Tag[], sort: TagSort) {
  const items = [...tags];

  switch (sort) {
    case 'name-asc':
      return items.sort((a, b) => a.label.localeCompare(b.label));
    case 'name-desc':
      return items.sort((a, b) => b.label.localeCompare(a.label));
    case 'created-asc':
      return items.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    case 'created-desc':
      return items.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    case 'custom':
    default:
      return items.sort((a, b) => a.position - b.position);
  }
}

export function filterTags(tags: Tag[], search: string) {
  const query = search.trim().toLowerCase();
  if (!query) return tags;

  return tags.filter((tag) => tag.label.toLowerCase().includes(query));
}

export function clampColumns(value: number) {
  if (Number.isNaN(value)) return 4;
  return Math.min(12, Math.max(1, value));
}
