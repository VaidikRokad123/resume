import mongoose from 'mongoose';

const jobDescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  rawText: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

jobDescriptionSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('JobDescription', jobDescriptionSchema);
