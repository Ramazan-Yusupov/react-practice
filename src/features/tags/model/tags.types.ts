export type Tag = {
  id: string;
  label: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type TagSort = 'custom' | 'name-asc' | 'name-desc' | 'created-asc' | 'created-desc';

export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

export type TagsViewSettings = {
  search: string;
  sort: TagSort;
  columns: number;
  cardSize: CardSize;
};

export type CreateTagDto = {
  label: string;
};

export type ReorderTagsDto = {
  ids: string[];
};

export type ApiSuccess<T> = {
  data: T;
};
