import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div id='sidbar' className="w-60 h-screen bg-slate-900 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Acme</h2>
      <nav className="flex flex-col gap-4">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/reports" className="nav-link text-white">
            Reports
          </Link>
        </li>
        <li>
          <Link to="/admin/maneger/user" className="nav-link text-white">
            Usuários
          </Link>
        </li>
      </ul>
      </nav>
    </div>
  );
}