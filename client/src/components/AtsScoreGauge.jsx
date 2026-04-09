const AtsScoreGauge = ({ score }) => {
  const getColor = () => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getBgColor = () => {
    if (score >= 75) return 'bg-green-100';
    if (score >= 50) return 'bg-amber-100';
    return 'bg-red-100';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${getBgColor()} rounded-full w-40 h-40 flex items-center justify-center`}>
        <div className="text-center">
          <div className={`text-5xl font-bold ${getColor()}`}>{score}</div>
          <div className="text-sm text-gray-600 mt-1">ATS Score</div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        {score >= 75 && 'Excellent! Your resume is ATS-friendly'}
        {score >= 50 && score < 75 && 'Good, but room for improvement'}
        {score < 50 && 'Needs significant optimization'}
      </p>
    </div>
  );
};

export default AtsScoreGauge;
