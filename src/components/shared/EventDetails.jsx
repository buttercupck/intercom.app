import React from 'react';

const EventDetails = ({ job, onClose }) => {
  if (!job) {
    return <div className="text-center text-gray-500 p-4">No Event Selected</div>;
  }
  const interpreterName = job.interpreters
    ? `${job.interpreters.first_name} ${job.interpreters.last_name}`
    : 'Interpreter TBD';

  return (
    <div className="w-72 bg-gray-100 p-4 border-l border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Job Details</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-black text-xl leading-none cursor-pointer transition"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <h2 className="text-lg font-bold mb-4">{job.required_language} - {interpreterName} (Zoom)</h2>

      <div className="mb-2"><strong>Court:</strong> {job.courtrooms?.court?.name || '—'}</div>
      <div className="mb-2">
        <strong>Time:</strong>{" "}
        {job.start_time && job.end_time
          ? `${new Date(job.start_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} – ${new Date(job.end_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
          : "—"}
      </div>

      <hr className="my-2" />

      <div className="mb-2"><strong>Courtroom:</strong> {job.courtrooms?.courtrooms_name || '—'}</div>
      <div className="mb-2"><strong>Zoom Link:</strong> {job.courtrooms?.zoom_link || '—'}</div>
      <div className="mb-2"><strong>Courtroom Login:</strong> {job.courtrooms?.zoom_login || '—'}</div>

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
