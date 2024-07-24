import express from 'express';
import { getSignup, postSignup, getReset } from '../controllers/auth.js'; // Import named exports

const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/reset', getReset);


export default router; 
