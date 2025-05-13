import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import DashboardRedirect from './components/DashboardRedirect';
import DashboardLayout from './components/layouts/DashboardLayout';
import ListarUsuarios from './components/pages/ListarUsuarios';
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/verify-login', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.logged_in))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/maneger/user" element={<ListarUsuarios />} />
          <Route path="/redirect" element={<DashboardRedirect isAuthenticated={isAuthenticated} />} />
        </Route>
      </Route>
      </Routes>
    </Router>
  );
}
