import express from 'express';
import { analyzeEmail, getHistory } from '../controllers/analysisController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/analyze', protect, analyzeEmail);
router.get('/history', protect, getHistory);

export default router;