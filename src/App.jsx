import React, { useState } from "react";
import Court from "./pages/Court";
import Reminders from "./pages/Reminders";
import Dashboard from "./pages/Dashboard";
import Interpreters from "./pages/Interpreters";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [view, setView] = useState("home");

  return (
    <Router>
    <div className="min-h-screen bg-gray-50 text-center p-4">
      {view === "home" && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold mb-6">
            Welcome, what would you like to do today?
          </h1>
          <div className="space-x-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
              onClick={() => setView("court")}
            >
              Court
            </button>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
              onClick={() => setView("interpreters")}
            >
              Interpreters
            </button>
            <button
              className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
              onClick={() => setView("reminders")}
            >
              Reminders
            </button>
            <button
              className="px-6 py-2 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-900 transition"
              onClick={() => setView("dashboard")}
            >
              Dashboard
            </button>
          </div>
        </div>
      )}

      {view === "court" && (
        <>
          <Court />
          <button
            className="mt-4 px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setView("home")}
          >
            ← Back
          </button>
        </>
      )}

      {view === "reminders" && (
        <>
          <Reminders />
          <button
            className="mt-4 px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setView("home")}
          >
            ← Back
          </button>
        </>
      )}

      {view === "dashboard" && (
        <>
          <Dashboard />
          <button
            className="absolute top-4 left-4 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setView("home")}
          >
            ← Back
          </button>
        </>
      )}

      {view === "interpreters" && (
        <>
          <Interpreters />
          <button
            className="absolute top-4 left-4 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setView("home")}
          >
            ← Back
          </button>
        </>
      )}
    </div>
      </Router>
  );
}

export default App;