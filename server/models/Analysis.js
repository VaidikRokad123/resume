import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  jobDescId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobDescription'
  },
  atsScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  matchedKeywords: [String],
  missingKeywords: [String],
  partialKeywords: [String],
  sectionScores: {
    contact: Number,
    summary: Number,
    experience: Number,
    education: Number,
    skills: Number,
    formatting: Number
  },
  suggestions: [{
    section: String,
    issue: String,
    fix: String,
    impact: { type: String, enum: ['high', 'medium', 'low'] }
  }],
  rewrittenResume: {
    type: String,
    default: ''
  },
  latexSource: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

analysisSchema.index({ userId: 1, createdAt: -1 });
analysisSchema.index({ resumeId: 1 });

export default mongoose.model('Analysis', analysisSchema);
