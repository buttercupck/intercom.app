import React, { useState } from 'react';
import JobStatusSidebar from '../components/JobStatusSidebar';
import FilterHeader from '../components/FilterHeader';
import CalendarView from '../components/CalendarView';
import EventDetails from '../components/EventDetails';

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [visibleCalendars, setVisibleCalendars] = useState([]);

  const handleToggleCalendars = (newFilters) => {
    setVisibleCalendars(newFilters);
  };

  return (
    <div className="flex">
      <div className="w-64 bg-gray-100"><JobStatusSidebar selected={visibleCalendars} onToggle={handleToggleCalendars} /></div>
      <div className="flex-1 flex flex-col">
        <div><FilterHeader /></div>
        <div className="flex flex-1">
          <div className="flex-1"><CalendarView selectedJob={selectedJob} visibleCalendars={visibleCalendars} /></div>
          <div className="w-72 bg-gray-200"><EventDetails job={selectedJob} /></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;