import React from "react";

export const getStatusColor = (status) => {
  switch (status) {
    case "initial":
      return "bg-green-500";
    case "pending":
      return "bg-blue-500";
    case "confirmed":
      return "bg-green-500";
    case "billed":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

export default function JobStatus({ status, onChange }) {
  return (
    <div>
      <label htmlFor="status" className="text-sm font-medium text-gray-700 block mb-1">
        Job Status
      </label>
      <select
        id="status"
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
      >
        <option value="initial">Initial</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="billed">Billed</option>
      </select>
    </div>
  );
}
