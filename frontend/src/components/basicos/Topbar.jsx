import { logout } from '../services/authService';
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Topbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login');
    } else {
      console.error('Erro ao fazer logout');
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-end bg-white shadow p-3" style={{ height: '64px' }}>
      <span className="me-3 fw-semibold">Marcus White</span>

      <img src="/avatar.jpg" alt="User" className="rounded-circle" style={{ width: '40px', height: '40px' }} />

      <button
        className="btn btn-outline-danger ms-3"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
