import { Router } from 'express';

import { createUser, getTodos, updateTodo, deleteTodo } from '../controllers/Users';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;