import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import JobStatus from "../shared/JobStatus";
import { format, addMinutes } from "date-fns";

export default function JobDetailPanel({ job, onClose, interpreters = [], locations = [] }) {
  const [status, setStatus] = useState(job?.status);
  const [modality, setModality] = useState(job?.modality);
  const [interpreterId, setInterpreterId] = useState(job?.interpreter_id);
  const [locationId, setLocationId] = useState(job?.location_id);
  const [caseNotes, setCaseNotes] = useState(job?.case_notes || "");

  if (!job) return null;

  const start = new Date(job.start_time);
  const end = addMinutes(start, job.duration || 120);
  const formattedDate = format(start, "EEEE, MMMM d");
  const formattedTime = `${format(start, "h:mm a")} – ${format(end, "h:mm a")}`;

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    const { error } = await supabase
      .from("requests")
      .update({ status: newStatus })
      .eq("id", job.id);
    if (error) console.error("Failed to update status:", error);
  };

  const handleUpdateField = async (field, value) => {
    const { error } = await supabase
      .from("requests")
      .update({ [field]: value })
      .eq("id", job.id);
    if (error) console.error(`Failed to update ${field}:`, error);
  };
  const filteredInterpreters = interpreters.filter((i) =>
    i.interpreter_languages?.some((lang) => lang.language_id === job.required_language_id)
  );

  const filteredLocations = locations.filter((loc) =>
    loc.org_id === job.locations?.organizations?.id
  );
  return (
    <div className="h-full p-4 bg-white shadow-inner flex flex-col space-y-2">
      <button
        onClick={onClose}
        className="text-sm text-blue-600 underline self-end"
      >
        ✕ Close
      </button>

      <h2 className="text-xl font-bold">{job.languages?.name}</h2>
      <p className="text-gray-600 text-sm">
        {formattedDate} — {formattedTime}
      </p>
      {job.locations?.organizations?.name && (
        <p className="text-sm text-gray-700 italic">
          org: {job.locations.organizations.name}
          location: {job.locations.name}
        </p>
      )}
      {/* Interpreter Dropdown */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Interpreter</label>
        <select
          value={interpreterId || ""}
          onChange={(e) => {
            setInterpreterId(e.target.value);
            handleUpdateField("interpreter_id", e.target.value);
          }}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">Select Interpreter</option>
          {filteredInterpreters.map((i) => (
            <option key={i.id} value={i.id}>
              {i.first_name} {i.last_name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Status Dropdown */}
      <JobStatus status={status} onChange={handleStatusChange} />

      {/* Modality Dropdown */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Modality</label>
        <select
          value={modality || ""}
          onChange={(e) => {
            setModality(e.target.value);
            handleUpdateField("modality", e.target.value);
          }}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="Zoom">Zoom</option>
          <option value="Phone">Phone</option>
          <option value="In Person">In Person</option>
        </select>
      </div>

      {/* Location Dropdown */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Location</label>
        <select
          value={locationId || ""}
          onChange={(e) => {
            setLocationId(e.target.value);
            handleUpdateField("location_id", e.target.value);
          }}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">Select Location</option>
          {filteredLocations.map((loc) => (
          <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>
      </div>

      {/* Case Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Case Description</label>
        <textarea
          value={caseNotes}
          onChange={(e) => {
            setCaseNotes(e.target.value);
            handleUpdateField("case_notes", e.target.value);
          }}
          className="w-full border border-gray-300 rounded p-2 h-32 resize-none"
        />
      </div>
    </div>
  );
}
