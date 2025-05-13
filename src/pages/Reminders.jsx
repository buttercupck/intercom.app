import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';

export default function Reminders() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    const { data, error } = await supabase
      .from('requests')
      .select(`
        id,
        requested_date,
        required_language,
        case_notes,
        reminder_sent,
        interpreter:interpreter_id (full_name),
        courtroom:courtroom_id (
          courtroom_name,
          zoom_link,
          court:court_id (name)
        )
      `)
      .order('requested_date', { ascending: true });

    if (error) console.error(error);
    else setRequests(data);
    setLoading(false);
  }

  async function toggleReminder(id, currentStatus) {
    const { error } = await supabase
      .from('requests')
      .update({ reminder_sent: !currentStatus })
      .eq('id', id);

    if (error) console.error(error);
    else {
      setRequests(prev =>
        prev.map(req =>
          req.id === id ? { ...req, reminder_sent: !currentStatus } : req
        )
      );
    }
  }

  if (loading) return <p className="p-4">Loading reminders...</p>;

  return (
    <div className="p-4 grid gap-4">
      {requests.map(req => (
        <div key={req.id} className="border p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg">{req.courtroom?.court?.name || 'Unknown Court'}</h2>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={req.reminder_sent}
                onChange={() => toggleReminder(req.id, req.reminder_sent)}
              />
              <span className="text-sm">Reminder Sent</span>
            </label>
          </div>
          <p><strong>Date & Time:</strong> {new Date(req.requested_date).toLocaleString()}</p>
          <p><strong>Modality:</strong> {req.courtroom?.name}</p>
          <p>
            <strong>Zoom:</strong>{' '}
            <a href={req.courtroom?.zoom_link} className="text-blue-600 underline">
              {req.courtroom?.zoom_link}
            </a>
          </p>
          <p><strong>Language:</strong> {req.required_language}</p>
          <p><strong>Interpreter:</strong> {req.interpreter?.full_name || 'Not Assigned'}</p>
          <p><strong>Case:</strong> {req.case_notes}</p>
        </div>
      ))}
    </div>
  );
}