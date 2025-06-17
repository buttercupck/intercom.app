export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      <div className="bg-white rounded-2xl p-4 shadow">Total Jobs Today</div>
      <div className="bg-white rounded-2xl p-4 shadow">Upcoming Appointments</div>
      <div className="bg-white rounded-2xl p-4 shadow">Interpreter Availability</div>
    </div>
  );
}