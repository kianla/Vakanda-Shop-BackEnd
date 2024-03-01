import { Router } from 'express';

import { createUser, getUser,getUsers, updateUser } from '../controllers/ItemGroup';

const router = Router();

router.post('/', createUser);

router.get('/:id', getUser);

router.get('/', getUsers);

router.patch('/:id', updateUser);

export default router;