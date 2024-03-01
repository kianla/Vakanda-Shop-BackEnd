import { Router } from 'express';

import { createOrder, getOrder,getOrders, updateOrder } from '../controllers/Orders';

const router = Router();

router.post('/', createOrder);

router.get('/:id', getOrder);

router.get('/', getOrders);

router.patch('/:id', updateOrder);

export default router;