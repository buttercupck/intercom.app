export default function Navbar() {
  return (
    <header className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm">
      <h1 className="text-lg font-semibold">Intercom Scheduler</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Welcome, Admin</span>
        <img src="https://via.placeholder.com/32" alt="User" className="rounded-full" />
      </div>
    </header>
  );
}