import React from 'react';

const EventDetails = ({ job }) => {
  if (!job) {
    return <div className="text-center text-gray-500 p-4">No Event Selected</div>;
  }

  const interpreterName = job.interpreters
    ? `${job.interpreters.first_name} ${job.interpreters.last_name}`
    : 'Interpreter TBD';

  return (
    <div className="w-72 bg-gray-100 p-4 border-l border-gray-300">
      <h2 className="text-lg font-bold mb-4">{job.required_language} - {interpreterName} (Zoom)</h2>

      <div className="mb-2"><strong>Court:</strong> {job.courtrooms?.courts?.name || '—'}</div>
      <div className="mb-2"><strong>Time:</strong> {new Date(job.requested_date).toLocaleString()}</div>

      <hr className="my-2" />

      <div className="mb-2"><strong>Courtroom:</strong> {job.courtrooms?.courtrooms_name || '—'}</div>
      <div className="mb-2"><strong>Zoom Link:</strong> {job.courtrooms?.zoom_link || '—'}</div>

      <hr className="my-2" />

      <div className="mb-2"><strong>Case Number:</strong> {job.case_number || '—'}</div>
      <div className="mb-2"><strong>Defendant:</strong> {job.defendant_name || '—'}</div>
      <div className="mb-2"><strong>Charges:</strong> {job.charges || '—'}</div>
      <div className="mb-2"><strong>Hearing Type:</strong> {job.hearing_type || '—'}</div>
      <div className="mb-2"><strong>Notes:</strong> {job.case_notes || '—'}</div>
    </div>
  );
};

export default EventDetails;
