import { Router } from 'express';
import { tagsController } from '../controllers/tags.controller';
import { asyncHandler } from '../utils/async-handler';
import { validateBody } from '../middlewares/validate.middleware';
import { createTagSchema, reorderTagsSchema } from '../schemas/tag.schema';

export const tagsRouter = Router();

tagsRouter.get('/', asyncHandler(tagsController.getTags));
tagsRouter.post('/', validateBody(createTagSchema), asyncHandler(tagsController.createTag));
tagsRouter.patch(
  '/reorder',
  validateBody(reorderTagsSchema),
  asyncHandler(tagsController.reorderTags),
);
tagsRouter.delete('/:id', asyncHandler(tagsController.deleteTag));
