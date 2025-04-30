import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, what would you like to do today?</h1>
      <div className="space-x-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
          Courts
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
          Interpreters
        </button>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition">
          Requests
        </button>
      </div>
    </div>
  );
}

export default App;