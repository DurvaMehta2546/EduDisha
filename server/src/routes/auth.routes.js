import express from 'express';
import { body } from 'express-validator';
import { register, login, googleAuth, verifyToken, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty().trim()
], register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], login);

router.post('/google', googleAuth);

router.post('/verify', verifyToken);

router.get('/me', protect, getMe);

export default router;
