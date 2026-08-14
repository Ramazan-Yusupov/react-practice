export type Tag = {
  id: string;
  label: string;
  position: number;
  createdAt: string;
  updatedAt: string;
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
