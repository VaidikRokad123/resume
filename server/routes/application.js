import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  bulkDeleteApplications,
  getStats
} from '../controllers/applicationController.js';

const router = express.Router();

router.post('/', authMiddleware, createApplication);
router.get('/', authMiddleware, getApplications);
router.get('/stats', authMiddleware, getStats);
router.get('/:id', authMiddleware, getApplicationById);
router.put('/:id', authMiddleware, updateApplication);
router.delete('/:id', authMiddleware, deleteApplication);
router.post('/bulk-delete', authMiddleware, bulkDeleteApplications);

export default router;
