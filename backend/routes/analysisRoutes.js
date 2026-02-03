import express from 'express';
import { analyzeEmail } from '../controllers/analysisController.js';

const router = express.Router();

router.post('/analyze', analyzeEmail);

export default router;