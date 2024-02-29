import { Router } from 'express';

import { createUser, getUser,getUsers, updateUser, deleteUser } from '../controllers/Users';

const router = Router();

router.post('/', createUser);

router.get('/:id', getUser);

router.get('/', getUsers);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;