import React from "react";
import { format, addMinutes } from "date-fns";
import { getStatusColor } from "../shared/JobStatus";

export default function JobCard({ job, onClick }) {
  const status = job.status?.toLowerCase();
  const color = getStatusColor(status);

  const start = new Date(job.start_time);
  const end = addMinutes(start, job.duration || 120);
  const formattedTime = `${format(start, "h:mm a")} – ${format(end, "h:mm a")}`;

  const fullName = `${job.interpreters?.first_name || ""} ${job.interpreters?.last_name || ""}`;
  const jobLabel = `${job.required_language} ${fullName} - ${job.modality}`;
  const courtName = job.courtrooms?.court?.name || "";

  return (
    <div
      onClick={onClick}
      className="flex min-h-[64px] items-stretch cursor-pointer border border-black bg-white rounded shadow hover:bg-gray-50 transition"
    >
      <div className={`w-2 ${color} min-h-full`} />

      <div className="p-4 flex-1">
        <div className="text-sm text-gray-600 mb-1">{formattedTime}</div>
        <div className="text-md font-semibold">{jobLabel}</div>
        <div className="text-sm text-gray-700">{courtName}</div>
      </div>
    </div>
  );
}
