import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-slate-900 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Acme</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
        <Link to="/reports" className="hover:text-cyan-400">Reports</Link>
      </nav>
    </div>
  );
}