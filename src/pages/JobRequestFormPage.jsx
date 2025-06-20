// src/pages/JobRequestFormPage.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.ts";
import JobRequestForm from "../components/JobRequestForm";
import JobRequestParser from "../components/JobRequestParser";


export default function JobRequestFormPage() {
  const [interpreters, setInterpreters] = useState(null);
  const [courts, setcourt] = useState(null);
  const [courtrooms, setCourtrooms] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: interpData, error: interpErr } = await supabase
        .from("interpreters")
        .select("id, first_name, last_name, language_1, language_2");

      const { data: courtData, error: courtErr } = await supabase
        .from("court")
        .select("id, name");

      const { data: courtroomsData, error: courtroomsErr } = await supabase
        .from("courtrooms")
        .select("courtrooms_id, courtrooms_name, court_id");

      if (interpErr || courtErr || courtroomsErr) {
        console.error("Fetch error:", interpErr || courtErr || courtroomsErr);
        setStatus("Error loading data.");
        return;
      }

      setInterpreters(interpData);
      setcourt(courtData);
      setCourtrooms(courtroomsData);

      const uniqueLanguages = new Set();
      interpData.forEach((i) => {
        if (i.language_1) uniqueLanguages.add(i.language_1);
        if (i.language_2) uniqueLanguages.add(i.language_2);
      });
      setLanguages([...uniqueLanguages].sort());
    };

    fetchData();
  }, []);
  const [formData, setFormData] = useState({
    required_language: "",
    interpreter_id: "",
    court_id: "",
    courtroom_id: "",
    start_time: "",
    duration: 120,
    case_number: "",
    case_notes: "",
    modality: "Zoom",
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
