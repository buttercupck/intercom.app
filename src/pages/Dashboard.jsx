import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase.ts';
import Navbar from "../components/layout/Navbar";
import JobCard from "../components/jobs/JobCard";
import JobDetailPanel from "../components/jobs/JobDetailPanel";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [allInterpreters, setAllInterpreters] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const today = format(new Date(), "EEEE, MMMM d");

  useEffect(() => {
    const fetchJobs = async () => {
      const now = new Date();
      const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay()));
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 6);
      end.setUTCHours(23, 59, 59, 999);
      const { data, error } = await supabase
      .from('requests')
      .select(`
        id,
        start_time,
        end_time,
        duration,
        status,
        modality,
        required_language_id,
        case_notes,
        requestor_email,
        interpreter_id,
        location_id,
        courtroom_label,
        interpreters (
          id,
          first_name,
          last_name,
          interpreter_languages (
            language_id
          )
        ),
        locations (
          id,
          name,
          org_id,
          zoom_link,
          organizations (
            id,
            name
          )
        ),
        languages (
          id,
          name
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

    const fetchInterpreters = async () => {
      const { data, error } = await supabase
        .from('interpreters')
        .select(`
          id,
          first_name,
          last_name,
          interpreter_languages (
            language_id
          )
        `);
      if (error) console.error("Error fetching interpreters:", error);
      else if (data) setAllInterpreters(data);
    };

    const fetchLocations = async () => {
      const { data, error } = await supabase
        .from('locations')
        .select(`
          id,
          name,
          org_id,
          zoom_link,
          organizations (
            id,
            name
          )
        `);
      if (error) console.error("Error fetching locations:", error);
      else setAllLocations(data);
    };

    fetchJobs();
    fetchInterpreters();
    fetchLocations();
    }, []);

return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        {/* Job List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{today}</h2>
          {jobs.length === 0 ? (
            <div className="text-gray-500">No jobs this week</div>
          ) : (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
            ))
          )}
        </div>

        {/* Job Detail Panel */}
        <div className="w-80 bg-gray-200 border-l overflow-y-auto">
          <JobDetailPanel
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            interpreters={allInterpreters}
            locations={allLocations}
          />
        </div>
      </div>
    </div>
  );
}
