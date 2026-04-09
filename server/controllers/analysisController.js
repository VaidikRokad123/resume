import Analysis from '../models/Analysis.js';
import Resume from '../models/Resume.js';
import JobDescription from '../models/JobDescription.js';
import User from '../models/User.js';
import { analyzeResume } from '../services/geminiService.js';

export const createAnalysis = async (req, res) => {
  const { resumeId, jobDescText, jobTitle, company } = req.body;

  if (!resumeId || !jobDescText) {
    return res.status(400).json({ message: 'Resume ID and job description are required' });
  }

  // Check usage limits
  const user = await User.findById(req.user._id);
  if (user.plan === 'free' && user.analysisCount >= 3) {
    return res.status(403).json({ 
      message: 'Free plan limit reached. Upgrade to Pro for unlimited analyses.',
      limitReached: true 
    });
  }

  const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
  if (!resume) {
    return res.status(404).json({ message: 'Resume not found' });
  }

  try {
    // Save job description
    const jobDesc = await JobDescription.create({
      userId: req.user._id,
      title: jobTitle || 'Untitled Position',
      company: company || 'Unknown Company',
      rawText: jobDescText
    });

    // Call Gemini AI
    const aiResult = await analyzeResume(resume.extractedText, jobDescText);

    // Save analysis
    const analysis = await Analysis.create({
      userId: req.user._id,
      resumeId: resume._id,
      jobDescId: jobDesc._id,
      atsScore: aiResult.atsScore,
      matchedKeywords: aiResult.matchedKeywords,
      missingKeywords: aiResult.missingKeywords,
      partialKeywords: aiResult.partialKeywords,
      sectionScores: aiResult.sectionScores,
      suggestions: aiResult.suggestions,
      rewrittenResume: aiResult.rewrittenResume,
      latexSource: aiResult.latexSource
    });

    // Increment user analysis count
    user.analysisCount += 1;
    await user.save();

    res.status(201).json({ 
      analysis,
      message: 'Analysis completed successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnalyses = async (req, res) => {
  const analyses = await Analysis.find({ userId: req.user._id })
    .populate('resumeId', 'fileName')
    .populate('jobDescId', 'title company')
    .sort({ createdAt: -1 });

  res.json({ analyses });
};

export const getAnalysisById = async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.id,
    userId: req.user._id
  })
    .populate('resumeId', 'fileName fileUrl')
    .populate('jobDescId', 'title company rawText');

  if (!analysis) {
    return res.status(404).json({ message: 'Analysis not found' });
  }

  res.json({ analysis });
};

export const deleteAnalysis = async (req, res) => {
  const analysis = await Analysis.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!analysis) {
    return res.status(404).json({ message: 'Analysis not found' });
  }

  res.json({ message: 'Analysis deleted successfully' });
};
