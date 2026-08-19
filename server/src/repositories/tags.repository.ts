import { prisma } from '../lib/prisma';
import type { Tag } from '../types/tag';

type PrismaTag = {
  id: string;
  label: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};

function toTagDto(tag: PrismaTag): Tag {
  return {
    id: tag.id,
    label: tag.label,
    position: tag.position,
    createdAt: tag.createdAt.toISOString(),
    updatedAt: tag.updatedAt.toISOString(),
  };
}

export const tagsRepository = {
  async findAll(): Promise<Tag[]> {
    const tags = await prisma.tag.findMany({ orderBy: { position: 'asc' } });
    return tags.map(toTagDto);
  },

  async findByLabel(label: string): Promise<Tag | null> {
    const tag = await prisma.tag.findUnique({
      where: { labelLower: label.toLowerCase() },
    });
    return tag ? toTagDto(tag) : null;
  },

  async create(label: string, position: number): Promise<Tag> {
    const tag = await prisma.tag.create({
      data: { label, labelLower: label.toLowerCase(), position },
    });
    return toTagDto(tag);
  },

  async delete(id: string): Promise<Tag> {
    const tag = await prisma.tag.delete({ where: { id } });
    return toTagDto(tag);
  },

  async reorder(ids: string[]): Promise<Tag[]> {
    await prisma.$transaction(
      ids.map((id, position) => prisma.tag.update({ where: { id }, data: { position } })),
    );
    return this.findAll();
  },
};
