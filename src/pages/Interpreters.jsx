import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import InterpreterContacts from "../components/InterpreterContacts";

export default function Interpreters() {
  const [interpreters, setInterpreters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterpreters = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("interpreters")
        .select("*");

      if (error) {
        setError(error.message);
        setInterpreters([]);
      } else {
        setInterpreters(data);
      }

      setLoading(false);
    };

    fetchInterpreters();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interpreter Directory</h1>

      {loading && <p className="text-gray-600">Loading interpreters...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && <InterpreterContacts data={interpreters} />}
    </div>
  );
}
