import type { ApiSuccess, CreateTagDto, ReorderTagsDto, Tag } from '../model/tags.types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : 'Ошибка запроса';

    throw new Error(message);
  }

  return payload as T;
}

export const tagsApi = {
  async getTags() {
    const response = await request<ApiSuccess<Tag[]>>('/api/tags');
    return response.data;
  },

  async createTag(dto: CreateTagDto) {
    const response = await request<ApiSuccess<Tag>>('/api/tags', {
      method: 'POST',
      body: JSON.stringify(dto),
    });

    return response.data;
  },

  async deleteTag(id: string) {
    await request<ApiSuccess<{ id: string }>>(`/api/tags/${id}`, {
      method: 'DELETE',
    });
  },

  async reorderTags(dto: ReorderTagsDto) {
    const response = await request<ApiSuccess<Tag[]>>('/api/tags/reorder', {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });

    return response.data;
  },
};
