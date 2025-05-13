import { Home, Users, Calendar, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 border-r">
      <ul className="space-y-4">
        <li className="font-medium text-gray-800 flex items-center gap-2"><Home size={18} /> Dashboard</li>
        <li className="text-gray-600 flex items-center gap-2"><Users size={18} /> Interpreters</li>
        <li className="text-gray-600 flex items-center gap-2"><Calendar size={18} /> Schedule</li>
        <li className="text-gray-600 flex items-center gap-2"><Settings size={18} /> Settings</li>
      </ul>
    </aside>
  );
}