import React, { useEffect, useState } from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';
import { supabase } from '../lib/supabase.ts';
import JobStatusSidebar from '../components/JobStatusSidebar';
import CalendarView from '../components/CalendarView';
import EventDetails from '../components/EventDetails';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [activeStatuses, setActiveStatuses] = useState(["initial", "pending", "confirmed"]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const start = startOfWeek(new Date(), { weekStartsOn: 0 });
      const end = endOfWeek(new Date(), { weekStartsOn: 0 });

      const { data, error } = await supabase
        .from('requests')
        .select(`
          *,
          interpreters (
            first_name,
            last_name
          ),
          courtrooms (
            courtrooms_name,
            zoom_link,
            zoom_login,
            court (
              name,
              address
            )
          )
        `)
        .gte('start_time', start.toISOString())
        .lte('start_time', end.toISOString())
        .order('start_time', { ascending: true });

      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs by activeStatuses
  const filteredJobs = jobs.filter(job => activeStatuses.includes(job.status.toLowerCase()));

  return (
    <div className="flex h-screen">
      {/* Sidebar for status filters */}
      <div className="w-64 bg-gray-100 border-r">
        <JobStatusSidebar selected={activeStatuses} onToggle={setActiveStatuses} />
      </div>

      {/* Main Calendar + Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1">
          {/* Calendar */}
          <div className="flex-1">
            <CalendarView jobs={filteredJobs} onSelectJob={setSelectedJob} />
          </div>

          {/* Event Detail Panel */}
          <div className="w-80 bg-gray-200 border-l overflow-y-auto">
            <EventDetails job={selectedJob} />
          </div>
        </div>
      </div>
    </div>
  );
}
