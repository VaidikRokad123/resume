import express from 'express';
import { upload } from '../config/cloudinary.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { uploadResume, getResumes, getResumeById } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', authMiddleware, upload.single('resume'), uploadResume);
router.get('/', authMiddleware, getResumes);
router.get('/:id', authMiddleware, getResumeById);

export default router;
