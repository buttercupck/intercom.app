import { useState } from "react";

export default function JobRequestParser({ setFormData }) {
  const [rawText, setRawText] = useState("");

  const parseText = () => {
    const lines = rawText.split("\n").map((l) => l.trim());

    const extracted = {
      defendant_name: getValue(lines, "client"),
      case_number: getValue(lines, "cause"),
      hearing_type: getValue(lines, "hearing"),
      required_language: getValue(lines, "language"),
      modality: getValue(lines, "modality"),
      charges: getValue(lines, "charges"),
      start_time: parseDateTime(lines)
    };
    // Logs for debugging
    console.log("RAW TEXT:", rawText);
    console.log("LINES:", lines);
    console.log("EXTRACTED:", extracted);
    
    setFormData(prev => ({
      ...prev,
      ...extracted
    }));
  };

  const getValue = (lines, key) => {
    const line = lines.find(line =>
      line.toLowerCase().trim().startsWith(key.toLowerCase())
    );

    if (!line) return "";

    const splitMatch = line.split(/[:\-]/); // Match ":" or "-" separators
    return splitMatch[1]?.trim() || "";
  };

  const parseDateTime = (lines) => {
    const clean = (str) =>
      str?.replace(/[\u00A0\u200B\uFEFF]/g, "").trim() || "";

    const dateLine = lines.find(l => l.toLowerCase().startsWith("date"));
    const timeLine = lines.find(l => l.toLowerCase().startsWith("time"));

    if (!dateLine || !timeLine) return "";

    const date = clean(dateLine.split(":")[1]);
    const time = clean(timeLine.split(":")[1]);

    const isoInput = `${date}T${time}`;
    const parsed = new Date(isoInput);

    console.log("Constructed:", isoInput);
    console.log("Parsed:", parsed);

    return isNaN(parsed.getTime()) ? "" : parsed.toISOString();
  };



  return (
    <div className="w-1/2 p-4">
      <label className="block font-medium mb-2">Paste Court Request</label>
      <textarea
        className="w-full h-64 border p-2 rounded"
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
      />
      <button
        onClick={parseText}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Autofill Form
      </button>
    </div>
  );
}
