import Resume from '../models/Resume.js';
import { extractText } from '../services/extractionService.js';

export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { path: fileUrl, originalname: fileName, mimetype } = req.file;

  try {
    const extractedText = await extractText(fileUrl, mimetype);

    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(400).json({ message: 'Could not extract sufficient text from file' });
    }

    const resume = await Resume.create({
      userId: req.user._id,
      fileName,
      fileUrl,
      extractedText
    });

    res.status(201).json({
      resumeId: resume._id,
      fileName: resume.fileName,
      extractedText: extractedText.substring(0, 500) + '...',
      message: 'Resume uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResumes = async (req, res) => {
  const resumes = await Resume.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .select('-extractedText');

  res.json({ resumes });
};

export const getResumeById = async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!resume) {
    return res.status(404).json({ message: 'Resume not found' });
  }

  res.json({ resume });
};
