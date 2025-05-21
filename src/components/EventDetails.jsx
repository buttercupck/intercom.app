import React from 'react';

const EventDetails = ({ selectedJob }) => {
  return (
    <div className="w-72 bg-gray-100 p-4 border-l border-gray-300">
      {selectedJob ? (
        <div>
          <h2 className="text-lg font-bold mb-2">Job Details</h2>
          <div className="mb-2">Job ID: {selectedJob.id}</div>
          <div className="mb-2">Job Title: {selectedJob.title}</div>
          <div className="mb-2">Status: {selectedJob.status}</div>
          <div className="mb-2">Time: {selectedJob.time}</div>
          <div className="mb-2">Details: {selectedJob.details}</div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No Event Selected</div>
      )}
    </div>
  );
};

export default EventDetails;
