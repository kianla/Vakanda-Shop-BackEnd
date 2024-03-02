import { Router } from 'express';

import { createItemGroup, getItemGroup,getItemGroups, updateItemGroup } from '../controllers/ItemGroups';

const router = Router();

router.post('/', createItemGroup);

router.get('/:id', getItemGroup);

router.get('/', getItemGroups);

router.patch('/:id', updateItemGroup);

export default router;