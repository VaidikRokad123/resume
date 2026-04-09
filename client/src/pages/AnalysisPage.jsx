import { useState } from 'react';
import api from '../utils/api';
import ResumeDropzone from '../components/ResumeDropzone';
import AtsScoreGauge from '../components/AtsScoreGauge';
import KeywordCloud from '../components/KeywordCloud';
import SectionChart from '../components/SectionChart';
import SuggestionCards from '../components/SuggestionCards';
import OutputTabs from '../components/OutputTabs';

const AnalysisPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError('');
    
    // Auto-upload
    setUploading(true);
    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResumeId(data.resumeId);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeId || !jobDesc) {
      setError('Please upload a resume and enter a job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/analysis', {
        resumeId,
        jobDescText: jobDesc,
        jobTitle,
        company
      });
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Resume Analysis</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">1. Upload Resume</h2>
            <ResumeDropzone 
              onFileSelect={handleFileSelect} 
              fileName={fileName}
              loading={uploading}
            />
            {uploading && <p className="text-sm text-gray-600 mt-2">Uploading...</p>}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">2. Job Description</h2>
            <input
              type="text"
              placeholder="Job Title (optional)"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Paste the job description here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={handleAnalyze}
            disabled={loading || !resumeId || !jobDesc}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>

        {analysis && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <AtsScoreGauge score={analysis.atsScore} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Keywords Analysis</h2>
              <KeywordCloud
                matched={analysis.matchedKeywords}
                missing={analysis.missingKeywords}
                partial={analysis.partialKeywords}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Section Scores</h2>
              <SectionChart sectionScores={analysis.sectionScores} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
              <SuggestionCards suggestions={analysis.suggestions} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Optimized Output</h2>
              <OutputTabs
                rewrittenResume={analysis.rewrittenResume}
                latexSource={analysis.latexSource}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
