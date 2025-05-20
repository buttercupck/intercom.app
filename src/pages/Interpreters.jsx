import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.ts";
import { useNavigate } from "react-router-dom";
import InterpreterCard from "../components/InterpreterCard";

function Interpreters() {
  const [interpreters, setInterpreters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInterpreters() {
      const { data, error } = await supabase
        .from("interpreters")
        .select("id, first_name, last_name, language_1, phone, email")
        .order("first_name", { ascending: true });

      if (error) console.error(error);
      else setInterpreters(data);
    }

    fetchInterpreters();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Intercom</h2>
        <nav className="space-y-2">
          <button className="block w-full text-left">Dashboard</button>
          <button className="block w-full text-left font-semibold">Interpreters</button>
          <button className="block w-full text-left">Courts</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-4">Interpreters</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {interpreters.map((int) => (
            <div key={int.id} onClick={() => navigate(`/interpreters/${int.id}`)}>
              <InterpreterCard
                name={`${int.first_name} ${int.last_name}`}
                phone={int.phone || "N/A"}
                email={int.email || "N/A"}
                languages={[int.language_1]}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Interpreters;
