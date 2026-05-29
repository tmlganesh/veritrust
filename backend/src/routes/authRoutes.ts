import express from 'express';
import { login, register, getProfile } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';
import delayMiddleware from '../middlewares/delayMiddleware';

const router = express.Router();

router.post('/login', delayMiddleware, login);
router.post('/register', delayMiddleware, register);
router.get('/profile', protect, delayMiddleware, getProfile);

export default router;
