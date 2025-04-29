import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

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
        element={
        isAuthenticated ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <Login />
        )
        }
      />
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      </Routes>
    </Router>
  );
}
