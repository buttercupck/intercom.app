import React, { useEffect, useState } from 'react';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { supabase } from '../lib/supabase.ts';
import Navbar from "../components/layout/Navbar";
import JobCard from "../components/jobs/JobCard";
import JobDetailPanel from "../components/jobs/JobDetailPanel";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const today = format(new Date(), "EEEE, MMMM d");

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

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Job List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{today}</h2>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
          ))}
        </div>

        {/* Job Detail Panel */}
        <div className="w-80 bg-gray-200 border-l overflow-y-auto">
          <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
      </div>
    </div>
  );
}
