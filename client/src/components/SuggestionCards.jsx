const SuggestionCards = ({ suggestions }) => {
  const getImpactColor = (impact) => {
    if (impact === 'high') return 'bg-red-100 text-red-700 border-red-200';
    if (impact === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  const sortedSuggestions = [...suggestions].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.impact] - order[b.impact];
  });

  return (
    <div className="space-y-3">
      {sortedSuggestions.map((suggestion, i) => (
        <div key={i} className="border rounded-lg p-4 hover:shadow-md transition">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900">{suggestion.section}</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
              {suggestion.impact.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Issue:</span> {suggestion.issue}
          </p>
          <p className="text-sm text-green-700">
            <span className="font-medium">Fix:</span> {suggestion.fix}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SuggestionCards;
