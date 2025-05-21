import React from 'react';

const FilterHeader = ({ onFilterChange }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div className="text-lg font-semibold">{formattedDate}</div>
      <div className="flex space-x-4">
        <select className="border rounded p-2" onChange={(e) => onFilterChange('language', e.target.value)}>
          <option>Language</option>
          <option>English</option>
          <option>Spanish</option>
        </select>
        <select className="border rounded p-2" onChange={(e) => onFilterChange('calendar', e.target.value)}>
          <option>Calendar</option>
          <option>Work</option>
          <option>Personal</option>
        </select>
        <select className="border rounded p-2" onChange={(e) => onFilterChange('court', e.target.value)}>
          <option>Court</option>
          <option>Court 1</option>
          <option>Court 2</option>
        </select>
        <select className="border rounded p-2" onChange={(e) => onFilterChange('interpreter', e.target.value)}>
          <option>Interpreter</option>
          <option>Interpreter 1</option>
          <option>Interpreter 2</option>
        </select>
      </div>
      <div className="flex space-x-2">
        <button className="border rounded p-2">Day</button>
        <button className="border rounded p-2">Week</button>
        <button className="border rounded p-2">Month</button>
        <button className="border rounded p-2">Year</button>
        <button className="border rounded p-2">Today</button>
      </div>
    </div>
  );
};

export default FilterHeader;