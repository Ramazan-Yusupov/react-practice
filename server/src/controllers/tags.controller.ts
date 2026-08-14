import type { Request, Response } from 'express';
import type { CreateTagDto, ReorderTagsDto } from '../types/tag';
import { tagsService } from '../services/tags.service';

export const tagsController = {
  async getTags(_req: Request, res: Response) {
    const tags = await tagsService.getTags();
    res.json({ data: tags });
  },

  async createTag(req: Request<unknown, unknown, CreateTagDto>, res: Response) {
    const tag = await tagsService.createTag(req.body);
    res.status(201).json({ data: tag });
  },

  async deleteTag(req: Request<{ id: string }>, res: Response) {
    const result = await tagsService.deleteTag(req.params.id);
    res.json({ data: result });
  },

  async reorderTags(req: Request<unknown, unknown, ReorderTagsDto>, res: Response) {
    const tags = await tagsService.reorderTags(req.body);
    res.json({ data: tags });
  },
};
