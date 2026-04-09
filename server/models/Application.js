import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['applied', 'screening', 'interview', 'offer', 'rejected'],
    default: 'applied'
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume'
  },
  analysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analysis'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

applicationSchema.index({ userId: 1, appliedAt: -1 });
applicationSchema.index({ status: 1 });

export default mongoose.model('Application', applicationSchema);
