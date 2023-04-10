import express from 'express';
import { signup, signin, getAll, update, remove } from '../controller/auth';

const router = express.Router();

router.get('/users',getAll);
router.post('/signup', signup);
router.post('/signin', signin);
router.patch('/users/:id',update);
router.delete('/users/:id',remove);



export default router;