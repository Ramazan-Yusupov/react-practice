import type { CreateTagDto, ReorderTagsDto, Tag } from '../types/tag';
import { tagsRepository } from '../repositories/tags.repository';
import { HttpError } from '../utils/http-error';

function normalizeLabel(label: string) {
  return label.trim().replace(/\s+/g, ' ');
}

export const tagsService = {
  async getTags(): Promise<Tag[]> {
    return tagsRepository.findAll();
  },

  async createTag(dto: CreateTagDto): Promise<Tag> {
    const label = normalizeLabel(dto.label ?? '');

    if (!label) {
      throw new HttpError(400, 'Введите название тега', 'EMPTY_TAG_LABEL');
    }

    if (label.length > 32) {
      throw new HttpError(400, 'Максимум 32 символа', 'TAG_LABEL_TOO_LONG');
    }

    const existing = await tagsRepository.findByLabel(label);
    if (existing) {
      throw new HttpError(409, 'Такой тег уже существует', 'DUPLICATE_TAG');
    }

    const tags = await tagsRepository.findAll();
    return tagsRepository.create(label, tags.length);
  },

  async deleteTag(id: string): Promise<{ id: string }> {
    try {
      await tagsRepository.delete(id);
      return { id };
    } catch {
      throw new HttpError(404, 'Тег не найден', 'TAG_NOT_FOUND');
    }
  },

  async reorderTags(dto: ReorderTagsDto): Promise<Tag[]> {
    if (!Array.isArray(dto.ids)) {
      throw new HttpError(400, 'ids должен быть массивом', 'INVALID_REORDER_IDS');
    }

    const tags = await tagsRepository.findAll();

    if (dto.ids.length !== tags.length) {
      throw new HttpError(400, 'Передайте все id тегов в новом порядке', 'INVALID_REORDER_LENGTH');
    }

    const knownIds = new Set(tags.map((tag) => tag.id));
    const hasUnknownId = dto.ids.some((id) => !knownIds.has(id));

    if (hasUnknownId) {
      throw new HttpError(400, 'Передан неизвестный id тега', 'UNKNOWN_TAG_ID');
    }

    return tagsRepository.reorder(dto.ids);
  },
};
