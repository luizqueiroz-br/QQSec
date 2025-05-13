declare module './PrivateRoute' {
  import React from 'react';
  interface PrivateRouteProps {
    isAuthenticated: boolean;
  }
  const PrivateRoute: React.FC<PrivateRouteProps>;
  export default PrivateRoute;
}
