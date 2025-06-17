        import { useState } from "react";
        import JobStatus from "../shared/JobStatus";


        export default function JobRequestForm({ courts, interpreters, courtrooms, languages, onSubmit, formData, setFormData }) {
          const [selectedLanguage, setSelectedLanguage] = useState("");
          const [selectedCourtId, setSelectedCourtId] = useState("");

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
            const end = new Date(start.getTime() + formData.duration * 60000);

            const requestData = {
              interpreter_id: formData.interpreter_id,
              required_language_id: formData.required_language_id,
              modality: formData.modality,
              start_time: start.toISOString(),
              end_time: end.toISOString(),
              duration: formData.duration,
              courtroom_label: formData.courtroom_id,
              case_notes: formData.case_notes,
              status: formData.status || "initial",
              program_id: formData.program_id || null
            };

            onSubmit(requestData);

            setFormData({
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
              requestor_email: "",
              status: "initial",
              program_id: ""
            });
            setSelectedLanguage("");
            setSelectedCourtId("");
          };

          const filteredInterpreters = interpreters?.filter((i) =>
            [i.language_1, i.language_2].includes(selectedLanguage)
          ) || [];

          const filteredCourtrooms = courtrooms?.filter(
            (c) => c.court_id === selectedCourtId
          ) || [];

          return (
            <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
              {/* Language */}
              <div className="space-y-2">
                <label>Language</label>
                <select
                  name="required_language_id"
                  value={formData.required_language-}
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

              {/* Court */}
              <div className="space-y-1">
                <label htmlFor="court_id">Court</label>
                <select
                  id="court_id"
                  name="court_id"
                  value={selectedCourtId}
                  onChange={(e) => {
                    setSelectedCourtId(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      court_id: e.target.value,
                      courtroom_id: ""
                    }));
                  }}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select a court</option>
                  {courts?.map((court) => (
                    <option key={court.id} value={court.id}>
                      {court.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Courtroom */}
              <div className="space-y-2">
                <label>Courtroom</label>
                <select
                  name="courtroom_id"
                  value={formData.courtroom_id}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select a courtroom</option>
                  {filteredCourtrooms.map((room) => (
                    <option key={room.courtrooms_id} value={room.courtrooms_id}>
                      {room.courtrooms_name}
                    </option>
                  ))}
                </select>
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
