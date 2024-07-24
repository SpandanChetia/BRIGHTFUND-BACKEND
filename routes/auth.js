import express from 'express';
import { getSignup, postSignup } from '../controllers/auth.js'; // Import named exports

const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);

export default router; 
