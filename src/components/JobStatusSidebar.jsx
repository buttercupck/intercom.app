import React from 'react';

const JobStatusSidebar = ({ selected, onToggle }) => {
  const statusOptions = [
    'Pending',
    'Confirmed',
    'Spanish Pending',
    'Spanish Confirmed',
    'Hilary & Harry'
  ];

  const handleToggle = (status) => {
    const newSelected = selected.includes(status)
      ? selected.filter(s => s !== status)
      : [...selected, status];
    onToggle(newSelected);
  };

  return (
    <div className="w-64 p-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Job Status</h2>
      <div className="flex flex-col space-y-2">
        {statusOptions.map(status => (
          <label key={status} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(status)}
              onChange={() => handleToggle(status)}
              className="mr-2"
            />
            {status}
          </label>
        ))}
      </div>
    </div>
  );
};

export default JobStatusSidebar;
