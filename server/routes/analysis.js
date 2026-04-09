import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { 
  createAnalysis, 
  getAnalyses, 
  getAnalysisById, 
  deleteAnalysis 
} from '../controllers/analysisController.js';

const router = express.Router();

router.post('/', authMiddleware, createAnalysis);
router.get('/', authMiddleware, getAnalyses);
router.get('/:id', authMiddleware, getAnalysisById);
router.delete('/:id', authMiddleware, deleteAnalysis);

export default router;
