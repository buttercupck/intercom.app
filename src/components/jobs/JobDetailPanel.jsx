import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import JobStatus from "../shared/JobStatus";
import { format, addMinutes } from "date-fns";

export default function JobDetailPanel({ job, onClose, interpreters = [], courtrooms = [] }) {
  const [status, setStatus] = useState(job?.status);
  const [modality, setModality] = useState(job?.modality);
  const [interpreterId, setInterpreterId] = useState(job?.interpreter_id);
  const [courtroomId, setCourtroomId] = useState(job?.courtroom_id);
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

  return (
    <div className="h-full p-4 bg-white shadow-inner flex flex-col space-y-2">
      <button
        onClick={onClose}
        className="text-sm text-blue-600 underline self-end"
      >
        ✕ Close
      </button>

      <h2 className="text-xl font-bold">{job.required_language}</h2>
      <p className="text-gray-600 text-sm">
        {formattedDate} — {formattedTime}
      </p>

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
          {interpreters
            .filter((i) => i.languages.includes(job.required_language))
            .map((i) => (
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

      {/* Courtroom Dropdown */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Courtroom</label>
        <select
          value={courtroomId || ""}
          onChange={(e) => {
            setCourtroomId(e.target.value);
            handleUpdateField("courtroom_id", e.target.value);
          }}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">Select Courtroom</option>
          {courtrooms.map((c) => (
            <option key={c.id} value={c.id}>{c.courtrooms_name}</option>
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
