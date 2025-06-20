// src/pages/JobRequestPage.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.ts";
import JobRequestForm from "../components/jobs/JobRequestForm";
import JobRequestParser from "../components/jobs/JobRequestParser";

export default function JobRequestPage() {
  const [interpreters, setInterpreters] = useState(null);
  const [orgs, setOrgs] = useState(null);
  const [locations, setLocations] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: interpData, error: interpErr } = await supabase
        .from("interpreters")
        .select(`
          id,
          first_name,
          last_name,
          interpreter_languages (
            language_id,
            languages ( id, name )
          )
      `);
      
      const { data: orgData, error: orgErr } = await supabase
      .from("organizations")
      .select("id, name");

      const { data: locationsData, error: locationsErr } = await supabase
      .from("locations")
      .select("id, name, org_id");

      const { data: langData, error: langErr } = await supabase
        .from("languages")
        .select("id, name");

      if (interpErr || orgErr || locationsErr || langErr) {
        console.error("Fetch error:", interpErr || orgErr || locationsErr || langErr);
        setStatus("Error loading data.");
        return;
      }
      const interpretersWithLanguages = interpData.map((i) => ({
        ...i,
        languages: i.interpreter_languages?.map((il) => il.languages) || []
      }));

      setInterpreters(interpretersWithLanguages);
      setOrgs(orgData);
      setLocations(locationsData);
      setLanguages(langData);
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    required_language_id: "",
    interpreter_id: "",
    org_id: "",
    location_id: "",
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
                orgs={orgs}
                locations={locations}
                languages={languages}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
        );
      }