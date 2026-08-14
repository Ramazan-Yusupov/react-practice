import type { CreateTagDto, ReorderTagsDto, Tag } from '../types/tag';
import { tagsRepository } from '../repositories/tags.repository';
import { HttpError } from '../utils/http-error';

function normalizeLabel(label: string) {
  return label.trim().replace(/\s+/g, ' ');
}

function normalizePositions(tags: Tag[]) {
  return tags.map((tag, index) => ({
    ...tag,
    position: index,
  }));
}

function createTagEntity(label: string, position: number): Tag {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    label,
    position,
    createdAt: now,
    updatedAt: now,
  };
}

export const tagsService = {
  async getTags() {
    return tagsRepository.findAll();
  },

  async createTag(dto: CreateTagDto) {
    const label = normalizeLabel(dto.label ?? '');

    if (!label) {
      throw new HttpError(400, 'Введите название тега', 'EMPTY_TAG_LABEL');
    }

    if (label.length > 32) {
      throw new HttpError(400, 'Максимум 32 символа', 'TAG_LABEL_TOO_LONG');
    }

    const tags = await tagsRepository.findAll();
    const duplicate = tags.some((tag) => tag.label.toLowerCase() === label.toLowerCase());

    if (duplicate) {
      throw new HttpError(409, 'Такой тег уже существует', 'DUPLICATE_TAG');
    }

    const tag = createTagEntity(label, tags.length);
    await tagsRepository.saveAll([...tags, tag]);

    return tag;
  },

  async deleteTag(id: string) {
    const tags = await tagsRepository.findAll();
    const exists = tags.some((tag) => tag.id === id);

    if (!exists) {
      throw new HttpError(404, 'Тег не найден', 'TAG_NOT_FOUND');
    }

    const nextTags = normalizePositions(tags.filter((tag) => tag.id !== id));
    await tagsRepository.saveAll(nextTags);

    return { id };
  },

  async reorderTags(dto: ReorderTagsDto) {
    const tags = await tagsRepository.findAll();

    if (!Array.isArray(dto.ids)) {
      throw new HttpError(400, 'ids должен быть массивом', 'INVALID_REORDER_IDS');
    }

    if (dto.ids.length !== tags.length) {
      throw new HttpError(400, 'Передайте все id тегов в новом порядке', 'INVALID_REORDER_LENGTH');
    }

    const tagById = new Map(tags.map((tag) => [tag.id, tag]));
    const hasUnknownId = dto.ids.some((id) => !tagById.has(id));

    if (hasUnknownId) {
      throw new HttpError(400, 'Передан неизвестный id тега', 'UNKNOWN_TAG_ID');
    }

    const now = new Date().toISOString();
    const nextTags = dto.ids.map((id, index) => ({
      ...tagById.get(id)!,
      position: index,
      updatedAt: now,
    }));

    await tagsRepository.saveAll(nextTags);

    return nextTags;
  },
};
