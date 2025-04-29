declare module './DashboardRedirect.jsx' {
  import * as React from 'react';

  interface DashboardRedirectProps {
    isAuthenticated: boolean;
  }

  const DashboardRedirect: React.FC<DashboardRedirectProps>;
  export default DashboardRedirect;
}
