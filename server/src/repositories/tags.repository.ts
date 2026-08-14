import { resolve } from 'node:path';
import type { Tag } from '../types/tag';
import { readJsonFile, writeJsonFile } from '../utils/json-file';

const TAGS_FILE = resolve(process.cwd(), 'server/data/tags.json');

export const tagsRepository = {
  async findAll(): Promise<Tag[]> {
    const tags = await readJsonFile<Tag[]>(TAGS_FILE, []);
    return tags.sort((a, b) => a.position - b.position);
  },

  async saveAll(tags: Tag[]): Promise<Tag[]> {
    await writeJsonFile(TAGS_FILE, tags);
    return tags;
  },
};

