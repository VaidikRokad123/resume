const KeywordCloud = ({ matched, missing, partial }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">✓ Matched Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {matched.map((keyword, i) => (
            <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {keyword}
            </span>
          ))}
          {matched.length === 0 && <span className="text-gray-400 text-sm">None</span>}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">✗ Missing Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {missing.map((keyword, i) => (
            <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
              {keyword}
            </span>
          ))}
          {missing.length === 0 && <span className="text-gray-400 text-sm">None</span>}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">~ Partial Matches</h3>
        <div className="flex flex-wrap gap-2">
          {partial.map((keyword, i) => (
            <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
              {keyword}
            </span>
          ))}
          {partial.length === 0 && <span className="text-gray-400 text-sm">None</span>}
        </div>
      </div>
    </div>
  );
};

export default KeywordCloud;
