import express from 'express';
import { signIn, signUp, updateUser } from '../../controllers/auth/authController.js';
import { authenticate } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register',signUp);
router.post('/login',signIn);
router.patch('/update',authenticate,updateUser);

export default router