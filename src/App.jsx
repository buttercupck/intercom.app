import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Court from "./pages/Court";
import Reminders from "./pages/Reminders";
import Dashboard from "./pages/Dashboard";
import Interpreters from "./pages/Interpreters";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-center p-4">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, what would you like to do today?
        </h1>
        <div className="space-x-4">
          <Link to="/court">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
              Court
            </button>
          </Link>
          <Link to="/interpreters">
            <button className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
              Interpreters
            </button>
          </Link>
          <Link to="/reminders">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition">
              Reminders
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="px-6 py-2 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-900 transition">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* This is your landing page */}
        <Route path="/home" element={<Home />} />
        <Route path="/court" element={<Court />} />
        <Route path="/interpreters" element={<Interpreters />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
