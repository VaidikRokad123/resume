const KpiGrid = ({ stats }) => {
  const kpis = [
    { label: 'Avg Score', value: stats.avgScore, color: 'blue' },
    { label: 'Total Apps', value: stats.totalApps, color: 'green' },
    { label: 'Top Score', value: stats.topScore, color: 'purple' },
    { label: 'Improvement', value: `${stats.improvement}%`, color: 'amber' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
          <p className={`text-3xl font-bold text-${kpi.color}-600`}>{kpi.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KpiGrid;
