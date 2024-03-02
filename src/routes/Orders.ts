import { Router } from 'express';

import { createOrder, getOrder,getOrders, updateOrder, getOrderByUserId } from '../controllers/Orders';

const router = Router();

router.post('/', createOrder);

router.get('/lastorder', getOrderByUserId);

router.get('/:id', getOrder);

router.get('/', getOrders);

router.patch('/:id', updateOrder);

export default router;