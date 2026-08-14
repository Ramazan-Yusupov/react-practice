import { Router } from 'express';
import { tagsController } from '../controllers/tags.controller';
import { asyncHandler } from '../utils/async-handler';

export const tagsRouter = Router();

tagsRouter.get('/', asyncHandler(tagsController.getTags));
tagsRouter.post('/', asyncHandler(tagsController.createTag));
tagsRouter.patch('/reorder', asyncHandler(tagsController.reorderTags));
tagsRouter.delete('/:id', asyncHandler(tagsController.deleteTag));
