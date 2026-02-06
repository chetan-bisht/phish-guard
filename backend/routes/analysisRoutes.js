import express from 'express';
import multer from 'multer';
import { analyzeEmail, analyzeFile, getHistory } from '../controllers/analysisController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', protect, analyzeEmail);
router.post('/analyze-file', protect, upload.single('file'), analyzeFile);
router.get('/history', protect, getHistory);

export default router;