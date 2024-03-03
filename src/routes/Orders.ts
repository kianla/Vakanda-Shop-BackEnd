import { Router } from 'express';

import { createOrder, getOrdersByUserId,getOrder,getOrders, updateOrder, getOrderByUserId } from '../controllers/Orders';

const router = Router();

router.post('/', createOrder);

router.get('/lastorder', getOrderByUserId);

router.get('/UserOrders', getOrdersByUserId);

router.get('/:id', getOrder);

router.get('/', getOrders);

router.patch('/:id', updateOrder);

export default router;