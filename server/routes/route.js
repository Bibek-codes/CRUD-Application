import express, { Router } from 'express';

import { signUp } from '../controller/usercontroller.js';
import { signIn } from '../controller/usercontroller.js';
import { getData } from '../controller/usercontroller.js';
import { getUser } from '../controller/usercontroller.js';
import { editUser } from '../controller/usercontroller.js';
import { deleteUser } from '../controller/usercontroller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/getdata', getData);
router.get('/dashboard/getuser/:id', getUser);
router.put('/dashboard/edituser/:id',editUser);
router.delete('/deleteuser/:id',deleteUser);

export default router;