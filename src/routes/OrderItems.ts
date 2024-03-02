import { Router } from 'express';

import { createOrderItems, deleteOrderItem } from '../controllers/OrderItems';

const router = Router();

router.post('/', createOrderItems);

router.options('/:id', deleteOrderItem);

export default router;