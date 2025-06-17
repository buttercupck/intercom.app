// src/pages/JobRequestFormPage.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.ts";
import JobRequestForm from "../components/jobs/JobRequestForm";
import JobRequestParser from "../components/jobs/JobRequestParser";

export default function JobRequestFormPage() {
  const [interpreters, setInterpreters] = useState(null);
  const [courts, setCourt] = useState(null);
  const [locations, setLocations] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: interpData, error: interpErr } = await supabase
        .from("interpreters")
        .select("id, first_name, last_name");

      const { data: courtsData, error: courtErr } = await supabase
        .from("courts")
        .select("id, name");

      const { data: locationsData, error: locationsErr } = await supabase
        .from("locations")
        .select("id, name, court_id");

      const { data: langData, error: langErr } = await supabase
        .from("languages")
        .select("id, name");

      if (interpErr || courtErr || locationsErr || langErr) {
        console.error("Fetch error:", interpErr || courtErr || locationsErr || langErr);
        setStatus("Error loading data.");
        return;
      }

      setInterpreters(interpData);
      setCourt(courtsData);
      setCourtrooms(locationsData);
      setLanguages(langData);
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    required_language_id: "",
    interpreter_id: "",
    courtroom_id: "",
    start_time: "",
    duration: 120,
    locations: "",
    case_notes: "",
    status: "initial",
    modality: "Zoom",
    case_number: "",
    defendant_name: "",
    hearing_type: "",
    charges: "",
    requestor_email: ""
  });

  const handleSubmit = async (formData) => {
    const { error } = await supabase.from("requests").insert([{ ...formData }]);
    setStatus(error ? "Submission failed." : "Job request submitted successfully.");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New Job Request</h1>
      {status && <div className="mb-4 text-sm text-blue-700">{status}</div>}
      <div className="flex gap-4">
        <JobRequestParser setFormData={setFormData} />
        <JobRequestForm
          interpreters={interpreters}
          courts={courts}
          courtrooms={courtrooms}
          languages={languages}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
