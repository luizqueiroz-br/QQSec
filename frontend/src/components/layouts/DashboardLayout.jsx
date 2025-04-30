import Sidebar from "../basicos/Sidebar.jsx";
import Topbar from '../basicos/Topbar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 ms-5 bg-light min-vh-100">
        <Topbar />
        <div className="container py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
