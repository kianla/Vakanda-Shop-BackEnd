import { Router } from 'express';

import { createItem, getItem,getItems, updateItem } from '../controllers/Items';

const router = Router();

router.post('/', createItem);

router.get('/:id', getItem);

router.get('/', getItems);

router.patch('/:id', updateItem);

export default router;