import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import KpiGrid from '../components/KpiGrid';
import ScoreTrendChart from '../components/ScoreTrendChart';
import ApplicationTable from '../components/ApplicationTable';

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalApps: 0, avgScore: 0, topScore: 0, improvement: 0 });
  const [analyses, setAnalyses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, analysesRes, appsRes] = await Promise.all([
        api.get('/applications/stats'),
        api.get('/analysis'),
        api.get('/applications')
      ]);
      setStats(statsRes.data.stats);
      setAnalyses(analysesRes.data.analyses);
      setApplications(appsRes.data.applications);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateApp = async (id, updates) => {
    try {
      await api.put(`/applications/${id}`, updates);
      fetchData();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteApp = async (ids) => {
    try {
      if (ids.length === 1) {
        await api.delete(`/applications/${ids[0]}`);
      } else {
        await api.post('/applications/bulk-delete', { ids });
      }
      fetchData();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link
            to="/analysis"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            New Analysis
          </Link>
        </div>

        <div className="mb-6">
          <KpiGrid stats={stats} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Score Trend</h2>
          {analyses.length > 0 ? (
            <ScoreTrendChart analyses={analyses} />
          ) : (
            <p className="text-gray-500 text-center py-8">No analyses yet</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Applications</h2>
          {applications.length > 0 ? (
            <ApplicationTable
              applications={applications}
              onUpdate={handleUpdateApp}
              onDelete={handleDeleteApp}
            />
          ) : (
            <p className="text-gray-500 text-center py-8">No applications yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
