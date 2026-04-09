import Application from '../models/Application.js';

export const createApplication = async (req, res) => {
  const { company, role, status, resumeId, analysisId, notes } = req.body;

  if (!company || !role) {
    return res.status(400).json({ message: 'Company and role are required' });
  }

  const application = await Application.create({
    userId: req.user._id,
    company,
    role,
    status: status || 'applied',
    resumeId,
    analysisId,
    notes: notes || ''
  });

  res.status(201).json({ application });
};

export const getApplications = async (req, res) => {
  const { status, sortBy = 'appliedAt', order = 'desc' } = req.query;

  const filter = { userId: req.user._id };
  if (status) filter.status = status;

  const applications = await Application.find(filter)
    .populate('resumeId', 'fileName')
    .populate('analysisId', 'atsScore')
    .sort({ [sortBy]: order === 'desc' ? -1 : 1 });

  res.json({ applications });
};

export const getApplicationById = async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    userId: req.user._id
  })
    .populate('resumeId')
    .populate('analysisId');

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json({ application });
};

export const updateApplication = async (req, res) => {
  const { status, notes } = req.body;

  const application = await Application.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { status, notes },
    { new: true, runValidators: true }
  );

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json({ application });
};

export const deleteApplication = async (req, res) => {
  const application = await Application.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json({ message: 'Application deleted successfully' });
};

export const bulkDeleteApplications = async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  await Application.deleteMany({
    _id: { $in: ids },
    userId: req.user._id
  });

  res.json({ message: `${ids.length} applications deleted` });
};

export const getStats = async (req, res) => {
  const applications = await Application.find({ userId: req.user._id })
    .populate('analysisId', 'atsScore');

  const totalApps = applications.length;
  const scores = applications
    .filter(app => app.analysisId?.atsScore)
    .map(app => app.analysisId.atsScore);

  const avgScore = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
    : 0;
  const topScore = scores.length > 0 ? Math.max(...scores) : 0;

  // Calculate improvement (compare first 3 vs last 3 scores)
  let improvement = 0;
  if (scores.length >= 6) {
    const firstThree = scores.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
    const lastThree = scores.slice(-3).reduce((a, b) => a + b, 0) / 3;
    improvement = Math.round(((lastThree - firstThree) / firstThree) * 100);
  }

  res.json({
    stats: {
      totalApps,
      avgScore,
      topScore,
      improvement
    }
  });
};
