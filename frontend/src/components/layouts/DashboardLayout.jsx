import Sidebar from "../basicos/Sidebar.jsx";
import Topbar from '../basicos/Topbar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div id='sidbar' className="col-12 col-lg-3 p-0">
          <Sidebar />
        </div>
        <div id='sidbar' className="col-12 col-lg-9 bg-light min-vh-100">
          <Topbar />
          <div className="container py-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
