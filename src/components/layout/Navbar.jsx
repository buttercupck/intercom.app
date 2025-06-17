import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">INTERCOM Scheduler</h1>
      <nav className="flex gap-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/interpreters" className="text-blue-600 hover:underline">Interpreters</Link>
        <Link to="/court" className="text-blue-600 hover:underline">Courts</Link>
        <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
      </nav>
    </header>
  );
}