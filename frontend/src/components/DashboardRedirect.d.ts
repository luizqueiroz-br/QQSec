declare module './DashboardRedirect' {
  import React from 'react';
  interface DashboardRedirectProps {
    isAuthenticated: boolean;
  }
  const DashboardRedirect: React.FC<DashboardRedirectProps>;
  export default DashboardRedirect;
}
