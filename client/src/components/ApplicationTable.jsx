import { useState } from 'react';
import { format } from 'date-fns';

const ApplicationTable = ({ applications, onUpdate, onDelete }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortField, setSortField] = useState('appliedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedApps = [...applications].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (sortField === 'appliedAt') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(applications.map(app => app._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} applications?`)) {
      onDelete(selectedIds);
      setSelectedIds([]);
    }
  };

  const statusColors = {
    applied: 'bg-blue-100 text-blue-700',
    screening: 'bg-yellow-100 text-yellow-700',
    interview: 'bg-purple-100 text-purple-700',
    offer: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  };

  return (
    <div>
      {selectedIds.length > 0 && (
        <div className="mb-4 flex items-center gap-4">
          <span className="text-sm text-gray-600">{selectedIds.length} selected</span>
          <button
            onClick={handleBulkDelete}
            className="text-sm text-red-600 hover:underline"
          >
            Delete Selected
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.length === applications.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('company')}>
                Company {sortField === 'company' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('role')}>
                Role {sortField === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Score</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('appliedAt')}>
                Applied {sortField === 'appliedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedApps.map(app => (
              <tr key={app._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(app._id)}
                    onChange={() => handleSelect(app._id)}
                  />
                </td>
                <td className="p-3 font-medium">{app.company}</td>
                <td className="p-3">{app.role}</td>
                <td className="p-3">
                  <select
                    value={app.status}
                    onChange={(e) => onUpdate(app._id, { status: e.target.value })}
                    className={`px-2 py-1 rounded text-sm ${statusColors[app.status]}`}
                  >
                    <option value="applied">Applied</option>
                    <option value="screening">Screening</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-3">{app.analysisId?.atsScore || 'N/A'}</td>
                <td className="p-3 text-sm text-gray-600">
                  {format(new Date(app.appliedAt), 'MMM dd, yyyy')}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => onDelete([app._id])}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTable;
