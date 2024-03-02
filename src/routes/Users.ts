import { Router } from 'express';

import { createUser, getUser,getUsers, updateUser, getUserByEmail } from '../controllers/Users';

const router = Router();

router.post('/singup', createUser);

router.get('/signin', getUserByEmail);

router.get('/:id', getUser);

router.get('/', getUsers);

router.patch('/:id', updateUser);

export default router;