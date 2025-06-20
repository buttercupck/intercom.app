        import { useState } from "react";
        import JobStatus from "../shared/JobStatus";


        export default function JobRequestForm({ orgs, interpreters, locations, languages, onSubmit, formData, setFormData }) {
          const [selectedLanguage, setSelectedLanguage] = useState("");
          

          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              [name]: value
            }));
          };
          const handleStatusChange = (value) => {
            setFormData((prev) => ({
              ...prev,
              status: value
            }));
          };
          const handleSubmit = (e) => {
            e.preventDefault();
            const start = new Date(formData.start_time);
            const end = new Date(start.getTime() + 120 * 60000);
            const selectedLangObj = languages.find(lang => lang.name === selectedLanguage);
            const requestData = {
              interpreter_id: formData.interpreter_id,
              required_language_id: selectedLangObj?.id || null,
              modality: formData.modality,
              start_time: start.toISOString(),
              end_time: end.toISOString(),
              courtroom_label: formData.location_id,
              case_notes: formData.case_notes,
              status: formData.status || "initial",
              program_id: formData.program_id || null
            };

            onSubmit(requestData);

            setFormData({
              required_language: "",
              interpreter_id: "",
              org_id: "",
              location_id: "",
              start_time: "",
              case_number: "",
              case_notes: "",
              modality: "Zoom",
              defendant_name: "",
              hearing_type: "",
              charges: "",
              requestor_email: "",
              status: "initial",
              program_id: ""
            });
            setSelectedLanguage("");
            
          };

          const filteredInterpreters = interpreters?.filter((i) =>
            i.languages?.some((lang) => lang.name === selectedLanguage)
          ) || [];

          const filteredLocations = locations?.filter(
            (c) => c.org_id === formData.org_id
          ) || [];

          return (
            <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
              {/* Language */}
              <div className="space-y-2">
                <label>Language</label>
                <select
                  name="required_language"
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    handleChange(e);
                  }}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select a language</option>
                  {languages?.map((lang) => (
                    <option key={lang.id} value={lang.name}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interpreter */}
              <div className="space-y-2">
                <label>Interpreter</label>
                <select
                  name="interpreter_id"
                  value={formData.interpreter_id}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select an interpreter</option>
                  {filteredInterpreters?.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.first_name} {i.last_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Organization */}
              <div className="space-y-1">
                <label htmlFor="org_id">Court</label>
                <select
                  id="org_id"
                  name="org_id"
                  value={formData.org_id}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData((prev) => ({
                      ...prev,
                      location_id: ""
                    }));
                  }}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select an organization</option>
                  {orgs?.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label>Location</label>
                <select
                  name="location_id"
                  value={formData.location_id}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select a location</option>
                  {filteredLocations.map((loc) => {
                    console.log("DEBUG — Rendering location:", loc);
                    return (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* Start Time */}
              <div className="space-y-2">
                <label>Start Time</label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              {/* Job Status */}
              <JobStatus status={formData.status || "initial"} onChange={handleStatusChange} />
              
              {/* Additional Notes */}
              <div className="space-y-2">
                <label>Case Notes</label>
                <textarea
                  name="case_notes"
                  value={formData.case_notes}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Submit Request
              </button>
            </form>
          );
        }
