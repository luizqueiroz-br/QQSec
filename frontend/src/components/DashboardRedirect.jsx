import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardRedirect = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return null; // This component doesn't render anything
};

export default DashboardRedirect;
